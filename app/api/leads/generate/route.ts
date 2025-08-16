import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { db } from '@/lib/database'
import { leads } from '@/lib/schema'

// Configuration Apollo
const APOLLO_API_KEY = process.env.APOLLO_API_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface GenerateLeadsRequest {
  sector: string
  companySize: string
  location: string
  targetPositions?: string
  precision?: string
  numberOfLeads: number
}

interface ApolloPerson {
  id: string
  first_name: string
  last_name: string
  email: string
  title: string
  company_name: string
  company_industry: string
  company_size: string
  city: string
  country: string
}

interface GeneratedLead {
  firstName: string
  lastName: string
  email: string
  position: string
  company: string
  sector: string
  aiScore: number
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set(name, value, options)
          },
          remove(name: string, options: any) {
            cookieStore.set(name, '', { ...options, maxAge: 0 })
          },
        },
      }
    )

    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const body: GenerateLeadsRequest = await request.json()
    const { sector, companySize, location, targetPositions, precision, numberOfLeads } = body

    if (!APOLLO_API_KEY || !OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Configuration API manquante' },
        { status: 500 }
      )
    }

    // 1. Rechercher des prospects via Apollo
    const apolloResults = await searchProspectsWithApollo(
      sector, 
      companySize, 
      location, 
      numberOfLeads,
      targetPositions
    )

    if (!apolloResults.length) {
      return NextResponse.json(
        { error: 'Aucun prospect trouvé avec ces critères' },
        { status: 404 }
      )
    }

    // 2. Qualifier les leads avec OpenAI
    const qualifiedLeads = await qualifyLeadsWithAI(
      apolloResults, 
      sector, 
      numberOfLeads,
      precision
    )

    // 3. Sauvegarder les leads dans la base de données
    const savedLeads = []
    for (const lead of qualifiedLeads) {
      const [savedLead] = await db.insert(leads).values({
        userId: user.id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        company: lead.company,
        sector: lead.sector,
        position: lead.position,
        aiScore: lead.aiScore,
        status: 'new',
        source: 'ai_generated',
        notes: `Lead généré automatiquement par IA - Score: ${lead.aiScore}%`
      }).returning()
      
      savedLeads.push(savedLead)
    }

    return NextResponse.json({ 
      leads: savedLeads,
      message: `${savedLeads.length} leads générés avec succès`
    })

  } catch (error) {
    console.error('Erreur génération leads:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération des leads' },
      { status: 500 }
    )
  }
}

async function searchProspectsWithApollo(
  sector: string,
  companySize: string,
  location: string,
  numberOfLeads: number,
  targetPositions?: string
): Promise<ApolloPerson[]> {
  try {
    // Construire la requête Apollo avec des critères moins restrictifs
    const searchQuery: any = {
      api_key: APOLLO_API_KEY,
      page: 1,
      per_page: Math.min(numberOfLeads * 3, 100), // Récupérer plus pour avoir du choix
      q_organization_domains: "",
      q_organization_locations: [location]
    }

    // Ajouter la taille d'entreprise seulement si elle est spécifiée
    if (companySize && companySize.trim()) {
      searchQuery.q_organization_employee_ranges = [companySize]
    }

    // Ajouter le secteur seulement s'il est spécifié
    if (sector && sector.trim()) {
      const sectors = sector.split(',').map(s => s.trim()).filter(s => s)
      if (sectors.length > 0) {
        searchQuery.q_organization_industries = sectors
      }
    }

    // Ajouter les postes ciblés seulement s'ils sont spécifiés
    if (targetPositions && targetPositions.trim()) {
      const positions = targetPositions.split(',').map(p => p.trim()).filter(p => p)
      if (positions.length > 0) {
        searchQuery.q_titles = positions
      }
    }

    console.log('Requête Apollo:', JSON.stringify(searchQuery, null, 2))

    const response = await fetch('https://api.apollo.io/v1/people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(searchQuery)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur Apollo:', response.status, errorText)
      throw new Error(`Erreur Apollo: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Réponse Apollo:', JSON.stringify(data, null, 2))
    
    if (!data.people || data.people.length === 0) {
      console.log('Aucun prospect trouvé avec ces critères Apollo')
      
      // Essayer une recherche plus large sans certains critères
      console.log('Tentative de recherche plus large...')
      const fallbackQuery = {
        api_key: APOLLO_API_KEY,
        page: 1,
        per_page: Math.min(numberOfLeads * 3, 100),
        q_organization_locations: [location]
      }
      
      const fallbackResponse = await fetch('https://api.apollo.io/v1/people/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(fallbackQuery)
      })
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json()
        console.log('Réponse fallback Apollo:', JSON.stringify(fallbackData, null, 2))
        
        if (fallbackData.people && fallbackData.people.length > 0) {
          console.log(`Fallback réussi: ${fallbackData.people.length} prospects trouvés`)
          return fallbackData.people
        }
      }
      
      return []
    }

    return data.people

  } catch (error) {
    console.error('Erreur recherche Apollo:', error)
    return []
  }
}

async function qualifyLeadsWithAI(
  prospects: ApolloPerson[],
  targetSector: string,
  numberOfLeads: number,
  precision?: string
): Promise<GeneratedLead[]> {
  try {
    // Préparer le prompt pour OpenAI
    const prompt = `
    Tu es un expert en qualification de leads B2B. Analyse ces prospects et attribue un score de qualification de 0 à 100%.

    Critères de qualification:
    - Secteur cible: ${targetSector}
    - Spécialisation: ${precision || 'Non spécifiée'}
    - Pertinence du poste pour le secteur
    - Qualité de l'entreprise
    - Potentiel commercial

    Prospects à analyser:
    ${prospects.map(p => 
      `- ${p.first_name} ${p.last_name} (${p.email})
       Poste: ${p.title}
       Entreprise: ${p.company_name} (${p.company_industry})
       Taille: ${p.company_size}
       Localisation: ${p.city}, ${p.country}`
    ).join('\n')}

    Retourne uniquement un JSON avec cette structure:
    {
      "leads": [
        {
          "firstName": "string",
          "lastName": "string", 
          "email": "string",
          "position": "string",
          "company": "string",
          "sector": "string",
          "aiScore": number
        }
      ]
    }

    Sélectionne les ${numberOfLeads} meilleurs prospects et attribue un score réaliste.
    `

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en qualification de leads B2B. Réponds uniquement en JSON valide.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`Erreur OpenAI: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('Réponse OpenAI invalide')
    }

    // Parser la réponse JSON
    const parsed = JSON.parse(content)
    return parsed.leads || []

  } catch (error) {
    console.error('Erreur qualification OpenAI:', error)
    // Fallback: retourner les prospects avec un score par défaut
    return prospects.slice(0, numberOfLeads).map(p => ({
      firstName: p.first_name,
      lastName: p.last_name,
      email: p.email,
      position: p.title,
      company: p.company_name,
      sector: p.company_industry,
      aiScore: 75 // Score par défaut
    }))
  }
}

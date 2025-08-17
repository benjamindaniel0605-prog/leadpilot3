import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const APOLLO_API_KEY = process.env.APOLLO_API_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Fonction pour créer des leads simulés (pour tester)
function createSimulatedLeads(
  sector: string,
  companySize: string,
  location: string,
  numberOfLeads: number,
  targetPositions?: string
) {
  const companies = [
    'TechCorp', 'InnovateLab', 'DigitalFlow', 'FutureTech', 'SmartSolutions',
    'NextGen', 'CloudWorks', 'DataDrive', 'AI Ventures', 'TechHub'
  ]
  
  const firstNames = [
    'Alexandre', 'Marie', 'Thomas', 'Sophie', 'Lucas', 'Emma', 'Hugo', 'Léa',
    'Jules', 'Chloé', 'Antoine', 'Camille', 'Maxime', 'Sarah', 'Nicolas'
  ]
  
  const lastNames = [
    'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit',
    'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel'
  ]
  
  const positions = [
    'CEO', 'Directeur Commercial', 'Directeur Marketing', 'CTO', 'CFO',
    'Directeur des Ventes', 'Responsable Marketing', 'Chef de Projet'
  ]

  const leads = []
  
  for (let i = 0; i < numberOfLeads; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)]
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const position = positions[Math.floor(Math.random() * positions.length)]
    
    leads.push({
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase()}.com`,
      company,
      sector: sector || 'Technologie',
      position,
      score: Math.floor(Math.random() * 30) + 70, // Score entre 70 et 100
      status: 'new',
      createdAt: new Date().toISOString()
    })
  }
  
  return leads
}

// Fonction Apollo (gardée pour plus tard)
async function searchProspectsWithApollo(
  sector: string,
  companySize: string,
  location: string,
  numberOfLeads: number,
  targetPositions?: string
): Promise<any[]> {
  try {
    console.log('🔍 Tentative de recherche Apollo...')
    
    // Construire la requête Apollo avec des critères moins restrictifs
    const searchQuery: any = {
      api_key: APOLLO_API_KEY,
      page: 1,
      per_page: Math.min(numberOfLeads * 3, 100),
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

    console.log('📤 Requête Apollo:', JSON.stringify(searchQuery, null, 2))

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
      console.error('❌ Erreur Apollo:', response.status, errorText)
      throw new Error(`Erreur Apollo: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('📥 Réponse Apollo:', JSON.stringify(data, null, 2))
    
    if (!data.people || data.people.length === 0) {
      console.log('⚠️ Aucun prospect trouvé avec ces critères Apollo')
      
      // Essayer une recherche plus large sans certains critères
      console.log('🔄 Tentative de recherche plus large...')
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
        console.log('📥 Réponse fallback Apollo:', JSON.stringify(fallbackData, null, 2))
        
        if (fallbackData.people && fallbackData.people.length > 0) {
          console.log(`✅ Fallback réussi: ${fallbackData.people.length} prospects trouvés`)
          return fallbackData.people
        }
      }
      
      return []
    }

    return data.people

  } catch (error) {
    console.error('❌ Erreur recherche Apollo:', error)
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début génération leads...')
    
    // Récupérer le token d'authentification
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-access-token')?.value
    
    if (!token) {
      console.log('❌ Pas de token trouvé')
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Vérifier l'utilisateur
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.log('❌ Erreur authentification:', authError)
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 401 })
    }

    console.log('✅ Utilisateur authentifié:', user.email)

    // Récupérer les données de la requête
    const { sector, companySize, location, numberOfLeads, targetPositions, precision } = await request.json()
    
    console.log('📋 Critères reçus:', { sector, companySize, location, numberOfLeads, targetPositions, precision })

    // Vérifier les quotas utilisateur
    const { data: quotas, error: quotasError } = await supabase
      .from('user_quotas')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (quotasError || !quotas) {
      console.log('❌ Erreur récupération quotas:', quotasError)
      return NextResponse.json({ error: 'Erreur récupération quotas' }, { status: 500 })
    }

    if (quotas.leads_used >= quotas.leads_limit) {
      console.log('❌ Quota leads dépassé')
      return NextResponse.json({ error: 'Quota leads dépassé' }, { status: 403 })
    }

    console.log('✅ Quotas vérifiés, leads disponibles:', quotas.leads_limit - quotas.leads_used)

    // MODE TEST : Utiliser des données simulées au lieu d'Apollo
    console.log('🧪 MODE TEST : Génération de leads simulés...')
    
    const simulatedLeads = createSimulatedLeads(
      sector, 
      companySize, 
      location, 
      numberOfLeads, 
      targetPositions
    )
    
    console.log('🎭 Leads simulés créés:', simulatedLeads)

    // Sauvegarder les leads en base
    const leadsToSave = simulatedLeads.map(lead => ({
      ...lead,
      user_id: user.id,
      source: 'simulated'
    }))

    const { data: savedLeads, error: saveError } = await supabase
      .from('leads')
      .insert(leadsToSave)
      .select()

    if (saveError) {
      console.log('❌ Erreur sauvegarde leads:', saveError)
      return NextResponse.json({ error: 'Erreur sauvegarde leads' }, { status: 500 })
    }

    console.log('✅ Leads sauvegardés en base:', savedLeads)

    // Mettre à jour les quotas
    const { error: updateError } = await supabase
      .from('user_quotas')
      .update({ 
        leads_used: quotas.leads_used + numberOfLeads,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)

    if (updateError) {
      console.log('⚠️ Erreur mise à jour quotas:', updateError)
      // On continue quand même
    }

    console.log('✅ Quotas mis à jour')

    // Retourner les leads générés
    return NextResponse.json({
      success: true,
      leads: savedLeads,
      message: `${numberOfLeads} lead${numberOfLeads > 1 ? 's' : ''} généré${numberOfLeads > 1 ? 's' : ''} avec succès !`
    })

  } catch (error) {
    console.error('❌ Erreur générale:', error)
    return NextResponse.json({ 
      error: 'Erreur interne du serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}

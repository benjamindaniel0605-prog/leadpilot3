import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { db } from '@/lib/database'
import { leads } from '@/lib/schema'

const APOLLO_API_KEY = process.env.APOLLO_API_KEY

// Fonction pour calculer le score IA basé sur les critères
function calculateAIScore(
  prospect: any,
  userSector: string,
  userCompanySize: string,
  userLocation: string,
  userTargetPositions: string
): number {
  let score = 50 // Score de base

  // Score par secteur (0-20 points)
  if (userSector && prospect.organization?.industry) {
    const userSectors = userSector.toLowerCase().split(',').map(s => s.trim())
    const prospectIndustry = prospect.organization.industry.toLowerCase()
    
    if (userSectors.some(sector => prospectIndustry.includes(sector))) {
      score += 20
    } else if (userSectors.some(sector => 
      ['tech', 'technology', 'software', 'saas'].includes(sector) && 
      ['tech', 'technology', 'software', 'saas'].some(tech => prospectIndustry.includes(tech))
    )) {
      score += 15
    }
  }

  // Score par taille d'entreprise (0-15 points)
  if (userCompanySize && prospect.organization?.employee_count_range) {
    const userSize = userCompanySize
    const prospectSize = prospect.organization.employee_count_range
    
    if (userSize === prospectSize) {
      score += 15
    } else if (userSize.includes('1-10') && prospectSize.includes('1-10')) {
      score += 12
    } else if (userSize.includes('11-50') && prospectSize.includes('11-50')) {
      score += 12
    } else if (userSize.includes('51-200') && prospectSize.includes('51-200')) {
      score += 12
    }
  }

  // Score par localisation (0-15 points)
  if (userLocation && prospect.organization?.location) {
    const userLoc = userLocation.toLowerCase()
    const prospectLoc = prospect.organization.location.toLowerCase()
    
    if (prospectLoc.includes(userLoc) || userLoc.includes(prospectLoc)) {
      score += 15
    } else if (userLoc.includes('france') && prospectLoc.includes('france')) {
      score += 15
    } else if (userLoc.includes('france') && prospectLoc.includes('europe')) {
      score += 10
    }
  }

  // Score par poste (0-20 points)
  if (userTargetPositions && prospect.title) {
    const userPositions = userTargetPositions.toLowerCase().split(',').map(p => p.trim())
    const prospectTitle = prospect.title.toLowerCase()
    
    if (userPositions.some(pos => prospectTitle.includes(pos))) {
      score += 20
    } else if (userPositions.some(pos => 
      ['ceo', 'directeur', 'manager'].includes(pos) && 
      ['ceo', 'director', 'manager', 'head'].some(title => prospectTitle.includes(title))
    )) {
      score += 15
    }
  }

  // Bonus pour les prospects avec email (0-10 points)
  if (prospect.email) {
    score += 10
  }

  // Bonus pour les prospects avec LinkedIn (0-5 points)
  if (prospect.linkedin_url) {
    score += 5
  }

  // Limiter le score entre 0 et 100
  return Math.min(100, Math.max(0, score))
}

// Fonction pour filtrer et trier les prospects par score
function filterAndSortProspects(
  prospects: any[],
  userSector: string,
  userCompanySize: string,
  userLocation: string,
  userTargetPositions: string,
  numberOfLeads: number
) {
  // Calculer le score pour chaque prospect
  const scoredProspects = prospects.map(prospect => ({
    ...prospect,
    aiScore: calculateAIScore(
      prospect,
      userSector,
      userCompanySize,
      userLocation,
      userTargetPositions
    )
  }))

  // Filtrer les prospects avec un score minimum de 60
  const qualifiedProspects = scoredProspects.filter(prospect => prospect.aiScore >= 60)

  // Trier par score décroissant
  const sortedProspects = qualifiedProspects.sort((a, b) => b.aiScore - a.aiScore)

  // Retourner le nombre demandé
  return sortedProspects.slice(0, numberOfLeads)
}

// Fonction Apollo pour récupérer de vrais prospects
async function searchProspectsWithApollo(
  sector: string,
  companySize: string,
  location: string,
  numberOfLeads: number,
  targetPositions?: string
): Promise<any[]> {
  try {
    console.log('🔍 Recherche Apollo pour de vrais prospects...')
    
    // Construire la requête Apollo avec des critères intelligents
    const searchQuery: any = {
      api_key: APOLLO_API_KEY,
      page: 1,
      per_page: Math.min(numberOfLeads * 5, 200), // Récupérer plus pour avoir du choix
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
        per_page: Math.min(numberOfLeads * 5, 200),
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
    console.log('🚀 Début génération leads qualifiés...')
    
    const cookieStore = cookies()

    // Utiliser la même méthode d'authentification que l'API leads
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

    // Vérifier l'utilisateur
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.log('❌ Erreur authentification:', authError)
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    console.log('✅ Utilisateur authentifié:', user.email)

    // Récupérer les données de la requête
    const { sector, companySize, location, numberOfLeads, targetPositions, precision } = await request.json()
    
    console.log('📋 Critères reçus:', { sector, companySize, location, numberOfLeads, targetPositions, precision })

    // Vérifier que la clé Apollo est configurée
    if (!APOLLO_API_KEY) {
      console.log('❌ Clé API Apollo non configurée')
      return NextResponse.json({ 
        error: 'Service de génération de leads non disponible',
        details: 'Clé API Apollo manquante'
      }, { status: 503 })
    }

    // Récupérer de vrais prospects Apollo
    console.log('🔍 Récupération prospects Apollo...')
    
    const apolloProspects = await searchProspectsWithApollo(
      sector, 
      companySize, 
      location, 
      numberOfLeads, 
      targetPositions
    )

    if (apolloProspects.length === 0) {
      console.log('❌ Aucun prospect trouvé avec ces critères')
      return NextResponse.json({ 
        error: 'Aucun prospect trouvé avec ces critères',
        details: 'Essayez de modifier vos critères de recherche ou contactez le support'
      }, { status: 404 })
    }

    console.log(`✅ ${apolloProspects.length} prospects Apollo trouvés`)
    
    // Filtrer et trier par score IA
    const qualifiedProspects = filterAndSortProspects(
      apolloProspects,
      sector,
      companySize,
      location,
      targetPositions,
      numberOfLeads
    )
    
    if (qualifiedProspects.length === 0) {
      console.log('❌ Aucun prospect qualifié après filtrage IA')
      return NextResponse.json({ 
        error: 'Aucun prospect qualifié trouvé',
        details: 'Vos critères sont trop restrictifs. Essayez de les élargir.'
      }, { status: 404 })
    }
    
    console.log(`🎯 ${qualifiedProspects.length} prospects qualifiés après filtrage`)
    
    // Convertir en format leads
    const finalLeads = qualifiedProspects.map(prospect => ({
      firstName: prospect.first_name || prospect.firstName || 'Prénom',
      lastName: prospect.last_name || prospect.lastName || 'Nom',
      email: prospect.email || `${prospect.first_name || 'prenom'}.${prospect.last_name || 'nom'}@${prospect.organization?.name || 'company'}.com`,
      company: prospect.organization?.name || 'Entreprise',
      sector: prospect.organization?.industry || sector || 'Technologie',
      position: prospect.title || 'Poste',
      aiScore: prospect.aiScore || 75,
      status: 'new'
    }))
    
    console.log('🎭 Leads finaux créés:', finalLeads)

    // Sauvegarder les leads en base avec Drizzle
    const leadsToSave = finalLeads.map(lead => ({
      userId: user.id,
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      company: lead.company,
      sector: lead.sector,
      position: lead.position,
      aiScore: lead.aiScore,
      status: lead.status,
      source: 'apollo'
    }))

    const savedLeads = []
    for (const lead of leadsToSave) {
      const [newLead] = await db.insert(leads).values(lead).returning()
      savedLeads.push(newLead)
    }

    console.log('✅ Leads sauvegardés en base:', savedLeads)

    // Retourner les leads générés
    return NextResponse.json({
      success: true,
      leads: savedLeads,
      message: `${numberOfLeads} lead${numberOfLeads > 1 ? 's' : ''} qualifié${numberOfLeads > 1 ? 's' : ''} généré${numberOfLeads > 1 ? 's' : ''} avec succès !`,
      source: 'apollo',
      totalFound: apolloProspects.length,
      qualifiedCount: qualifiedProspects.length
    })

  } catch (error) {
    console.error('❌ Erreur générale:', error)
    return NextResponse.json({ 
      error: 'Erreur lors de la génération de leads',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}

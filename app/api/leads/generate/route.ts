import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { db } from '@/lib/database'
import { leads } from '@/lib/schema'
import { 
  normalizeSector, 
  normalizeLocation, 
  normalizeCompanySize, 
  normalizePosition,
  FRENCH_CITIES 
} from '@/src/lib/leads/normalize'

// Forcer le runtime Node.js
export const runtime = 'nodejs'

const APOLLO_API_KEY = process.env.APOLLO_API_KEY

// Types pour la réponse structurée
interface LeadGenerationResponse {
  success: boolean
  data: any[]
  reason?: string
  meta?: {
    relaxed?: string[]
    provider?: string
    totalFound?: number
    attempts?: number
  }
  message: string
}

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

// Fonction Apollo avec relaxation automatique
async function searchProspectsWithApollo(
  sector: string,
  companySize: string,
  location: string,
  numberOfLeads: number,
  targetPositions?: string
): Promise<{ prospects: any[]; relaxed: string[]; attempts: number }> {
  let attempts = 0
  let relaxed: string[] = []
  
  // Étape A : Chercher avec tous les filtres
  attempts++
  console.log(`🔍 Tentative ${attempts}: Recherche avec tous les filtres`)
  
  let searchQuery: any = {
    api_key: APOLLO_API_KEY,
    page: 1,
    per_page: Math.min(numberOfLeads * 3, 100),
    q_organization_domains: "",
    q_organization_locations: [location]
  }

  if (companySize && companySize.trim()) {
    searchQuery.q_organization_employee_ranges = [companySize]
  }

  if (sector && sector.trim()) {
    const sectors = sector.split(',').map(s => s.trim()).filter(s => s)
    if (sectors.length > 0) {
      searchQuery.q_organization_industries = sectors
    }
  }

  if (targetPositions && targetPositions.trim()) {
    const positions = targetPositions.split(',').map(p => p.trim()).filter(p => p)
    if (positions.length > 0) {
      searchQuery.q_titles = positions
    }
  }

  console.log('📤 Requête Apollo (étape A):', JSON.stringify(searchQuery, null, 2))

  let response = await fetch('https://api.apollo.io/v1/people/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(searchQuery)
  })

  if (response.ok) {
    const data = await response.json()
    console.log(`📥 Réponse Apollo (étape A): ${data.people?.length || 0} prospects`)
    
    if (data.people && data.people.length > 0) {
      return { prospects: data.people, relaxed, attempts }
    }
  }

  // Étape B : Retirer la taille d'entreprise
  attempts++
  relaxed.push('size')
  console.log(`🔍 Tentative ${attempts}: Retrait du filtre taille d'entreprise`)
  
  delete searchQuery.q_organization_employee_ranges
  
  response = await fetch('https://api.apollo.io/v1/people/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(searchQuery)
  })

  if (response.ok) {
    const data = await response.json()
    console.log(`📥 Réponse Apollo (étape B): ${data.people?.length || 0} prospects`)
    
    if (data.people && data.people.length > 0) {
      return { prospects: data.people, relaxed, attempts }
    }
  }

  // Étape C : Tester avec des villes françaises
  const normalizedLocation = normalizeLocation(location)
  if (normalizedLocation && normalizedLocation.country === 'FR' && !normalizedLocation.city) {
    attempts++
    relaxed.push('city')
    console.log(`🔍 Tentative ${attempts}: Test avec villes françaises`)
    
    for (const city of FRENCH_CITIES) {
      const cityQuery = { ...searchQuery, q_organization_locations: [`${city}, France`] }
      
      response = await fetch('https://api.apollo.io/v1/people/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(cityQuery)
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`📥 Réponse Apollo (${city}): ${data.people?.length || 0} prospects`)
        
        if (data.people && data.people.length > 0) {
          relaxed.push(`city=${city}`)
          return { prospects: data.people, relaxed, attempts }
        }
      }
    }
  }

  // Étape D : Assouplir le secteur
  attempts++
  relaxed.push('sector')
  console.log(`🔍 Tentative ${attempts}: Assouplissement du secteur`)
  
  delete searchQuery.q_organization_industries
  
  response = await fetch('https://api.apollo.io/v1/people/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(searchQuery)
  })

  if (response.ok) {
    const data = await response.json()
    console.log(`📥 Réponse Apollo (étape D): ${data.people?.length || 0} prospects`)
    
    if (data.people && data.people.length > 0) {
      return { prospects: data.people, relaxed, attempts }
    }
  }

  return { prospects: [], relaxed, attempts }
}

export async function POST(request: NextRequest): Promise<NextResponse<LeadGenerationResponse>> {
  try {
    console.log('🚀 Début génération leads...')
    console.log('🔑 Clé Apollo:', APOLLO_API_KEY ? 'Présente' : 'MANQUANTE')
    
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
      return NextResponse.json({ 
        success: false,
        data: [],
        reason: 'UNAUTHORIZED',
        message: 'Non autorisé'
      }, { status: 401 })
    }

    console.log('✅ Utilisateur authentifié:', user.email)

    // Récupérer les données de la requête
    const { sector, companySize, location, numberOfLeads, targetPositions, precision } = await request.json()
    
    console.log('📋 Payload reçu:', JSON.stringify({
      sector,
      companySize,
      location,
      targetPositions,
      numberOfLeads,
      precision
    }, null, 2))

    // Vérifier que la clé Apollo est configurée
    if (!APOLLO_API_KEY) {
      console.log('❌ Clé API Apollo non configurée')
      return NextResponse.json({ 
        success: false,
        data: [],
        reason: 'MISSING_API_KEY:APOLLO',
        message: 'Service de génération de leads non disponible'
      }, { status: 503 })
    }

    // Normaliser les inputs
    const normalizedSector = normalizeSector(sector)
    const normalizedLocation = normalizeLocation(location)
    const normalizedSize = normalizeCompanySize(companySize)
    const normalizedPositions = normalizePosition(targetPositions || '')

    console.log('🔧 Inputs normalisés:', JSON.stringify({
      sector: { original: sector, normalized: normalizedSector },
      location: { original: location, normalized: normalizedLocation },
      companySize: { original: companySize, normalized: normalizedSize },
      positions: { original: targetPositions, normalized: normalizedPositions }
    }, null, 2))

    // Recherche Apollo avec relaxation automatique
    console.log('🔍 Début recherche Apollo avec relaxation automatique...')
    
    const { prospects, relaxed, attempts } = await searchProspectsWithApollo(
      normalizedSector, 
      companySize, 
      location, 
      numberOfLeads, 
      targetPositions
    )

    if (prospects.length === 0) {
      console.log('❌ Aucun prospect trouvé après toutes les tentatives')
      return NextResponse.json({ 
        success: false,
        data: [],
        reason: 'NO_MATCHES_FROM_PROVIDER',
        meta: {
          provider: 'apollo',
          attempts,
          relaxed
        },
        message: 'Aucun prospect trouvé avec ces critères'
      }, { status: 200 })
    }

    console.log(`✅ ${prospects.length} prospects trouvés après ${attempts} tentatives`)
    console.log('🎯 Filtres relâchés:', relaxed)

    // Filtrer et trier par score IA
    const scoredProspects = prospects.map(prospect => ({
      ...prospect,
      aiScore: calculateAIScore(
        prospect,
        sector,
        companySize,
        location,
        targetPositions || ''
      )
    }))

    // Filtrer les prospects avec un score minimum de 60
    const qualifiedProspects = scoredProspects.filter(prospect => prospect.aiScore >= 60)
    
    if (qualifiedProspects.length === 0) {
      console.log('❌ Aucun prospect qualifié après filtrage IA')
      return NextResponse.json({ 
        success: false,
        data: [],
        reason: 'TOO_STRICT_FILTERS:ai_score',
        meta: {
          provider: 'apollo',
          attempts,
          relaxed,
          totalFound: prospects.length
        },
        message: 'Aucun prospect qualifié trouvé'
      }, { status: 200 })
    }

    // Trier par score décroissant et prendre le nombre demandé
    const finalProspects = qualifiedProspects
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, numberOfLeads)

    console.log(`🎯 ${finalProspects.length} prospects qualifiés après filtrage IA`)

    // Convertir en format leads
    const finalLeads = finalProspects.map(prospect => ({
      firstName: prospect.first_name || prospect.firstName || 'Prénom',
      lastName: prospect.last_name || prospect.lastName || 'Nom',
      email: prospect.email || `${prospect.first_name || 'prenom'}.${prospect.last_name || 'nom'}@${prospect.organization?.name || 'company'}.com`,
      company: prospect.organization?.name || 'Entreprise',
      sector: prospect.organization?.industry || sector || 'Technologie',
      position: prospect.title || 'Poste',
      aiScore: prospect.aiScore,
      status: 'new'
    }))
    
    console.log('🎭 Leads finaux créés:', finalLeads)

    // Sauvegarder les leads en base avec Drizzle
    const leadsToSave = finalLeads.map((lead: any) => ({
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

    // Retourner la réponse structurée
    return NextResponse.json({
      success: true,
      data: savedLeads,
      meta: {
        provider: 'apollo',
        totalFound: prospects.length,
        qualifiedCount: qualifiedProspects.length,
        attempts,
        relaxed: relaxed.length > 0 ? relaxed : undefined
      },
      message: `${numberOfLeads} lead${numberOfLeads > 1 ? 's' : ''} généré${numberOfLeads > 1 ? 's' : ''} avec succès !`
    })

  } catch (error) {
    console.error('❌ Erreur générale:', error)
    return NextResponse.json({ 
      success: false,
      data: [],
      reason: 'INTERNAL_ERROR',
      message: 'Erreur lors de la génération de leads'
    }, { status: 500 })
  }
}

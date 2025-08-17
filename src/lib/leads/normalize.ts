export function normalizeSector(input: string): string {
  if (!input) return ''
  
  const s = input.toLowerCase().trim()
  const map: Record<string, string> = {
    'technologie': 'technology',
    'tech': 'technology',
    'informatique': 'information technology',
    'it': 'information technology',
    'software': 'software',
    'saas': 'software',
    'e-commerce': 'ecommerce',
    'ecommerce': 'ecommerce',
    'finance': 'financial services',
    'banque': 'financial services',
    'assurance': 'financial services',
    'santé': 'healthcare',
    'sante': 'healthcare',
    'médical': 'healthcare',
    'medical': 'healthcare',
    'éducation': 'education',
    'education': 'education',
    'immobilier': 'real estate',
    'consulting': 'consulting',
    'conseil': 'consulting',
    'marketing': 'marketing',
    'publicité': 'advertising',
    'publicite': 'advertising',
    'logistique': 'logistics',
    'transport': 'transportation',
    'industrie': 'manufacturing',
    'production': 'manufacturing'
  }
  
  return map[s] ?? input
}

export function normalizeLocation(input: string): { city?: string; country: string } | null {
  if (!input) return null
  
  const raw = input.trim()
  if (!raw) return null
  
  // Cas simple : juste "France"
  if (/^france$/i.test(raw)) return { country: 'FR' }
  
  // Parser "Paris, France" / "Lyon"
  const parts = raw.split(',').map(x => x.trim())
  
  if (parts.length === 1) {
    // Si pas de pays spécifié, default FR
    return { city: parts[0], country: 'FR' }
  }
  
  // "Paris, France" -> { city: "Paris", country: "FR" }
  const city = parts[0]
  const country = parts[1].toUpperCase().slice(0, 2)
  
  return { city, country }
}

export function normalizeCompanySize(label: string): { min: number; max: number } | null {
  if (!label) return null
  
  // "1-10 employés" -> { min: 1, max: 10 }
  const m = label.match(/(\d+)\s*[-–]\s*(\d+)/)
  if (m) {
    return { min: +m[1], max: +m[2] }
  }
  
  // Gérer les cas spéciaux
  if (label.includes('5000+') || label.includes('5000+')) {
    return { min: 5000, max: 100000 }
  }
  
  return null
}

export function normalizePosition(input: string): string[] {
  if (!input) return []
  
  const positions = input.split(',').map(p => p.trim()).filter(p => p)
  
  const map: Record<string, string> = {
    'ceo': 'CEO',
    'directeur': 'Director',
    'directrice': 'Director',
    'manager': 'Manager',
    'chef de projet': 'Project Manager',
    'cto': 'CTO',
    'cfo': 'CFO',
    'cmo': 'CMO',
    'cso': 'CSO'
  }
  
  return positions.map(pos => {
    const normalized = pos.toLowerCase()
    return map[normalized] ?? pos
  })
}

// Villes françaises populaires pour le fallback
export const FRENCH_CITIES = [
  'Paris', 'Lyon', 'Marseille', 'Lille', 'Toulouse', 
  'Bordeaux', 'Nantes', 'Nice', 'Montpellier', 'Strasbourg',
  'Rennes', 'Reims', 'Saint-Étienne', 'Toulon', 'Angers',
  'Grenoble', 'Dijon', 'Nîmes', 'Saint-Denis', 'Villeurbanne'
]

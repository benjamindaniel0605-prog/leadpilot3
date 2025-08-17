#!/usr/bin/env node

/**
 * Script de test pour l'API de génération de leads
 * Usage: npm run leads:smoke
 */

const fetch = require('node-fetch')

const API_BASE = 'http://localhost:3000'

async function testLeadGeneration() {
  console.log('🧪 Test de l\'API de génération de leads...\n')
  
  try {
    // Test 1: Génération avec critères basiques
    console.log('📋 Test 1: Génération avec critères basiques')
    const response1 = await fetch(`${API_BASE}/api/leads/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sector: 'Technologie',
        companySize: '1-10 employés',
        location: 'France',
        numberOfLeads: 1,
        targetPositions: 'CEO,CTO'
      })
    })
    
    const result1 = await response1.json()
    console.log(`Status: ${response1.status}`)
    console.log('Réponse:', JSON.stringify(result1, null, 2))
    console.log('')
    
    // Test 2: Test avec secteur français
    console.log('📋 Test 2: Test avec secteur français')
    const response2 = await fetch(`${API_BASE}/api/leads/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sector: 'Informatique',
        companySize: '11-50 employés',
        location: 'Paris, France',
        numberOfLeads: 2,
        targetPositions: 'Manager'
      })
    })
    
    const result2 = await response2.json()
    console.log(`Status: ${response2.status}`)
    console.log('Réponse:', JSON.stringify(result2, null, 2))
    console.log('')
    
    // Test 3: Test avec localisation simple
    console.log('📋 Test 3: Test avec localisation simple')
    const response3 = await fetch(`${API_BASE}/api/leads/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sector: 'Finance',
        companySize: '51-200 employés',
        location: 'Lyon',
        numberOfLeads: 1
      })
    })
    
    const result3 = await response3.json()
    console.log(`Status: ${response3.status}`)
    console.log('Réponse:', JSON.stringify(result3, null, 2))
    console.log('')
    
    console.log('✅ Tests terminés !')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    process.exit(1)
  }
}

// Vérifier que le serveur est démarré
async function checkServer() {
  try {
    const response = await fetch(`${API_BASE}/api/test`)
    if (response.ok) {
      return true
    }
  } catch (error) {
    return false
  }
  return false
}

async function main() {
  console.log('🔍 Vérification du serveur...')
  
  if (!(await checkServer())) {
    console.error('❌ Serveur non accessible sur http://localhost:3000')
    console.log('💡 Assurez-vous que le serveur est démarré avec: npm run dev')
    process.exit(1)
  }
  
  console.log('✅ Serveur accessible\n')
  await testLeadGeneration()
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { testLeadGeneration }

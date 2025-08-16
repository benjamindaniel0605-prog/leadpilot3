'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import LeadGenerator from './components/lead-generator'
import LeadsList from './components/leads-list'

export default function LeadsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleLeadsUpdated = () => {
    // Forcer le rafraîchissement des composants
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation retour */}
        <div className="mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Retour au Dashboard</span>
          </Link>
        </div>
        
        {/* Header de la page */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Gestion des Leads</h1>
          <p className="text-gray-400 mt-2">Gérez vos prospects et leur scoring IA</p>
        </div>

        {/* Générateur de leads */}
        <div className="mb-8">
          <LeadGenerator onLeadsGenerated={handleLeadsUpdated} />
        </div>

        {/* Liste des leads */}
        <div key={refreshKey}>
          <LeadsList onLeadsUpdated={handleLeadsUpdated} />
        </div>
      </div>
    </div>
  )
}

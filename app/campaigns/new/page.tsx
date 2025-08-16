'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function NewCampaignPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour au Dashboard</span>
          </Link>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Nouvelle Campagne</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom de la campagne
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Campagne Q1 - E-commerce"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description de votre campagne..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Template d'email
                </label>
                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Sélectionner un template</option>
                  <option value="template1">Template 1 - Présentation</option>
                  <option value="template2">Template 2 - Offre spéciale</option>
                  <option value="template3">Template 3 - Newsletter</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date de lancement
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cible (Leads)
              </label>
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded" />
                    <span className="text-white">Tous les leads (3)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded" />
                    <span className="text-white">Secteur E-commerce (1)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded" />
                    <span className="text-white">Secteur Finance (1)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-6">
              <Link
                href="/dashboard"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Annuler
              </Link>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Créer la Campagne
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

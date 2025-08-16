'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, PlusIcon, EyeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      name: 'Présentation entreprise',
      category: 'Présentation',
      description: 'Template pour présenter votre entreprise et vos services',
      plan: 'free',
      timesUsed: 12,
      openRate: 78
    },
    {
      id: 2,
      name: 'Offre spéciale',
      category: 'Commercial',
      description: 'Template pour promouvoir une offre ou une promotion',
      plan: 'starter',
      timesUsed: 8,
      openRate: 82
    },
    {
      id: 3,
      name: 'Newsletter mensuelle',
      category: 'Newsletter',
      description: 'Template pour vos newsletters régulières',
      plan: 'pro',
      timesUsed: 5,
      openRate: 91
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour au Dashboard</span>
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Templates</h1>
            <p className="text-gray-400 mt-2">Gérez vos templates d'emails</p>
          </div>
          <button className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>Nouveau Template</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    template.plan === 'free' ? 'bg-green-100 text-green-800' :
                    template.plan === 'starter' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {template.plan === 'free' ? 'Free' : 
                     template.plan === 'starter' ? 'Starter' : 'Pro'}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>Utilisé {template.timesUsed} fois</span>
                <span>Taux d'ouverture: {template.openRate}%</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-lg transition-colors">
                  <EyeIcon className="w-4 h-4" />
                  <span>Voir</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  <DocumentDuplicateIcon className="w-4 h-4" />
                  <span>Utiliser</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Créer un template personnalisé</h3>
          <p className="text-gray-400 mb-4">
            Créez vos propres templates d'emails en utilisant notre éditeur drag & drop ou en important du HTML.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Commencer à créer
          </button>
        </div>
      </div>
    </div>
  )
}

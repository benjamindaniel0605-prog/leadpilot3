'use client'

import React from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">LeadPilot Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Accueil
              </Link>
              <button 
                onClick={() => window.location.href = '/login'}
                className="text-gray-600 hover:text-gray-900"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🎉 Bienvenue sur votre Dashboard !
              </h2>
              <p className="text-gray-600 mb-6">
                Votre application LeadPilot est maintenant fonctionnelle.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">✅ Fonctionnalités prêtes :</h3>
                  <ul className="text-blue-700 mt-2 space-y-1">
                    <li>• Page d'accueil avec design moderne</li>
                    <li>• Système d'authentification (login/register)</li>
                    <li>• API routes configurées</li>
                    <li>• Déploiement Vercel réussi</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900">🚧 Prochaines étapes :</h3>
                  <ul className="text-yellow-700 mt-2 space-y-1">
                    <li>• Configurer les variables d'environnement</li>
                    <li>• Connecter Supabase et Stripe</li>
                    <li>• Ajouter la gestion des leads</li>
                    <li>• Implémenter les fonctionnalités métier</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

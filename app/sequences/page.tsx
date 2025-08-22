'use client'

import { useState, useEffect } from 'react'
import { 
  LockClosedIcon,
  PlusIcon,
  PlayIcon,
  PauseIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface Sequence {
  id: string
  name: string
  description: string
  steps: number
  status: 'active' | 'paused' | 'draft'
  leadsCount: number
  openRate: number
  replyRate: number
  createdAt: string
}

export default function SequencesPage() {
  const [sequences, setSequences] = useState<Sequence[]>([])
  const [userPlan, setUserPlan] = useState<string>('free')
  const [loading, setLoading] = useState(true)

  // Récupérer le plan de l'utilisateur
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await fetch('/api/user/quotas')
        if (response.ok) {
          const data = await response.json()
          setUserPlan(data.plan || 'free')
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du plan:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPlan()
  }, [])

  const isProOrGrowth = userPlan === 'pro' || userPlan === 'growth'
  const maxSteps = userPlan === 'pro' ? 3 : userPlan === 'growth' ? 5 : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400">Chargement...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!isProOrGrowth) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Séquences</h1>
            <p className="text-gray-400">
              Automatisez vos relances avec des séquences multi-étapes
            </p>
          </div>

          {/* Contenu verrouillé */}
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
            <div className="flex flex-col items-center space-y-6">
              <LockClosedIcon className="w-24 h-24 text-gray-500" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Fonctionnalité Pro & Growth
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Les séquences automatisées sont disponibles uniquement avec les plans Pro (3 étapes) et Growth (5 étapes). 
                  Créez des campagnes multi-étapes intelligentes qui s'adaptent aux réactions de vos prospects.
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold text-lg"
              >
                Passer à Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Séquences Multi-étapes</h1>
          <p className="text-gray-400">
            Automatisez vos follow-ups avec des séquences intelligentes
          </p>
        </div>

        {/* Bouton Nouvelle Séquence */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => toast.info('Fonctionnalité en cours de développement')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nouvelle Séquence</span>
          </button>
        </div>

        {/* Liste des séquences */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Vos Séquences</h2>
          
          {sequences.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <PlusIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Aucune séquence créée
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Créez votre première séquence pour automatiser vos relances et augmenter vos taux de réponse.
                    </p>
                    <button
                      onClick={() => toast.info('Fonctionnalité en cours de développement')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2 mx-auto"
                    >
                      <PlusIcon className="w-5 h-5" />
                      <span>Créer votre première séquence</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {sequences.map((sequence) => (
                <div key={sequence.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {sequence.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sequence.status === 'active' ? 'bg-green-600 text-green-100' :
                          sequence.status === 'paused' ? 'bg-yellow-600 text-yellow-100' :
                          'bg-gray-600 text-gray-100'
                        }`}>
                          {sequence.status === 'active' ? 'Active' :
                           sequence.status === 'paused' ? 'En pause' : 'Brouillon'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{sequence.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <span>{sequence.steps} étapes</span>
                        <span>{sequence.leadsCount} leads</span>
                        <span>Taux d'ouverture: {sequence.openRate}%</span>
                        <span>Taux de réponse: {sequence.replyRate}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toast.info('Fonctionnalité en cours de développement')}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toast.info('Fonctionnalité en cours de développement')}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                      >
                        {sequence.status === 'active' ? (
                          <PauseIcon className="w-5 h-5" />
                        ) : (
                          <PlayIcon className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => toast.info('Fonctionnalité en cours de développement')}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informations sur le plan */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-blue-300 text-sm">
              Plan {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} : 
              Vous pouvez créer des séquences jusqu'à {maxSteps} étapes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

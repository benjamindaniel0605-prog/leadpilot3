'use client'

import React, { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  EyeIcon, 
  SparklesIcon,
  LockClosedIcon,
  DocumentTextIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'
import { 
  emailTemplates, 
  getTemplatesByPlan, 
  getPlanStats, 
  type EmailTemplate 
} from '@/src/lib/templates-data'

interface UserQuotas {
  plan: string
  limits: {
    leads: number
    variations: number
  }
  usage: {
    leads: number
    variations: number
  }
  remaining: {
    leads: number
    variations: number
  }
  percentage: {
    leads: number
    variations: number
  }
}

export default function TemplatesPage() {
  const [quotas, setQuotas] = useState<UserQuotas | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'free' | 'starter' | 'pro' | 'growth'>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Récupérer les quotas utilisateur
  useEffect(() => {
    fetchQuotas()
  }, [])

  const fetchQuotas = async () => {
    try {
      const response = await fetch('/api/user/quotas')
      if (response.ok) {
        const data = await response.json()
        setQuotas(data)
      }
    } catch (error) {
      console.error('Erreur chargement quotas:', error)
    }
  }

  // Obtenir les templates selon le plan de l'utilisateur
  const getUserTemplates = () => {
    if (!quotas) return []
    const userPlan = quotas.plan as 'free' | 'starter' | 'pro' | 'growth'
    return getTemplatesByPlan(userPlan)
  }

  // Filtrer les templates selon la sélection
  const getFilteredTemplates = () => {
    const userTemplates = getUserTemplates()
    
    if (selectedFilter === 'all') {
      return userTemplates
    }
    
    return userTemplates.filter(template => template.plan === selectedFilter)
  }

  // Obtenir les statistiques pour chaque filtre
  const getFilterStats = () => {
    const userTemplates = getUserTemplates()
    const totalTemplates = userTemplates.length
    
    return {
      all: { count: totalTemplates, total: 30 },
      free: { count: userTemplates.filter(t => t.plan === 'free').length, total: 1 },
      starter: { count: userTemplates.filter(t => t.plan === 'starter').length, total: 5 },
      pro: { count: userTemplates.filter(t => t.plan === 'pro').length, total: 15 },
      growth: { count: userTemplates.filter(t => t.plan === 'growth').length, total: 30 }
    }
  }

  const handleChooseTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setShowTemplateModal(true)
  }

  const handleCreatePersonalEmail = () => {
    setShowCreateModal(true)
  }

  const handleUseTemplate = async (templateName: string) => {
    try {
      // Ici on pourrait sauvegarder le template dans "Mes Emails"
      // Pour l'instant, on simule juste
      toast.success(`Template "${templateName}" ajouté à Mes Emails !`)
      setShowTemplateModal(false)
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du template')
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'starter': return 'bg-blue-100 text-blue-800'
      case 'pro': return 'bg-purple-100 text-purple-800'
      case 'growth': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'free': return 'Free'
      case 'starter': return 'Starter'
      case 'pro': return 'Pro'
      case 'growth': return 'Growth'
      default: return plan
    }
  }

  const filteredTemplates = getFilteredTemplates()
  const filterStats = getFilterStats()

  if (!quotas) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Templates d'Emails</h1>
            <p className="text-gray-400 mt-2">30 templates optimisés avec variations IA</p>
          </div>
          <button 
            onClick={handleCreatePersonalEmail}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>+ Écrire Email Personnel</span>
          </button>
        </div>

        {/* Filtres par plan */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {Object.entries(filterStats).map(([filter, stats]) => {
            const isSelected = selectedFilter === filter
            const isLocked = filter !== 'all' && filter !== 'free' && 
              (filter === 'starter' && quotas.plan === 'free') ||
              (filter === 'pro' && ['free', 'starter'].includes(quotas.plan)) ||
              (filter === 'growth' && ['free', 'starter', 'pro'].includes(quotas.plan))
            
            return (
              <button
                key={filter}
                onClick={() => !isLocked && setSelectedFilter(filter as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isLocked
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                disabled={isLocked}
              >
                <span>{filter === 'all' ? 'Tous' : getPlanName(filter)}</span>
                <span className="text-sm opacity-75">
                  ({stats.count}/{stats.total})
                </span>
                {isLocked && <LockClosedIcon className="w-4 h-4" />}
              </button>
            )
          })}
        </div>

        {/* Grille des templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(template.plan)}`}>
                    {getPlanName(template.plan)}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>Utilisé {template.timesUsed} fois</span>
                <span>Taux ouverture: {template.openRate}%</span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleChooseTemplate(template)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-lg transition-colors"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>Voir</span>
                </button>
                <button 
                  onClick={() => handleChooseTemplate(template)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <SparklesIcon className="w-4 h-4" />
                  <span>Choisir Template</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun template */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucun template disponible</h3>
            <p className="text-gray-500">
              {selectedFilter === 'all' 
                ? 'Aucun template disponible pour votre plan actuel.'
                : `Aucun template ${getPlanName(selectedFilter)} disponible.`
              }
            </p>
          </div>
        )}

        {/* Modal de détail du template */}
        {showTemplateModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTemplate.name}</h2>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getPlanColor(selectedTemplate.plan)}`}>
                    {getPlanName(selectedTemplate.plan)}
                  </span>
                </div>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Objet</h3>
                  <p className="text-white bg-gray-700 p-3 rounded-lg">{selectedTemplate.subject}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Contenu</h3>
                  <div className="text-white bg-gray-700 p-3 rounded-lg whitespace-pre-wrap">
                    {selectedTemplate.body}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                <span>Utilisé: {selectedTemplate.timesUsed} fois</span>
                <span>Taux ouverture: {selectedTemplate.openRate}%</span>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={() => handleUseTemplate(selectedTemplate.name)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Choisir Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de création d'email personnel */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Créer un email personnel</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-400 mb-6">
                Créez votre propre email à partir de zéro. Il sera ajouté à "Mes Emails" où vous pourrez le modifier et générer des variations IA.
              </p>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  onClick={() => {
                    toast.success('Email personnel créé ! Redirection vers Mes Emails...')
                    setShowCreateModal(false)
                    // Ici on redirigerait vers Mes Emails
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

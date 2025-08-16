'use client'

import React, { useState, useEffect } from 'react'
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  MapPinIcon, 
  BriefcaseIcon,
  SparklesIcon,
  XMarkIcon,
  EyeIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

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

interface LeadGeneratorProps {
  onLeadsGenerated: () => void
}

export default function LeadGenerator({ onLeadsGenerated }: LeadGeneratorProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [quotas, setQuotas] = useState<UserQuotas | null>(null)
  const [openDropdown, setOpenDropdown] = useState<'sector' | 'positions' | null>(null)
  
  // Champs de génération
  const [formData, setFormData] = useState({
    sector: '',
    companySize: '',
    location: 'France',
    targetPositions: '',
    precision: '',
    numberOfLeads: 1
  })

  // Options prédéfinies
  const sectors = [
    'Technologie', 'Finance', 'E-commerce', 'Santé', 'Éducation',
    'Immobilier', 'Consulting', 'Marketing', 'Logistique', 'Industrie'
  ]

  const companySizes = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'
  ]

  const positions = [
    'CEO', 'Directeur Commercial', 'Directeur Marketing', 'CTO', 'CFO',
    'Directeur des Ventes', 'Responsable Marketing', 'Chef de Projet'
  ]

  // Récupérer les quotas utilisateur
  useEffect(() => {
    fetchQuotas()
    
    // Rafraîchir les quotas toutes les 30 secondes
    const interval = setInterval(fetchQuotas, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Fermer les menus déroulants quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [openDropdown])

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

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerateLeads = async () => {
    // Validation
    if (!formData.sector || !formData.companySize) {
      toast.error('Veuillez remplir les champs obligatoires')
      return
    }

    if (formData.numberOfLeads > (quotas?.remaining.leads || 0)) {
      toast.error(`Vous n'avez que ${quotas?.remaining.leads} leads disponibles`)
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/leads/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(`${data.leads.length} leads générés avec succès !`)
        
        // Réinitialiser le formulaire
        setFormData({
          sector: '',
          companySize: '',
          location: 'France',
          targetPositions: '',
          precision: '',
          numberOfLeads: 1
        })
        
        // Actualiser les quotas
        await fetchQuotas()
        
        // Notifier le composant parent
        onLeadsGenerated()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Erreur lors de la génération')
      }
    } catch (error) {
      console.error('Erreur génération:', error)
      toast.error('Erreur lors de la génération des leads')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCreateExampleLeads = async () => {
    setIsGenerating(true)
    
    try {
      // Créer des leads d'exemple avec des données simulées
      const exampleLeads = [
        {
          firstName: 'Julie',
          lastName: 'Richard',
          email: 'julie.richard@ecom-plus.fr',
          company: 'EcommercePlus',
          sector: 'E-commerce',
          position: 'CEO',
          score: 85,
          status: 'new'
        },
        {
          firstName: 'Nicolas',
          lastName: 'Garcia',
          email: 'nicolas.garcia@financesecure.com',
          company: 'FinanceSecure',
          sector: 'Finance',
          position: 'Directeur Commercial',
          score: 92,
          status: 'new'
        }
      ]

      // Simuler l'ajout en base
      for (const lead of exampleLeads) {
        await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(lead)
        })
      }

      toast.success('Leads d\'exemple créés avec succès !')
      await fetchQuotas()
      onLeadsGenerated()
      
    } catch (error) {
      console.error('Erreur création leads exemple:', error)
      toast.error('Erreur lors de la création des leads d\'exemple')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!quotas) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      {/* Header avec bouton masquer/afficher */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <EyeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Génération de Leads</h3>
            <p className="text-sm text-gray-400">Générez des leads qualifiés avec l'IA</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreateExampleLeads}
            disabled={isGenerating}
            className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <UserGroupIcon className="w-4 h-4" />
            <span>Créer des leads d'exemple</span>
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <>
                <XMarkIcon className="w-4 h-4" />
                <span>Masquer</span>
              </>
            ) : (
              <>
                <EyeIcon className="w-4 h-4" />
                <span>Afficher</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Affichage des quotas */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-300">
              Plan {quotas.plan === 'free' ? 'Free' : quotas.plan === 'starter' ? 'Starter' : quotas.plan === 'pro' ? 'Pro' : 'Growth'}
            </span>
            <span className="text-xs text-gray-400">
              {quotas.usage.leads}/{quotas.limits.leads} leads utilisés
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Limite: {quotas.remaining.leads} leads disponibles</div>
            <div className="w-32 bg-gray-600 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${quotas.percentage.leads}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire de génération */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Première ligne */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Secteur d'activité */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Secteur d'activité <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <BuildingOfficeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  placeholder="Tapez ou sélectionnez un secteur"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'sector' ? null : 'sector')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </button>
                {/* Menu déroulant des secteurs populaires */}
                {openDropdown === 'sector' && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {['Technologie', 'Finance', 'Santé', 'Éducation', 'E-commerce', 'Marketing', 'Consulting', 'Manufacturing', 'Real Estate', 'Transport'].map((sector) => (
                      <button
                        key={sector}
                        type="button"
                        onClick={() => {
                          const currentSectors = formData.sector.split(',').map(s => s.trim()).filter(s => s)
                          if (!currentSectors.includes(sector)) {
                            const newSectors = currentSectors.length > 0 ? [...currentSectors, sector] : [sector]
                            handleInputChange('sector', newSectors.join(', '))
                          }
                          setOpenDropdown(null)
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Séparez plusieurs secteurs par des virgules
              </div>
            </div>

            {/* Taille d'entreprise */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Taille d'entreprise <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <BuildingOfficeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tapez ou sélectionnez une taille</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size} employés</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Deuxième ligne */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Localisation */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Localisation
              </label>
              <div className="relative">
                <MapPinIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="France"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Nombre de leads */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre de leads
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleInputChange('numberOfLeads', Math.max(1, formData.numberOfLeads - 1))}
                  disabled={formData.numberOfLeads <= 1}
                  className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={formData.numberOfLeads}
                  onChange={(e) => handleInputChange('numberOfLeads', parseInt(e.target.value) || 1)}
                  min="1"
                  max={quotas.remaining.leads}
                  className="w-20 text-center bg-gray-700 border border-gray-600 rounded-lg text-white py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleInputChange('numberOfLeads', Math.min(quotas.remaining.leads, formData.numberOfLeads + 1))}
                  disabled={formData.numberOfLeads >= quotas.remaining.leads}
                  className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Limite: {quotas.remaining.leads} leads disponibles
              </div>
            </div>
          </div>

          {/* Troisième ligne */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Postes ciblés */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Postes ciblés <span className="text-gray-500">(optionnel)</span>
              </label>
              <div className="relative">
                <BriefcaseIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.targetPositions}
                  onChange={(e) => handleInputChange('targetPositions', e.target.value)}
                  placeholder="Tapez ou sélectionnez des postes"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'positions' ? null : 'positions')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </button>
                {/* Menu déroulant des postes populaires */}
                {openDropdown === 'positions' && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {['CEO', 'Directeur Marketing', 'CTO', 'Directeur Commercial', 'Directeur Financier', 'Directeur RH', 'Directeur Opérationnel', 'Manager', 'Chef de Projet', 'Consultant'].map((position) => (
                      <button
                        key={position}
                        type="button"
                        onClick={() => {
                          const currentPositions = formData.targetPositions.split(',').map(p => p.trim()).filter(p => p)
                          if (!currentPositions.includes(position)) {
                            const newPositions = currentPositions.length > 0 ? [...currentPositions, position] : [position]
                            handleInputChange('targetPositions', newPositions.join(', '))
                          }
                          setOpenDropdown(null)
                        }}
                        className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                      >
                        {position}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Séparez plusieurs postes par des virgules
              </div>
            </div>

            {/* Spécialisation */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Précision <span className="text-gray-500">(facultatif)</span>
              </label>
              <div className="relative">
                <SparklesIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.precision}
                  onChange={(e) => handleInputChange('precision', e.target.value)}
                  placeholder=""
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              onClick={() => {
                setFormData({
                  sector: '',
                  companySize: '',
                  location: 'France',
                  targetPositions: '',
                  precision: '',
                  numberOfLeads: 1
                })
              }}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Annuler
            </button>
            
            <button
              onClick={handleGenerateLeads}
              disabled={isGenerating || !formData.sector || !formData.companySize}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <SparklesIcon className="w-5 h-5" />
              )}
              <span>
                {isGenerating ? 'Génération...' : `Générer ${formData.numberOfLeads} lead${formData.numberOfLeads > 1 ? 's' : ''}`}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

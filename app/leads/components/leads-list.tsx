'use client'

import React, { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  EnvelopeIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  company: string
  sector: string
  position: string
  aiScore: number
  status: string
  createdAt: string
}

interface LeadsListProps {
  onLeadsUpdated: () => void
}

export default function LeadsList({ onLeadsUpdated }: LeadsListProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    sector: '',
    companySize: '',
    score: '',
    status: ''
  })

  // Charger les leads au montage
  useEffect(() => {
    fetchLeads()
  }, [])

  // Filtrer les leads quand les filtres changent
  useEffect(() => {
    filterLeads()
  }, [leads, searchTerm, filters])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/leads')
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
      } else {
        toast.error('Erreur lors du chargement des leads')
      }
    } catch (error) {
      console.error('Erreur chargement leads:', error)
      toast.error('Erreur lors du chargement des leads')
    } finally {
      setLoading(false)
    }
  }

  const filterLeads = () => {
    let filtered = [...leads]

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtre par secteur
    if (filters.sector) {
      filtered = filtered.filter(lead => lead.sector === filters.sector)
    }

    // Filtre par score
    if (filters.score) {
      const [minScore] = filters.score.split('-').map(Number)
      filtered = filtered.filter(lead => lead.aiScore >= minScore)
    }

    // Filtre par statut
    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status)
    }

    setFilteredLeads(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      sector: '',
      companySize: '',
      score: '',
      status: ''
    })
  }

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lead ?')) {
      return
    }

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Lead supprimé avec succès')
        await fetchLeads()
        onLeadsUpdated()
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur suppression:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Nouveau', color: 'bg-gray-100 text-gray-800' },
      contacted: { label: 'Contacté', color: 'bg-yellow-100 text-yellow-800' },
      qualified: { label: 'Qualifié', color: 'bg-blue-100 text-blue-800' },
      converted: { label: 'Converti', color: 'bg-green-100 text-green-800' }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 75) return 'bg-blue-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Section "Tous les Leads" */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Tous les Leads</h3>
          <p className="text-sm text-gray-400">
            {leads.length} leads au total • {filteredLeads.length} affichés
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-white font-medium">Filtrer les leads</span>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Tout effacer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Recherche */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un lead..."
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Secteur */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              SECTEUR D'ACTIVITÉ
            </label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filtrer par secteur...</option>
              {Array.from(new Set(leads.map(lead => lead.sector))).map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>

          {/* Score IA */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              SCORE IA
            </label>
            <select
              value={filters.score}
              onChange={(e) => setFilters(prev => ({ ...prev, score: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les scores</option>
              <option value="90-100">90%+ (Excellent)</option>
              <option value="75-89">75-89% (Bon)</option>
              <option value="60-74">60-74% (Moyen)</option>
              <option value="0-59">0-59% (Faible)</option>
            </select>
          </div>

          {/* Statut */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              STATUT DU LEAD
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="new">Nouveau</option>
              <option value="contacted">Contacté</option>
              <option value="qualified">Qualifié</option>
              <option value="converted">Converti</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des leads */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  CONTACT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ENTREPRISE
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  SCORE IA
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  STATUT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      {leads.length === 0 ? (
                        <div className="space-y-2">
                          <p>Aucun lead trouvé</p>
                          <p className="text-sm">Commencez par générer vos premiers leads</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p>Aucun lead ne correspond aux filtres</p>
                          <button
                            onClick={clearFilters}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Effacer les filtres
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-gray-400">{lead.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-white">{lead.company}</div>
                        <div className="text-sm text-gray-400">{lead.sector}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(lead.aiScore)}`}
                            style={{ width: `${lead.aiScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{lead.aiScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                          title="Contacter"
                        >
                          <EnvelopeIcon className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-green-400 hover:text-green-300 transition-colors p-1"
                          title="Modifier"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                          title="Supprimer"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

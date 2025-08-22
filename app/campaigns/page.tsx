'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon,
  CheckIcon,
  StarIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface Lead {
  id: string
  name: string
  company: string
  title: string
  email: string
  aiScore: number
  createdAt: string
  selected: boolean
}

interface CustomEmail {
  id: string
  name: string
  subject: string
  content: string
  createdAt: string
}

interface Campaign {
  id: string
  name: string
  emailId: string
  leads: string[]
  status: 'draft' | 'scheduled' | 'sent'
  createdAt: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [customEmails, setCustomEmails] = useState<CustomEmail[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [emailSearch, setEmailSearch] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    leadFilter: 'all' // 'all', 'high-score', 'none'
  })

  // Récupérer les vrais leads depuis l'API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads')
        if (response.ok) {
          const data = await response.json()
          const leadsWithSelection = data.map((lead: any) => ({
            ...lead,
            selected: false
          }))
          setLeads(leadsWithSelection)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des leads:', error)
        toast.error('Erreur lors du chargement des leads')
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  // Récupérer les vrais emails depuis "Mes Emails"
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // Ici on récupérerait les emails depuis l'API "Mes Emails"
        // Pour l'instant, on utilise un état vide
        setCustomEmails([])
      } catch (error) {
        console.error('Erreur lors de la récupération des emails:', error)
        toast.error('Erreur lors du chargement des emails')
      }
    }

    fetchEmails()
  }, [])

  const selectedLeadsCount = leads.filter(lead => lead.selected).length
  const highScoreLeads = leads.filter(lead => lead.aiScore > 80)

  // Filtrer les emails selon la recherche
  const filteredEmails = customEmails.filter(email =>
    email.name.toLowerCase().includes(emailSearch.toLowerCase()) ||
    email.subject.toLowerCase().includes(emailSearch.toLowerCase())
  )

  const handleSelectAll = () => {
    setLeads(leads.map(lead => ({ ...lead, selected: true })))
    setFormData({ ...formData, leadFilter: 'all' })
  }

  const handleSelectHighScore = () => {
    setLeads(leads.map(lead => ({ 
      ...lead, 
      selected: lead.aiScore > 80 
    })))
    setFormData({ ...formData, leadFilter: 'high-score' })
  }

  const handleDeselectAll = () => {
    setLeads(leads.map(lead => ({ ...lead, selected: false })))
    setFormData({ ...formData, leadFilter: 'none' })
  }

  const handleLeadToggle = (leadId: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, selected: !lead.selected }
        : lead
    ))
  }

  const handleCreateCampaign = () => {
    if (!formData.name.trim()) {
      toast.error('Veuillez saisir un nom de campagne')
      return
    }

    if (!formData.emailId) {
      toast.error('Veuillez sélectionner un email')
      return
    }

    const selectedLeads = leads.filter(lead => lead.selected)
    if (selectedLeads.length === 0) {
      toast.error('Veuillez sélectionner au moins un lead')
      return
    }

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.name,
      emailId: formData.emailId,
      leads: selectedLeads.map(lead => lead.id),
      status: 'draft',
      createdAt: new Date().toISOString()
    }

    setCampaigns([...campaigns, newCampaign])
    setShowCreateForm(false)
    setFormData({ name: '', emailId: '', leadFilter: 'all' })
    setLeads(leads.map(lead => ({ ...lead, selected: false })))
    
    toast.success('Campagne créée avec succès !')
  }

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Campagnes Email</h1>
          <p className="text-gray-400">
            Créez et gérez vos campagnes d'emailing
          </p>
        </div>

        {/* Bouton Nouvelle Campagne */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nouvelle Campagne</span>
          </button>
        </div>

        {/* Formulaire de création de campagne */}
        {showCreateForm && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Créer une Campagne</h2>
            
            <div className="space-y-6">
              {/* Nom de la campagne */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom de la campagne
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Prospection Q1 2024"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sélection d'email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                
                {/* Barre de recherche pour les emails */}
                <div className="relative mb-3">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    placeholder="Rechercher un email..."
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Liste des emails disponibles */}
                {customEmails.length === 0 ? (
                  <div className="px-3 py-4 bg-gray-700 border border-gray-600 rounded-md text-gray-400 text-center">
                    Aucun email disponible. Créez d'abord des emails dans "Mes Emails".
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredEmails.map((email) => (
                      <div
                        key={email.id}
                        onClick={() => setFormData({...formData, emailId: email.id})}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          formData.emailId === email.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium">{email.name}</div>
                        <div className="text-sm opacity-80">{email.subject}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sélection des leads cibles */}
              {leads.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Sélection des leads cibles
                  </label>
                  
                  {/* Boutons de filtres */}
                  <div className="flex items-center space-x-3 mb-4">
                    <button
                      onClick={handleSelectAll}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        formData.leadFilter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <CheckIcon className="w-4 h-4 inline mr-1" />
                      Tous les leads ({leads.length})
                    </button>
                    {highScoreLeads.length > 0 && (
                      <button
                        onClick={handleSelectHighScore}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          formData.leadFilter === 'high-score'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <StarIcon className="w-4 h-4 inline mr-1" />
                        Score &gt; 80% ({highScoreLeads.length})
                      </button>
                    )}
                    <button
                      onClick={handleDeselectAll}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        formData.leadFilter === 'none'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <XMarkIcon className="w-4 h-4 inline mr-1" />
                      Désélectionner tout
                    </button>
                    <span className="text-sm text-gray-400 ml-auto">
                      {selectedLeadsCount} sélectionné{selectedLeadsCount > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Liste des leads disponibles */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">
                      Vos leads disponibles
                    </h3>
                    <div className="space-y-2">
                      {leads.map((lead) => (
                        <div key={lead.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md">
                          <input
                            type="checkbox"
                            checked={lead.selected}
                            onChange={() => handleLeadToggle(lead.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-white">{lead.name}</div>
                            <div className="text-sm text-gray-400">
                              {lead.company} • {lead.title}
                            </div>
                            <div className="text-sm text-gray-400">{lead.email}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                              {lead.aiScore}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Message si aucun lead */}
              {leads.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    Aucun lead disponible. Générez d'abord des leads dans la section "Leads".
                  </p>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateCampaign}
                  disabled={customEmails.length === 0 || leads.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  Créer la campagne
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des campagnes récentes */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Campagnes Récentes</h2>
          
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">
                Aucune campagne créée pour le moment.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2 mx-auto"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Créer votre première campagne</span>
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {campaign.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {campaign.leads.length} lead{campaign.leads.length > 1 ? 's' : ''} • 
                        Créée le {new Date(campaign.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'draft' ? 'bg-yellow-600 text-yellow-100' :
                      campaign.status === 'scheduled' ? 'bg-blue-600 text-blue-100' :
                      'bg-green-600 text-green-100'
                    }`}>
                      {campaign.status === 'draft' ? 'Brouillon' :
                       campaign.status === 'scheduled' ? 'Programmée' : 'Envoyée'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

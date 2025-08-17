'use client'

import { useState, useEffect } from 'react'
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  StarIcon,
  CalendarIcon,
  ArrowPathIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface CustomEmail {
  id: string
  name: string
  subject: string
  content: string
  category: string
  createdAt: string
  isTemplate: boolean
  originalTemplateId?: string
}

export default function MesEmailsPage() {
  const [emails, setEmails] = useState<CustomEmail[]>([
    {
      id: '1',
      name: 'Email de présentation personnalisé',
      subject: 'Bonjour [PRENOM] - Une solution pour [ENTREPRISE]',
      content: `Bonjour [PRENOM],

Je me permets de vous contacter car je pense que [ENTREPRISE] pourrait être intéressée par notre solution.

Nous aidons les entreprises comme la vôtre à [BENEFICE_PRINCIPAL].

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?

Cordialement,
[EXPEDITEUR]`,
      category: 'Introduction',
      createdAt: '2024-01-15',
      isTemplate: false
    },
    {
      id: '2',
      name: 'Relance prospect qualifié',
      subject: 'Re: [SUJET_PRECEDENT] - Un petit rappel',
      content: `Bonjour [PRENOM],

Je me permets de revenir vers vous concernant [SUJET_PRECEDENT].

Avez-vous eu le temps de réfléchir à notre proposition ?

Je reste à votre disposition pour toute question.

Cordialement,
[EXPEDITEUR]`,
      category: 'Suivi',
      createdAt: '2024-01-14',
      isTemplate: false
    }
  ])

  const [selectedEmail, setSelectedEmail] = useState<CustomEmail | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    subject: '',
    content: ''
  })

  const handleEdit = (email: CustomEmail) => {
    setSelectedEmail(email)
    setEditData({
      name: email.name,
      subject: email.subject,
      content: email.content
    })
    setShowEditModal(true)
  }

  const handleView = (email: CustomEmail) => {
    setSelectedEmail(email)
    setShowViewModal(true)
  }

  const handleDelete = (id: string) => {
    setEmails(emails.filter(email => email.id !== id))
    toast.success('Email supprimé avec succès')
  }

  const handleSave = () => {
    if (selectedEmail) {
      setEmails(emails.map(email => 
        email.id === selectedEmail.id 
          ? { ...email, ...editData }
          : email
      ))
      toast.success('Email modifié avec succès')
      setShowEditModal(false)
    }
  }

  const handleAIVariation = () => {
    toast.info('Fonctionnalité de variation IA à venir')
  }

  const handleSuggestMeeting = () => {
    toast.info('Fonctionnalité de proposition de RDV à venir')
  }

  const handleRestoreOriginal = () => {
    if (selectedEmail?.originalTemplateId) {
      toast.info('Restauration du template original à venir')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mes Emails</h1>
          <p className="text-gray-400">
            Gérez vos emails personnalisés et templates modifiés
          </p>
        </div>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Nouvel Email</span>
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {emails.length} email{emails.length > 1 ? 's' : ''} au total
          </div>
        </div>

        {/* Liste des emails */}
        <div className="grid gap-4">
          {emails.map((email) => (
            <div key={email.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-white">{email.name}</h3>
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                      {email.category}
                    </span>
                    {email.isTemplate && (
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                        Template
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{email.subject}</p>
                  <p className="text-gray-400 text-xs">
                    Créé le {new Date(email.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(email)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                    title="Voir"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(email)}
                    className="p-2 text-blue-400 hover:text-white hover:bg-blue-600 rounded-md transition-colors"
                    title="Modifier"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(email.id)}
                    className="p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-md transition-colors"
                    title="Supprimer"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de visualisation */}
        {showViewModal && selectedEmail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {selectedEmail.name}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {selectedEmail.category} • Créé le {new Date(selectedEmail.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Objet
                  </label>
                  <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                    {selectedEmail.subject}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contenu
                  </label>
                  <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white whitespace-pre-wrap min-h-[300px]">
                    {selectedEmail.content}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal d'édition */}
        {showEditModal && selectedEmail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold text-white">
                    Modifier l'Email
                  </h3>
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {selectedEmail.category}
                  </span>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Colonne gauche - Email original */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <EyeIcon className="h-5 w-5 text-blue-400" />
                    <h4 className="text-lg font-medium text-white">Email Original</h4>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      OBJET ORIGINAL
                    </label>
                    <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white min-h-[40px] flex items-center">
                      {selectedEmail.subject}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CONTENU ORIGINAL
                    </label>
                    <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white min-h-[200px] whitespace-pre-wrap">
                      {selectedEmail.content}
                    </div>
                  </div>
                </div>

                {/* Colonne droite - Version modifiée */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <PencilIcon className="h-5 w-5 text-blue-400" />
                    <h4 className="text-lg font-medium text-white">Votre Version</h4>
                  </div>
                  
                  <div className="flex space-x-2 mb-4">
                    <button 
                      onClick={handleAIVariation}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-500 transition-colors flex items-center space-x-1"
                    >
                      <StarIcon className="h-3 w-3" />
                      <span>Variation IA</span>
                    </button>
                    <button 
                      onClick={handleSuggestMeeting}
                      className="px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-md hover:bg-gray-500 transition-colors flex items-center space-x-1"
                    >
                      <CalendarIcon className="h-3 w-3" />
                      <span>Proposer RDV</span>
                    </button>
                    {selectedEmail.originalTemplateId && (
                      <button 
                        onClick={handleRestoreOriginal}
                        className="px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-md hover:bg-gray-500 transition-colors flex items-center space-x-1"
                      >
                        <ArrowPathIcon className="h-3 w-3" />
                        <span>Original</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom de l'email
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Objet de l'email
                    </label>
                    <input
                      type="text"
                      value={editData.subject}
                      onChange={(e) => setEditData({...editData, subject: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contenu de l'email
                    </label>
                    <textarea
                      rows={10}
                      value={editData.content}
                      onChange={(e) => setEditData({...editData, content: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors flex items-center space-x-2"
                >
                  <span>Annuler</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors flex items-center space-x-2"
                >
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

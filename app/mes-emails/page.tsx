'use client'

import { useState } from 'react'
import { 
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'
import Link from 'next/link'

interface CustomEmail {
  id: string
  name: string
  subject: string
  content: string
  email: string
  createdAt: string
}

export default function MesEmailsPage() {
  const [emails, setEmails] = useState<CustomEmail[]>([])
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

  const handleCopy = (email: CustomEmail) => {
    const emailText = `Objet: ${email.subject}\n\n${email.content}`
    navigator.clipboard.writeText(emailText)
    toast.success('Email copié dans le presse-papiers')
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
    toast.info('Fonctionnalité de variation à venir')
  }

  const handleSuggestMeeting = () => {
    toast.info('Fonctionnalité de proposition de RDV à venir')
  }

  const handleRestoreOriginal = () => {
    toast.info('Restauration du template original à venir')
  }

  // Si aucun email, afficher l'état vide
  if (emails.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord</h1>
            <p className="text-gray-400">
              Débloquez tout le potentiel de LeadPilot
            </p>
          </div>

          {/* Section Mes Emails */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Mes e-mails personnalisés</h2>
            <p className="text-gray-400">
              Gérez vos emails créés à partir des templates de base
            </p>
          </div>

          {/* Indicateur d'emails sauvegardés */}
          <div className="mb-6 flex justify-end">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              0emailsauvegardé
            </span>
          </div>

          {/* État vide */}
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <PlusIcon className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Aucun email personnalisé</h3>
            <p className="text-gray-400 text-center mb-8 max-w-md">
              Créez vos premiers emails personnalisés en utilisant le bouton "Choisir Template" dans la section Templates.
            </p>
            <Link 
              href="/templates"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Aller aux modèles</span>
            </Link>
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
          <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord</h1>
          <p className="text-gray-400">
            Débloquez tout le potentiel de LeadPilot
          </p>
        </div>

        {/* Section Mes Emails */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Mes e-mails personnalisés</h2>
          <p className="text-gray-400">
            Gérez vos emails créés à partir des templates de base
          </p>
        </div>

        {/* Indicateur d'emails sauvegardés */}
        <div className="mb-6 flex justify-end">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            {emails.length}email{emails.length > 1 ? 's' : ''}sauvegardé{emails.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Liste des emails */}
        <div className="grid gap-4">
          {emails.map((email) => (
            <div key={email.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">{email.email}</div>
                  <div className="text-sm text-gray-400 mb-3">
                    Créé le {new Date(email.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    OBJET
                  </label>
                  <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                    {email.subject}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    OUVRIR
                  </label>
                  <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white min-h-[80px] whitespace-pre-wrap">
                    {email.content}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleCopy(email)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                  title="Copier"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                </button>
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
                    {selectedEmail.email} • Créé le {new Date(selectedEmail.createdAt).toLocaleDateString('fr-FR')}
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
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Modifier l'Email
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Modifiez le nom, l'objet et le contenu de votre email personnalisé
                  </p>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom de l'email
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    placeholder="Nom de votre email..."
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

              {/* Boutons d'action */}
              <div className="flex justify-between mt-6">
                <div className="flex space-x-2">
                  <button 
                    onClick={handleAIVariation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors flex items-center space-x-2"
                  >
                    <span>✨</span>
                    <span>Variation</span>
                  </button>
                  <button 
                    onClick={handleSuggestMeeting}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors flex items-center space-x-2"
                  >
                    <span>📅</span>
                    <span>Proposant RDV</span>
                  </button>
                  <button 
                    onClick={handleRestoreOriginal}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors flex items-center space-x-2"
                  >
                    <span>🔄</span>
                    <span>Original</span>
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

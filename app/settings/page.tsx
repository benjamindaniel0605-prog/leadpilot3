'use client'

import { useState, useEffect } from 'react'
import { 
  UserIcon,
  StarIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  ArrowDownTrayIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface UserQuotas {
  plan: string
  leadsUsed: number
  leadsLimit: number
  variationsUsed: number
  variationsLimit: number
  templatesAccessible: number
  templatesLimit: number
}

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  company: string
  isEmailConnected: boolean
}

export default function SettingsPage() {
  const [userQuotas, setUserQuotas] = useState<UserQuotas>({
    plan: 'free',
    leadsUsed: 0,
    leadsLimit: 5,
    variationsUsed: 0,
    variationsLimit: 5,
    templatesAccessible: 1,
    templatesLimit: 30
  })
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Benjamin',
    lastName: 'Daniel',
    email: 'benjamin.daniel0605@gmail.com',
    company: 'Mon Entreprise',
    isEmailConnected: false
  })
  
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false)
  
  // Formulaire de modification
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    password: '',
    company: userProfile.company
  })

  // Récupérer les données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      // Vérifier les paramètres URL pour les messages OAuth
      const urlParams = new URLSearchParams(window.location.search)
      const success = urlParams.get('success')
      const error = urlParams.get('error')
      const email = urlParams.get('email')

      if (success === 'oauth_connected' && email) {
        toast.success(`Connexion Google réussie pour ${email}`)
        setUserProfile(prev => ({ ...prev, isEmailConnected: true }))
        // Nettoyer l'URL
        window.history.replaceState({}, document.title, window.location.pathname)
      } else if (error) {
        const errorMessages: Record<string, string> = {
          'oauth_cancelled': 'Connexion Google annulée',
          'oauth_config_missing': 'Configuration OAuth manquante',
          'oauth_code_missing': 'Erreur lors de l\'autorisation Google',
          'oauth_token_exchange_failed': 'Erreur lors de l\'échange de tokens',
          'oauth_user_info_failed': 'Erreur lors de la récupération des informations utilisateur',
          'oauth_callback_failed': 'Erreur lors de la connexion Google'
        }
        toast.error(errorMessages[error] || 'Erreur lors de la connexion Google')
        // Nettoyer l'URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
      try {
        // Récupérer les quotas
        const quotasResponse = await fetch('/api/user/quotas')
        if (quotasResponse.ok) {
          const quotasData = await quotasResponse.json()
          setUserQuotas({
            plan: quotasData.plan || 'free',
            leadsUsed: quotasData.leadsUsed || 0,
            leadsLimit: quotasData.leadsLimit || 5,
            variationsUsed: quotasData.variationsUsed || 0,
            variationsLimit: quotasData.variationsLimit || 5,
            templatesAccessible: quotasData.templatesAccessible || 1,
            templatesLimit: quotasData.templatesLimit || 30
          })
        }

        // Récupérer le profil utilisateur (simulation pour l'instant)
        // TODO: Créer une API pour récupérer le profil
        setUserProfile({
          firstName: 'Benjamin',
          lastName: 'Daniel',
          email: 'benjamin.daniel0605@gmail.com',
          company: 'Mon Entreprise',
          isEmailConnected: false
        })
        
        setFormData({
          firstName: 'Benjamin',
          lastName: 'Daniel',
          email: 'benjamin.daniel0605@gmail.com',
          password: '',
          company: 'Mon Entreprise'
        })
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
        toast.error('Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // TODO: Créer une API pour sauvegarder le profil
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulation
      
      setUserProfile({
        ...userProfile,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company
      })
      
      toast.success('Profil sauvegardé avec succès')
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

  const handleConnectGoogle = async () => {
    setIsConnectingGoogle(true)
    try {
      // Rediriger vers l'OAuth Google
      const authUrl = `/api/oauth/google/initiate`
      window.location.href = authUrl
    } catch (error) {
      console.error('Erreur lors de la connexion Google:', error)
      toast.error('Erreur lors de la connexion Google')
      setIsConnectingGoogle(false)
    }
  }

  const handleExportData = async () => {
    try {
      toast.info('Fonctionnalité d\'export en cours de développement')
      // TODO: Implémenter l'export des données
    } catch (error) {
      console.error('Erreur lors de l\'export:', error)
      toast.error('Erreur lors de l\'export')
    }
  }

  const handleCustomerSupport = () => {
    window.open('mailto:support@leadpilot.com', '_blank')
  }

  const handleDeleteAccount = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      toast.info('Fonctionnalité de suppression en cours de développement')
      // TODO: Implémenter la suppression du compte
    }
  }

  const handleLogout = () => {
    // TODO: Implémenter la déconnexion
    toast.info('Déconnexion...')
    window.location.href = '/login'
  }

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'free': return 'Free'
      case 'starter': return 'Starter'
      case 'pro': return 'Pro'
      case 'growth': return 'Growth'
      default: return 'Free'
    }
  }

  const getPlanSubtitle = (plan: string) => {
    switch (plan) {
      case 'free': return 'Plan gratuit'
      case 'starter': return 'Plan de démarrage'
      case 'pro': return 'Plan professionnel'
      case 'growth': return 'Plan croissance'
      default: return 'Plan gratuit'
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
          <p className="text-gray-400">
            Configurez votre compte et intégrations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations du Compte */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <UserIcon className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-white">Informations du Compte</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prénom</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Entreprise</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </div>

            {/* Connexion Email */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <EnvelopeIcon className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-white">Connexion Email</h2>
              </div>

              <p className="text-gray-400 mb-6">
                Connectez votre compte Google ou Outlook pour envoyer vos campagnes email directement depuis votre boîte mail.
              </p>

              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-medium text-white">Connexion Email</h3>
                </div>

                <p className="text-gray-400 mb-6">
                  Connectez votre compte Gmail pour envoyer des campagnes email directement depuis LeadPilot. Vos identifiants sont sécurisés et utilisés uniquement pour l'envoi d'emails.
                </p>

                <div className="bg-gray-600 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-red-500 font-bold text-lg">G</span>
                    </div>
                    <h4 className="text-white font-medium">Gmail</h4>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    Connectez votre compte Gmail pour envoyer des emails
                  </p>

                  {userProfile.isEmailConnected ? (
                    <div className="w-full bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span>Connecté avec Google</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleConnectGoogle}
                      disabled={isConnectingGoogle}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">G</span>
                      </div>
                      <span>{isConnectingGoogle ? 'Connexion...' : 'Connecter avec Google'}</span>
                    </button>
                  )}
                </div>

                <div className="mt-6">
                  <h4 className="text-white font-medium mb-3">Comment ça fonctionne ?</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Cliquez sur "Connecter avec Google" pour authoriser LeadPilot</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Vos emails seront envoyés depuis votre compte Gmail</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Vous pouvez déconnecter à tout moment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Aucun email n'est stocké sur nos serveurs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Abonnement Actuel */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <StarIcon className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-semibold text-white">Abonnement Actuel</h2>
              </div>

              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-white mb-1">
                  {getPlanDisplayName(userQuotas.plan)}
                </div>
                <div className="text-gray-400 text-sm">
                  {getPlanSubtitle(userQuotas.plan)}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Leads utilisés</span>
                    <span className="text-white">{userQuotas.leadsUsed}/{userQuotas.leadsLimit}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(userQuotas.leadsUsed / userQuotas.leadsLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Templates accessibles</span>
                    <span className="text-white">{userQuotas.templatesAccessible}/{userQuotas.templatesLimit}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(userQuotas.templatesAccessible / userQuotas.templatesLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Variations utilisées</span>
                    <span className="text-white">{userQuotas.variationsUsed}/{userQuotas.variationsLimit}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(userQuotas.variationsUsed / userQuotas.variationsLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.location.href = '/pricing'}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
              >
                <StarIcon className="w-5 h-5" />
                <span>Choisir un Plan</span>
              </button>
            </div>

            {/* Actions */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleExportData}
                  className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Exporter mes données</span>
                </button>

                <button
                  onClick={handleCustomerSupport}
                  className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <QuestionMarkCircleIcon className="w-5 h-5" />
                  <span>Support client</span>
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center space-x-3 p-3 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                  <span>Supprimer mon compte</span>
                </button>
              </div>
            </div>

            {/* Profil */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Profil</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium">{userProfile.firstName} {userProfile.lastName}</div>
                  <div className="text-gray-400 text-sm">{userProfile.email}</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

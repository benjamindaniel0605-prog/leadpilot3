'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon,
  CogIcon,
  CalendarIcon,
  ClockIcon,
  TrashIcon,
  LockClosedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface Appointment {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  type: 'visio' | 'telephone' | 'presentiel'
  contactName: string
  contactEmail: string
  status: 'scheduled' | 'completed' | 'cancelled'
  createdAt: string
}

interface TimeSlot {
  day: string
  enabled: boolean
  startTime: string
  endTime: string
}

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [userPlan, setUserPlan] = useState<string>('free')
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Configuration des créneaux
  const [defaultDuration, setDefaultDuration] = useState('30 min')
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { day: 'Lundi', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Mardi', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Mercredi', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Jeudi', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Vendredi', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Samedi', enabled: false, startTime: '09:00', endTime: '17:00' },
    { day: 'Dimanche', enabled: false, startTime: '09:00', endTime: '17:00' }
  ])

  // Formulaire nouveau RDV
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '30 min',
    type: 'visio' as const,
    contactName: '',
    contactEmail: ''
  })

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

  const isStarterOrHigher = userPlan === 'starter' || userPlan === 'pro' || userPlan === 'growth'
  const currentMonthName = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  const appointmentsThisMonth = appointments.filter(apt => {
    const aptDate = new Date(apt.date)
    return aptDate.getMonth() === currentMonth.getMonth() && 
           aptDate.getFullYear() === currentMonth.getFullYear()
  })

  const handleCreateAppointment = () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      title: newAppointment.title,
      description: newAppointment.description,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: newAppointment.duration,
      type: newAppointment.type,
      contactName: newAppointment.contactName,
      contactEmail: newAppointment.contactEmail,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }

    setAppointments([...appointments, appointment])
    setShowNewAppointmentModal(false)
    setNewAppointment({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '30 min',
      type: 'visio',
      contactName: '',
      contactEmail: ''
    })
    
    toast.success('RDV créé avec succès !')
  }

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id))
    toast.success('RDV supprimé')
  }

  const handleSaveConfiguration = () => {
    setShowConfigModal(false)
    toast.success('Configuration sauvegardée')
  }

  const getBookingLink = () => {
    if (!isStarterOrHigher) return null
    return `https://get-leadpilot.vercel.app/booking/user-id`
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
          <h1 className="text-3xl font-bold text-white mb-2">Calendrier de Booking</h1>
          <p className="text-gray-400">
            Gérez vos créneaux et RDV prospects
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end mb-6 space-x-3">
          <button
            onClick={() => setShowNewAppointmentModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nouveau RDV</span>
          </button>
          <button
            onClick={() => setShowConfigModal(true)}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
          >
            <CogIcon className="w-5 h-5" />
            <span>Configurer</span>
          </button>
        </div>

        {/* Cartes d'information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* RDV ce mois */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">RDV en {currentMonthName}</h3>
              <CalendarIcon className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {appointmentsThisMonth.length}
            </div>
            <p className="text-gray-400 text-sm">
              {appointmentsThisMonth.length === 0 ? 'Aucun RDV ce mois' : 'RDV programmés'}
            </p>
          </div>

          {/* Taux de conversion */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Taux de conversion</h3>
              <LockClosedIcon className="w-8 h-8 text-gray-500" />
            </div>
            <div className="text-3xl font-bold text-gray-400 mb-2">
              Plan Starter+
            </div>
            <p className="text-gray-400 text-sm">
              Disponible avec les plans payants
            </p>
          </div>

          {/* Lien de booking */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Lien de booking</h3>
              {isStarterOrHigher ? (
                <CheckIcon className="w-8 h-8 text-green-500" />
              ) : (
                <LockClosedIcon className="w-8 h-8 text-gray-500" />
              )}
            </div>
            {isStarterOrHigher ? (
              <div className="space-y-3">
                <div className="bg-gray-700 rounded p-3 text-sm font-mono text-green-400 break-all">
                  {getBookingLink()}
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors text-sm">
                  Copier le lien
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">
                  Les liens de prise de rendez-vous sont disponibles à partir du plan Starter.
                </p>
                <button 
                  onClick={() => window.location.href = '/pricing'}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors text-sm"
                >
                  Upgrader vers Starter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Configuration et RDV */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Configuration</h2>
            
            {/* Durée des RDV */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Durée des RDV configurée
              </label>
              <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                {defaultDuration} par défaut
              </div>
            </div>

            {/* Créneaux disponibles */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Créneaux disponibles
              </label>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <div key={slot.day} className="flex items-center space-x-3">
                    {slot.enabled ? (
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <XMarkIcon className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-white">
                      {slot.day} {slot.enabled ? `${slot.startTime}-${slot.endTime}` : 'Indisponible'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RDV à venir */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">RDV à venir</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <span className="text-white font-medium">{currentMonthName}</span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {appointmentsThisMonth.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">
                  Aucun RDV programmé pour le moment.
                </p>
                <p className="text-gray-500 text-sm">
                  Partagez votre lien de booking pour recevoir des demandes de RDV.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointmentsThisMonth.map((appointment) => (
                  <div key={appointment.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.contactName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{appointment.title}</h3>
                          <p className="text-gray-400 text-sm">{appointment.contactName}</p>
                          <p className="text-gray-400 text-sm">
                            {new Date(appointment.date).toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })} • {appointment.time} - {appointment.duration}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400 text-sm capitalize">{appointment.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          Programmé
                        </span>
                        <button
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-gray-600 rounded transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Nouveau RDV */}
        {showNewAppointmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Nouveau RDV</h2>
                <button
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
                  <input
                    type="text"
                    value={newAppointment.title}
                    onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                    placeholder="Ex: Entretien commercial"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newAppointment.description}
                    onChange={(e) => setNewAppointment({...newAppointment, description: e.target.value})}
                    placeholder="Détails du rendez-vous..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Heure</label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Durée</label>
                  <select
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({...newAppointment, duration: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15 min">15 min</option>
                    <option value="30 min">30 min</option>
                    <option value="45 min">45 min</option>
                    <option value="1h">1h</option>
                    <option value="1h30">1h30</option>
                    <option value="2h">2h</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value as any})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="visio">Visio</option>
                    <option value="telephone">Téléphone</option>
                    <option value="presentiel">Présentiel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prénom</label>
                  <input
                    type="text"
                    value={newAppointment.contactName}
                    onChange={(e) => setNewAppointment({...newAppointment, contactName: e.target.value})}
                    placeholder="Prénom du contact"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={newAppointment.contactEmail}
                    onChange={(e) => setNewAppointment({...newAppointment, contactEmail: e.target.value})}
                    placeholder="Email du contact"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowNewAppointmentModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateAppointment}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Créer le RDV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Configuration */}
        {showConfigModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Configuration du calendrier</h2>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Durée par défaut */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Durée par défaut</label>
                  <select
                    value={defaultDuration}
                    onChange={(e) => setDefaultDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15 min">15 min</option>
                    <option value="30 min">30 min</option>
                    <option value="45 min">45 min</option>
                    <option value="1h">1h</option>
                    <option value="1h30">1h30</option>
                    <option value="2h">2h</option>
                  </select>
                </div>

                {/* Horaires de disponibilité */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Horaires de disponibilité</label>
                  <div className="space-y-3">
                    {timeSlots.map((slot, index) => (
                      <div key={slot.day} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={slot.enabled}
                          onChange={(e) => {
                            const newSlots = [...timeSlots]
                            newSlots[index].enabled = e.target.checked
                            setTimeSlots(newSlots)
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                        />
                        <span className="text-white min-w-[60px]">{slot.day}</span>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => {
                            const newSlots = [...timeSlots]
                            newSlots[index].startTime = e.target.value
                            setTimeSlots(newSlots)
                          }}
                          disabled={!slot.enabled}
                          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                        <span className="text-gray-400">à</span>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => {
                            const newSlots = [...timeSlots]
                            newSlots[index].endTime = e.target.value
                            setTimeSlots(newSlots)
                          }}
                          disabled={!slot.enabled}
                          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveConfiguration}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Sauvegarder
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

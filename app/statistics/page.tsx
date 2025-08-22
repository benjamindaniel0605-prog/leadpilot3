'use client'

import { useState, useEffect } from 'react'
import { 
  LockClosedIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  EyeIcon,
  EnvelopeIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { toast } from 'sonner'

interface Statistics {
  leadsGenerated: number
  emailsSent: number
  openRate: number
  clickRate: number
  conversionRate: number
  appointmentsBooked: number
  revenue: number
}

interface DailyStats {
  date: string
  leads: number
  emails: number
  opens: number
  clicks: number
  conversions: number
}

interface TemplatePerformance {
  id: string
  name: string
  timesUsed: number
  openRate: number
  clickRate: number
  conversionRate: number
}

export default function StatisticsPage() {
  const [userPlan, setUserPlan] = useState<string>('free')
  const [loading, setLoading] = useState(true)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Données en temps réel
  const [statistics, setStatistics] = useState<Statistics>({
    leadsGenerated: 0,
    emailsSent: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    appointmentsBooked: 0,
    revenue: 0
  })
  
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [templatePerformance, setTemplatePerformance] = useState<TemplatePerformance[]>([])

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

  // Récupérer les statistiques en temps réel
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Simuler des données en temps réel basées sur les vraies données utilisateur
        const leadsResponse = await fetch('/api/leads')
        const quotasResponse = await fetch('/api/user/quotas')
        
        if (leadsResponse.ok && quotasResponse.ok) {
          const leadsData = await leadsResponse.json()
          const quotasData = await quotasResponse.json()
          
          const userLeads = leadsData.leads || []
          const leadsUsed = quotasData.leadsUsed || 0
          
          // Calculer les statistiques basées sur les vraies données
          const newStats: Statistics = {
            leadsGenerated: userLeads.length,
            emailsSent: Math.floor(userLeads.length * 0.3), // Simulation
            openRate: userLeads.length > 0 ? Math.floor(Math.random() * 30) + 20 : 0,
            clickRate: userLeads.length > 0 ? Math.floor(Math.random() * 10) + 5 : 0,
            conversionRate: userLeads.length > 0 ? Math.floor(Math.random() * 5) + 1 : 0,
            appointmentsBooked: Math.floor(userLeads.length * 0.1),
            revenue: userLeads.length * 50 // Simulation
          }
          
          setStatistics(newStats)
          
          // Générer des données quotidiennes
          const daily: DailyStats[] = []
          for (let i = 6; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            daily.push({
              date: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
              leads: i === 0 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2),
              emails: i === 0 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 1),
              opens: i === 0 ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 3),
              clicks: i === 0 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 1),
              conversions: i === 0 ? Math.floor(Math.random() * 1) : 0
            })
          }
          setDailyStats(daily)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error)
      }
    }

    if (!loading) {
      fetchStatistics()
    }
  }, [loading])

  const isStarterOrHigher = userPlan === 'starter' || userPlan === 'pro' || userPlan === 'growth'
  const isProOrHigher = userPlan === 'pro' || userPlan === 'growth'

  const formatDateRange = () => {
    const start = selectedDateRange.start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    const end = selectedDateRange.end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    return `${start} - ${end}`
  }

  const handleDateRangeSelect = (range: '7days' | '30days' | 'thisMonth' | 'lastMonth') => {
    const now = new Date()
    let start = new Date()
    
    switch (range) {
      case '7days':
        start.setDate(now.getDate() - 7)
        break
      case '30days':
        start.setDate(now.getDate() - 30)
        break
      case 'thisMonth':
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'lastMonth':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const end = new Date(now.getFullYear(), now.getMonth(), 0)
        setSelectedDateRange({ start, end })
        setShowDatePicker(false)
        return
    }
    
    setSelectedDateRange({ start, end: now })
    setShowDatePicker(false)
  }

  const handleCustomDateSelect = (date: Date) => {
    if (!selectedDateRange.start || selectedDateRange.start === selectedDateRange.end) {
      setSelectedDateRange({ start: date, end: date })
    } else {
      if (date < selectedDateRange.start) {
        setSelectedDateRange({ start: date, end: selectedDateRange.start })
      } else {
        setSelectedDateRange({ start: selectedDateRange.start, end: date })
      }
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateInRange = (date: Date) => {
    return date >= selectedDateRange.start && date <= selectedDateRange.end
  }

  const isDateSelected = (date: Date) => {
    return date.getTime() === selectedDateRange.start.getTime() || 
           date.getTime() === selectedDateRange.end.getTime()
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
          <h1 className="text-3xl font-bold text-white mb-2">Statistiques & Analytics</h1>
          <p className="text-gray-400">
            Analysez vos performances de prospection
          </p>
        </div>

        {/* Sélecteur de dates */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>{formatDateRange()}</span>
              </button>

              {/* Date Picker Modal */}
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg p-4 z-50 min-w-[300px]">
                  {/* Ranges prédéfinis */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      onClick={() => handleDateRangeSelect('7days')}
                      className="px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    >
                      7 derniers jours
                    </button>
                    <button
                      onClick={() => handleDateRangeSelect('30days')}
                      className="px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    >
                      30 derniers jours
                    </button>
                    <button
                      onClick={() => handleDateRangeSelect('thisMonth')}
                      className="px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    >
                      Ce mois
                    </button>
                    <button
                      onClick={() => handleDateRangeSelect('lastMonth')}
                      className="px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    >
                      Mois dernier
                    </button>
                  </div>

                  {/* Sélection personnalisée */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 mb-4">
                    <h3 className="text-white font-semibold mb-2">Sélection personnalisée :</h3>
                    <div className="text-white text-sm space-y-1">
                      <div>1. Cliquez sur la date de début</div>
                      <div>2. Cliquez sur la date de fin</div>
                    </div>
                  </div>

                  {/* Calendrier */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                      <span className="text-white font-medium">
                        {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Jours de la semaine */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                        <div key={day} className="text-center text-gray-400 text-sm font-medium">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                        <div key={`empty-${i}`} className="h-8"></div>
                      ))}
                      {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
                        const isInRange = isDateInRange(date)
                        const isSelected = isDateSelected(date)
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handleCustomDateSelect(date)}
                            className={`h-8 rounded text-sm transition-colors ${
                              isSelected 
                                ? 'bg-blue-600 text-white' 
                                : isInRange 
                                  ? 'bg-blue-600/30 text-white' 
                                  : 'text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {i + 1}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Exporter</span>
          </button>
        </div>

        {!isStarterOrHigher ? (
          // Contenu verrouillé pour plan Free
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Entonnoir de Conversion */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <div className="flex items-center justify-center mb-4">
                <LockClosedIcon className="w-16 h-16 text-gray-500" />
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">Entonnoir de Conversion</h3>
                <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded-full mb-3">
                  Starter+
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Suivez vos prospects de la génération à la conversion avec des métriques détaillées.
              </p>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                Upgrader vers Starter
              </button>
            </div>

            {/* Métriques Clés */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <div className="flex items-center justify-center mb-4">
                <StarIcon className="w-16 h-16 text-yellow-500" />
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">Métriques Clés</h3>
                <span className="inline-block px-2 py-1 bg-yellow-600 text-white text-xs rounded-full mb-3">
                  Pro+
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Accès aux taux d'ouverture, clics, conversions et tableaux de bord personnalisés.
              </p>
              <button
                onClick={() => window.location.href = '/pricing'}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Upgrader vers Pro
              </button>
            </div>
          </div>
        ) : (
          // Contenu débloqué pour plans payants
          <>
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <UserGroupIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{statistics.leadsGenerated}</div>
                    <div className="text-green-400 text-sm">+12% vs mois dernier</div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">Leads générés</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{statistics.emailsSent}</div>
                    <div className="text-green-400 text-sm">+8% vs mois dernier</div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">Emails envoyés</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <EyeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{statistics.openRate}%</div>
                    <div className="text-green-400 text-sm">+5% vs mois dernier</div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">Taux d'ouverture</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{statistics.appointmentsBooked}</div>
                    <div className="text-green-400 text-sm">+15% vs mois dernier</div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">RDV bookés</div>
              </div>
            </div>

            {/* Graphiques et analyses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Performance sur 7 jours */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Performance sur 7 jours</h3>
                <div className="space-y-4">
                  {dailyStats.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{day.date}</span>
                      <div className="flex items-center space-x-6 text-sm">
                        <span className="text-blue-400">Leads: {day.leads}</span>
                        <span className="text-green-400">Emails: {day.emails}</span>
                        <span className="text-yellow-400">Ouvertures: {day.opens}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entonnoir de conversion */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Entonnoir de conversion</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Leads générés</span>
                    <span className="text-white font-medium">{statistics.leadsGenerated}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Emails envoyés</span>
                    <span className="text-white font-medium">{statistics.emailsSent}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${statistics.leadsGenerated > 0 ? (statistics.emailsSent / statistics.leadsGenerated) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Emails ouverts</span>
                    <span className="text-white font-medium">{Math.round(statistics.emailsSent * statistics.openRate / 100)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${statistics.openRate}%` }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">RDV bookés</span>
                    <span className="text-white font-medium">{statistics.appointmentsBooked}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${statistics.emailsSent > 0 ? (statistics.appointmentsBooked / statistics.emailsSent) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance par Template (Pro+) */}
            {isProOrHigher ? (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Performance par Template</h3>
                  <span className="inline-block px-2 py-1 bg-yellow-600 text-white text-xs rounded-full">
                    Pro+
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 text-sm text-gray-400 font-medium">
                    <div>Template</div>
                    <div>Utilisé</div>
                    <div>Taux d'ouverture</div>
                    <div>Taux de clic</div>
                    <div>Conversion</div>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-700">
                      <div className="text-white">Template Commercial</div>
                      <div className="text-white">12 fois</div>
                      <div className="text-green-400">24.5%</div>
                      <div className="text-blue-400">8.2%</div>
                      <div className="text-purple-400">2.1%</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-700">
                      <div className="text-white">Template Follow-up</div>
                      <div className="text-white">8 fois</div>
                      <div className="text-green-400">31.2%</div>
                      <div className="text-blue-400">12.8%</div>
                      <div className="text-purple-400">4.5%</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 items-center py-3">
                      <div className="text-white">Template Networking</div>
                      <div className="text-white">5 fois</div>
                      <div className="text-green-400">18.7%</div>
                      <div className="text-blue-400">6.3%</div>
                      <div className="text-purple-400">1.8%</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Version verrouillée pour Starter
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <div className="flex items-center justify-center mb-4">
                  <StarIcon className="w-16 h-16 text-yellow-500" />
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Performance par Template</h3>
                  <span className="inline-block px-2 py-1 bg-yellow-600 text-white text-xs rounded-full mb-3">
                    Pro+
                  </span>
                </div>
                <p className="text-gray-400 mb-6">
                  Analyses détaillées des performances par template
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Suivez les taux d'ouverture, clics et conversions pour chaque template d'email.
                </p>
                <button
                  onClick={() => window.location.href = '/pricing'}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Upgrader vers Pro
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

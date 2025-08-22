'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  EnvelopeIcon, 
  EyeIcon, 
  CalendarIcon,
  PaperAirplaneIcon,
  LinkIcon,
  CogIcon,
  BellIcon,
  StarIcon,
  PlusIcon,
  DocumentTextIcon,
  ChartPieIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  plan: 'free' | 'starter' | 'pro' | 'growth'
  leadsUsed: number
  aiVariationsUsed: number
}

interface DashboardStats {
  leadsGenerated: number
  emailsSent: number
  openRate: number
  appointmentsBooked: number
  leadsVariation: number
}

interface RecentActivity {
  id: string
  type: 'lead_added' | 'email_sent' | 'appointment_booked'
  message: string
  company: string
  score?: number
  timestamp: Date
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    leadsGenerated: 0,
    emailsSent: 0,
    openRate: 0,
    appointmentsBooked: 0,
    leadsVariation: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  // Récupérer les vraies données utilisateur et stats
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Récupérer les quotas utilisateur
        const quotasResponse = await fetch('/api/user/quotas')
        if (quotasResponse.ok) {
          const quotasData = await quotasResponse.json()
          
          // Mettre à jour les stats avec les vraies données
          setStats({
            leadsGenerated: quotasData.usage.leads,
            emailsSent: 0, // À implémenter plus tard
            openRate: 0, // À implémenter plus tard
            appointmentsBooked: 0, // À implémenter plus tard
            leadsVariation: quotasData.variations?.leads || 0
          })
          
          // Mettre à jour l'utilisateur avec les vraies données
          setUser({
            id: '1', // À récupérer depuis l'auth
            email: 'benjamin.daniel@example.com', // À récupérer depuis l'auth
            firstName: 'Benjamin', // À récupérer depuis l'auth
            lastName: 'Daniel', // À récupérer depuis l'auth
            plan: quotasData.plan || 'free',
            leadsUsed: quotasData.usage.leads,
            aiVariationsUsed: quotasData.usage.variations
          })
        }
        
        // Récupérer l'activité récente depuis l'API leads
        const leadsResponse = await fetch('/api/leads')
        if (leadsResponse.ok) {
          const leadsData = await leadsResponse.json()
          
          // Créer l'activité récente basée sur les vrais leads
          const recentLeads = leadsData.leads?.slice(0, 2) || []
          const activity: RecentActivity[] = recentLeads.map((lead: any, index: number) => ({
            id: lead.id || `lead-${index}`,
            type: 'lead_added',
            message: `Lead ajouté: ${lead.firstName} ${lead.lastName}`,
            company: lead.company || 'N/A',
            score: lead.aiScore || 0,
            timestamp: new Date(lead.createdAt || Date.now())
          }))
          
          setRecentActivity(activity)
        }
        
      } catch (error) {
        console.error('Erreur lors du chargement du dashboard:', error)
        
        // Fallback avec des données par défaut
        setUser({
          id: '1',
          email: 'benjamin.daniel@example.com',
          firstName: 'Benjamin',
          lastName: 'Daniel',
          plan: 'free',
          leadsUsed: 0,
          aiVariationsUsed: 0
        })
        
        setStats({
          leadsGenerated: 0,
          emailsSent: 0,
          openRate: 0,
          appointmentsBooked: 0,
          leadsVariation: 0
        })
        
        setRecentActivity([])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
    
    // Rafraîchir les données toutes les 30 secondes
    const interval = setInterval(fetchDashboardData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getPlanLimits = (plan: string) => {
    switch (plan) {
      case 'free':
        return { leads: 5, variations: 5 }
      case 'starter':
        return { leads: 100, variations: 100 }
      case 'pro':
        return { leads: 400, variations: 300 }
      case 'growth':
        return { leads: 1500, variations: 1000 }
      default:
        return { leads: 5, variations: 5 }
    }
  }

  const getNextPlanInfo = (currentPlan: string) => {
    switch (currentPlan) {
      case 'free':
        return { name: 'Starter', price: '49€', buttonText: 'Passer Starter', hasTrial: false }
      case 'starter':
        return { name: 'Pro', price: '99€', buttonText: 'Passer Pro', hasTrial: true }
      case 'pro':
        return { name: 'Growth', price: '299€', buttonText: 'Passer Growth', hasTrial: false }
      case 'growth':
        return null
      default:
        return { name: 'Starter', price: '49€', buttonText: 'Passer Starter', hasTrial: false }
    }
  }

  const getPlanProgress = (plan: string, used: number) => {
    const limits = getPlanLimits(plan)
    return {
      used,
      total: limits.leads,
      percentage: Math.min((used / limits.leads) * 100, 100)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const nextPlan = user ? getNextPlanInfo(user.plan) : null
  const planProgress = user ? getPlanProgress(user.plan, user.leadsUsed) : { used: 0, total: 5, percentage: 0 }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold">LeadPilot</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-600 text-white">
              <ChartBarIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/leads" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <UserGroupIcon className="w-5 h-5" />
              <span>Leads</span>
            </Link>
            <Link href="/templates" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <EnvelopeIcon className="w-5 h-5" />
              <span>Templates</span>
            </Link>
            <Link href="/mes-emails" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <EnvelopeIcon className="w-5 h-5" />
              <span>Mes Emails</span>
            </Link>
            <Link href="/campaigns" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <PaperAirplaneIcon className="w-5 h-5" />
              <span>Campagnes</span>
            </Link>
            <Link href="/sequences" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <LinkIcon className="w-5 h-5" />
              <span>Séquences</span>
            </Link>
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400">
              <EyeIcon className="w-5 h-5" />
              <span>Service de Closing</span>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Bientôt</span>
            </div>
            <Link href="/calendar" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <CalendarIcon className="w-5 h-5" />
              <span>Calendrier</span>
            </Link>
            <Link href="/statistics" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <ChartBarIcon className="w-5 h-5" />
              <span>Statistiques</span>
            </Link>
            <Link href="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <CogIcon className="w-5 h-5" />
              <span>Paramètres</span>
            </Link>
          </div>
        </nav>

        {/* Plan Progress */}
        <div className="mt-8 px-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Plan {user?.plan === 'free' ? 'Free' : user?.plan === 'starter' ? 'Starter' : user?.plan === 'pro' ? 'Pro' : 'Growth'}</span>
            </div>
            
            {/* Leads Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Leads</span>
                <span className="text-xs text-gray-400">{user?.leadsUsed || 0}/{user?.plan === 'free' ? 5 : user?.plan === 'starter' ? 100 : user?.plan === 'pro' ? 400 : 1500}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, ((user?.leadsUsed || 0) / (user?.plan === 'free' ? 5 : user?.plan === 'starter' ? 100 : user?.plan === 'pro' ? 400 : 1500)) * 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400">
                {user?.leadsUsed || 0} leads utilisés ce mois
              </div>
            </div>
            
            {/* Variations IA Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Variations IA</span>
                <span className="text-xs text-gray-400">{user?.aiVariationsUsed || 0}/{user?.plan === 'free' ? 5 : user?.plan === 'starter' ? 100 : user?.plan === 'pro' ? 300 : 1000}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-1">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, ((user?.aiVariationsUsed || 0) / (user?.plan === 'free' ? 5 : user?.plan === 'starter' ? 100 : user?.plan === 'pro' ? 300 : 1000)) * 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400">
                {user?.aiVariationsUsed || 0} variations utilisées ce mois
              </div>
            </div>
            
            {nextPlan && (
              <Link 
                href="/pricing"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <StarIcon className="w-4 h-4" />
                <span>Upgrade</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Débloquez tout le potentiel de LeadPilot</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">{user?.firstName} {user?.lastName}</div>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Premium Feature Promotion */}
          {nextPlan && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <StarIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Débloquez tout le potentiel de LeadPilot
                    </h2>
                    <p className="text-gray-400 mb-3">
                      Séquences automatisées, plus de leads, templates premium et bien plus
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-300">
                        {nextPlan.hasTrial ? `Essai gratuit 14 jours sans engagement (Plan ${nextPlan.name})` : `Plan ${nextPlan.name}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm mb-1">À partir de</div>
                  <div className="text-3xl font-bold text-white mb-3">{nextPlan.price}/mois</div>
                  <Link 
                    href="/pricing"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{nextPlan.buttonText} →</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stats.leadsGenerated}</div>
                  <div className="flex items-center space-x-1 text-sm">
                    {stats.leadsVariation > 0 ? (
                      <div className="text-green-400 flex items-center space-x-1">
                        <ArrowUpIcon className="w-4 h-4" />
                        <span>+{stats.leadsVariation}% vs mois dernier</span>
                      </div>
                    ) : stats.leadsVariation < 0 ? (
                      <div className="text-red-400 flex items-center space-x-1">
                        <ArrowDownIcon className="w-4 h-4" />
                        <span>{stats.leadsVariation}% vs mois dernier</span>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <span>0% vs mois dernier</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">Leads Générés</div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stats.emailsSent}</div>
                  <div className="text-gray-400 text-sm">0% vs mois dernier</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">Emails Envoyés</div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <EyeIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stats.openRate}%</div>
                  <div className="text-gray-400 text-sm">0% vs mois dernier</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">Taux d'Ouverture</div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stats.appointmentsBooked}</div>
                  <div className="text-gray-400 text-sm">0% vs mois dernier</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">RDV Bookés</div>
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Activité Récente</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <PlusIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{activity.message}</div>
                      <div className="text-gray-400 text-xs">
                        {activity.company} - Score: {activity.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Actions Rapides</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/leads/new"
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 flex flex-col items-center space-y-2 transition-colors group"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserGroupIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">Nouveau Lead</span>
                </Link>

                <Link 
                  href="/campaigns/new"
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 flex flex-col items-center space-y-2 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PaperAirplaneIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">Nouvelle Campagne</span>
                </Link>

                <Link 
                  href="/templates"
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 flex flex-col items-center space-y-2 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">Templates</span>
                </Link>

                <Link 
                  href="/statistics"
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 flex flex-col items-center space-y-2 transition-colors group"
                >
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChartPieIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">Analytics</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



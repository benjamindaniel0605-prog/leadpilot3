'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, EyeIcon, EnvelopeIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function StatisticsPage() {
  const stats = [
    {
      name: 'Leads générés',
      value: '3',
      change: '+60%',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Emails envoyés',
      value: '0',
      change: '0%',
      changeType: 'neutral',
      icon: EnvelopeIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Taux d\'ouverture',
      value: '0%',
      change: '0%',
      changeType: 'neutral',
      icon: EyeIcon,
      color: 'bg-yellow-500'
    },
    {
      name: 'RDV bookés',
      value: '0',
      change: '0%',
      changeType: 'neutral',
      icon: CalendarIcon,
      color: 'bg-purple-500'
    }
  ]

  const recentActivity = [
    { date: 'Aujourd\'hui', leads: 1, emails: 0, opens: 0 },
    { date: 'Hier', leads: 1, emails: 0, opens: 0 },
    { date: 'Il y a 2 jours', leads: 1, emails: 0, opens: 0 },
    { date: 'Il y a 3 jours', leads: 0, emails: 0, opens: 0 },
    { date: 'Il y a 4 jours', leads: 0, emails: 0, opens: 0 }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link 
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Retour au Dashboard</span>
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Statistiques</h1>
          <p className="text-gray-400 mt-2">Analysez vos performances et suivez vos objectifs</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.changeType === 'increase' ? 'text-green-400' :
                    stat.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {stat.changeType === 'increase' && <ArrowUpIcon className="w-4 h-4" />}
                    {stat.changeType === 'decrease' && <ArrowDownIcon className="w-4 h-4" />}
                    <span>{stat.change} vs mois dernier</span>
                  </div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">{stat.name}</div>
            </div>
          ))}
        </div>
        
        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Performance sur 7 jours</h3>
            <div className="space-y-4">
              {recentActivity.map((day, index) => (
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
          
          {/* Conversion Funnel */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Entonnoir de conversion</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Leads générés</span>
                <span className="text-white font-medium">3</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Emails envoyés</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Emails ouverts</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">RDV bookés</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Insights */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Insights et recommandations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <p className="text-white text-sm">
                  <strong>Bon début !</strong> Vous avez généré 3 leads ce mois-ci. Pour améliorer vos performances, 
                  commencez à envoyer des emails à vos leads existants.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
              <div>
                <p className="text-white text-sm">
                  <strong>Conseil :</strong> Utilisez des templates d'emails pour gagner du temps et 
                  maintenir une communication cohérente avec vos prospects.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">🚀</span>
              </div>
              <div>
                <p className="text-white text-sm">
                  <strong>Prochaine étape :</strong> Créez votre première campagne email pour 
                  commencer à convertir vos leads en clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

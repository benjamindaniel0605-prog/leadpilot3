'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const handlePlanSelection = async (plan: string) => {
    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          isYearly,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Erreur lors de la création du paiement')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création du paiement')
    }
  }

  const plans = {
    starter: {
      monthly: 49,
      yearly: 490,
      features: [
        '100 leads par mois',
        '5 templates email',
        '100 variations par mois',
        'Lien de booking personnalisé',
        'Connexion Gmail OAuth',
        'Support email',
        'Statistiques de conversion',
        'Résiliable à tout moment'
      ]
    },
    pro: {
      monthly: 99,
      yearly: 990,
      features: [
        'Essai gratuit 14 jours sans engagement',
        'Tout Starter +',
        '400 leads par mois',
        '15 templates email',
        '300 variations par mois',
        'Séquences automatisées (3 étapes)',
        'Analyse détaillée des campagnes',
        'Support prioritaire'
      ]
    },
    growth: {
      monthly: 299,
      yearly: 2990,
      features: [
        'Tout Pro +',
        '1500 leads par mois',
        '30 templates email premium',
        '1000 variations par mois',
        'Séquences automatisées (5 étapes)',
        'Analyse avancée des performances',
        'Support 24/7'
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">LeadPilot</span>
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Connexion
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Passez au niveau supérieur avec LeadPilot
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Débloquez toute la puissance de l'automatisation de leads et des séquences intelligentes
          </p>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  !isYearly
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-md font-medium transition-all flex items-center ${
                  isYearly
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Annuel
                {isYearly && (
                  <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    2 mois offerts
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {isYearly ? plans.starter.yearly : plans.starter.monthly}€
                </span>
                <span className="text-gray-300 ml-2">
                  {isYearly ? '/an' : '/mois'}
                </span>
                {isYearly && (
                  <div className="text-sm text-gray-400 mt-1">
                    Soit {plans.starter.monthly}€/mois
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plans.starter.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelection('starter')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Choisir Starter
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-800/50 rounded-xl p-8 border-2 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Populaire
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {isYearly ? plans.pro.yearly : plans.pro.monthly}€
                </span>
                <span className="text-gray-300 ml-2">
                  {isYearly ? '/an' : '/mois'}
                </span>
                {isYearly && (
                  <div className="text-sm text-gray-400 mt-1">
                    Soit {plans.pro.monthly}€/mois
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plans.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.includes('Essai gratuit') ? (
                      <SparklesIcon className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    )}
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelection('pro')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Choisir Pro
              </button>
            </div>

            {/* Growth Plan */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {isYearly ? plans.growth.yearly : plans.growth.monthly}€
                </span>
                <span className="text-gray-300 ml-2">
                  {isYearly ? '/an' : '/mois'}
                </span>
                {isYearly && (
                  <div className="text-sm text-gray-400 mt-1">
                    Soit {plans.growth.monthly}€/mois
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plans.growth.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelection('growth')}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Choisir Growth
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-400 text-sm">
            Paiement sécurisé avec Stripe • Résiliable à tout moment • Support 24/7
          </div>
        </div>
      </section>
    </div>
  )
}

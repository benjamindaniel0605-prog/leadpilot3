'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">LeadPilot</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Fonctionnalités
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Tarifs
              </button>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Connexion
              </Link>
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                S'inscrire
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => { scrollToSection('features'); setIsMenuOpen(false) }}
                className="block w-full text-left text-gray-300 hover:text-white py-2"
              >
                Fonctionnalités
              </button>
              <button
                onClick={() => { scrollToSection('pricing'); setIsMenuOpen(false) }}
                className="block w-full text-left text-gray-300 hover:text-white py-2"
              >
                Tarifs
              </button>
              <Link href="/login" className="block text-gray-300 hover:text-white py-2">
                Connexion
              </Link>
              <Link
                href="/login"
                className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Génération de leads B2B{' '}
            <span className="text-blue-400">automatisée</span> avec IA
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Trouvez, qualifiez et convertissez vos prospects automatiquement. 30 templates d'emails, séquences multi-étapes et IA pour maximiser vos conversions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              S'inscrire Gratuitement
            </Link>
            <Link
              href="/login"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Se Connecter
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-400">
            <div className="flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
              Essai gratuit 14 jours
            </div>
            <div className="flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
              Sans engagement
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tout ce dont vous avez besoin pour générer des leads
            </h2>
            <p className="text-xl text-gray-300">
              Une plateforme complète qui automatise votre prospection de A à Z
            </p>
          </div>

          {/* First row of features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Génération de Leads</h3>
              <p className="text-gray-300">
                Trouvez automatiquement des prospects qualifiés avec filtrage IA avancé.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">30 Templates Email</h3>
              <p className="text-gray-300">
                Templates optimisés en français avec variations IA pour maximiser les taux de réponse.
              </p>
            </div>
          </div>

          {/* Second row of features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Intelligence Artificielle</h3>
              <p className="text-gray-300 text-sm">
                Scoring automatique des leads et génération de variations d'emails personnalisées.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Séquences Multi-étapes</h3>
              <p className="text-gray-300 text-sm">
                Automatisez vos campagnes avec des séquences intelligentes jusqu'à 5 étapes.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Statistiques Avancées</h3>
              <p className="text-gray-300 text-sm">
                Suivez les taux d'ouverture, de clic, de réponse et de RDV bookés en temps réel.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Calendrier Intégré</h3>
              <p className="text-gray-300 text-sm">
                Permettez à vos prospects de réserver des RDV directement via vos emails.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 relative">
              <div className="absolute top-4 right-4">
                <div className="bg-orange-400 text-orange-900 text-xs px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Bientôt
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Service de Closing</h3>
              <p className="text-gray-300 text-sm">
                Closeurs professionnels pour conclure vos ventes par téléphone avec commission sur résultats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choisissez votre plan
            </h2>
            <p className="text-xl text-gray-300">
              Commencez gratuitement, évoluez selon vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">49€</span>
                <span className="text-gray-300 ml-2">par mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">100 leads par mois</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">5 templates email</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">100 variations par mois</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Lien de booking personnalisé</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Connexion Gmail OAuth</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Support email</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Statistiques de conversion</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Résiliable à tout moment</span>
                </li>
              </ul>
              <Link
                href="/pricing"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-all"
              >
                Choisir Starter
              </Link>
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
                <span className="text-4xl font-bold text-white">99€</span>
                <span className="text-gray-300 ml-2">par mois</span>
              </div>
              <div className="flex items-center mb-4">
                <SparklesIcon className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-green-400 text-sm font-semibold">Essai gratuit 14 jours</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Tout Starter +</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">400 leads par mois</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">15 templates email</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">300 variations par mois</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Séquences automatisées (3 étapes)</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Analyse détaillée des campagnes</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Support prioritaire</span>
                </li>
              </ul>
              <Link
                href="/pricing"
                className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-center py-3 rounded-lg font-semibold transition-all"
              >
                Choisir Pro
              </Link>
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
                <span className="text-4xl font-bold text-white">299€</span>
                <span className="text-gray-300 ml-2">par mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Tout Pro +</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">1500 leads par mois</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">30 templates email premium</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">1000 variations par mois</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Séquences automatisées (5 étapes)</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Analyse avancée des performances</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Support 24/7</span>
                </li>
              </ul>
              <Link
                href="/pricing"
                className="block w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-center py-3 rounded-lg font-semibold transition-all"
              >
                Choisir Growth
              </Link>
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


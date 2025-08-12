'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    const type = searchParams.get('type')

    if (type === 'signup' && token) {
      // Redirection automatique vers le login après confirmation
      setTimeout(() => {
        router.push('/login?confirmed=true')
      }, 2000)
    } else {
      setStatus('error')
      setMessage('Lien de confirmation invalide')
    }
  }, [searchParams, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Confirmation en cours...
          </h2>
          <p className="text-gray-600">
            Votre email est en cours de confirmation.
          </p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Aller à la page de connexion
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Email confirmé avec succès !
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Redirection en cours...
        </h2>
        <p className="text-gray-600 mb-4">
          Vous allez être redirigé vers la page de connexion.
        </p>
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Se connecter maintenant
          </button>
        </Link>
      </div>
    </div>
  )
}

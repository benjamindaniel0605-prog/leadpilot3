import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const returnUrl = searchParams.get('returnUrl') || '/settings'
    
    // Configuration OAuth Google
    const googleClientId = process.env.GOOGLE_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/oauth/google/callback`
    
    if (!googleClientId) {
      console.error('GOOGLE_CLIENT_ID manquant dans les variables d\'environnement')
      return NextResponse.redirect(new URL('/settings?error=oauth_config_missing', request.url))
    }

    // Scopes simplifiés pour le développement
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ')

    // Construire l'URL d'autorisation Google
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', googleClientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('access_type', 'online')
    authUrl.searchParams.set('state', returnUrl) // Pour rediriger après l'autorisation

    console.log('🔗 Redirection vers Google OAuth:', authUrl.toString())
    
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('❌ Erreur lors de l\'initiation OAuth Google:', error)
    return NextResponse.redirect(new URL('/settings?error=oauth_init_failed', request.url))
  }
}

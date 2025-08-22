import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state') || '/settings'
    const error = searchParams.get('error')

    // Vérifier si l'utilisateur a annulé l'autorisation
    if (error) {
      console.log('❌ Utilisateur a annulé l\'autorisation Google:', error)
      return NextResponse.redirect(new URL(`${state}?error=oauth_cancelled`, request.url))
    }

    if (!code) {
      console.error('❌ Code d\'autorisation manquant dans la réponse Google')
      return NextResponse.redirect(new URL(`${state}?error=oauth_code_missing`, request.url))
    }

    // Configuration OAuth Google
    const googleClientId = process.env.GOOGLE_CLIENT_ID
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/oauth/google/callback`

    if (!googleClientId || !googleClientSecret) {
      console.error('❌ Configuration Google OAuth manquante')
      return NextResponse.redirect(new URL(`${state}?error=oauth_config_missing`, request.url))
    }

    // Échanger le code contre des tokens d'accès
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('❌ Erreur lors de l\'échange du code:', errorData)
      return NextResponse.redirect(new URL(`${state}?error=oauth_token_exchange_failed`, request.url))
    }

    const tokenData = await tokenResponse.json()
    const { access_token, refresh_token, expires_in } = tokenData

    // Récupérer les informations de l'utilisateur
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      console.error('❌ Erreur lors de la récupération des infos utilisateur')
      return NextResponse.redirect(new URL(`${state}?error=oauth_user_info_failed`, request.url))
    }

    const userInfo = await userInfoResponse.json()

    // Créer le client Supabase
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            // Ne rien faire ici pour les routes API
          },
          remove(name: string, options: any) {
            // Ne rien faire ici pour les routes API
          },
        },
      }
    )

    // Récupérer l'utilisateur actuel
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('❌ Utilisateur non authentifié:', userError)
      return NextResponse.redirect(new URL('/login?error=not_authenticated', request.url))
    }

    // Sauvegarder les tokens dans la base de données
    // TODO: Créer une table pour stocker les tokens OAuth
    // Pour l'instant, on simule la sauvegarde
    console.log('✅ OAuth Google réussi pour:', userInfo.email)
    console.log('📧 Access Token:', access_token ? 'Présent' : 'Manquant')
    console.log('🔄 Refresh Token:', refresh_token ? 'Présent' : 'Manquant')
    console.log('⏰ Expires in:', expires_in, 'secondes')

    // Rediriger vers la page de paramètres avec un message de succès
    return NextResponse.redirect(new URL(`${state}?success=oauth_connected&email=${userInfo.email}`, request.url))

  } catch (error) {
    console.error('❌ Erreur lors du callback OAuth Google:', error)
    return NextResponse.redirect(new URL('/settings?error=oauth_callback_failed', request.url))
  }
}

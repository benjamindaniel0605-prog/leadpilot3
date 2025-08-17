import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { action } = await request.json()
    const templateId = params.id

    if (!action || !['use', 'open'].includes(action)) {
      return NextResponse.json(
        { message: 'Action invalide' },
        { status: 400 }
      )
    }

    // Ici on pourrait mettre à jour la base de données
    // Pour l'instant, on simule la mise à jour
    const updatedStats = {
      templateId,
      action,
      timestamp: new Date().toISOString(),
      userId: user.id
    }

    // Log de l'action pour debug
    console.log('Template stats updated:', updatedStats)

    return NextResponse.json({
      success: true,
      message: `Statistique ${action} mise à jour pour le template ${templateId}`,
      stats: updatedStats
    })

  } catch (error) {
    console.error('Erreur mise à jour stats template:', error)
    return NextResponse.json(
      { 
        message: 'Erreur lors de la mise à jour des statistiques',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

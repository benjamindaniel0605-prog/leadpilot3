import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { db } from '@/lib/database'
import { leads } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set(name, value, options)
          },
          remove(name: string, options: any) {
            cookieStore.set(name, '', { ...options, maxAge: 0 })
          },
        },
      }
    )

    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const leadId = params.id

    // Vérifier que le lead appartient à l'utilisateur
    const existingLead = await db
      .select()
      .from(leads)
      .where(
        and(
          eq(leads.id, leadId),
          eq(leads.userId, user.id)
        )
      )
      .limit(1)

    if (!existingLead.length) {
      return NextResponse.json(
        { error: 'Lead non trouvé ou accès non autorisé' },
        { status: 404 }
      )
    }

    // Supprimer le lead
    await db
      .delete(leads)
      .where(
        and(
          eq(leads.id, leadId),
          eq(leads.userId, user.id)
        )
      )

    return NextResponse.json({ 
      message: 'Lead supprimé avec succès' 
    })

  } catch (error) {
    console.error('Erreur suppression lead:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du lead' },
      { status: 500 }
    )
  }
}

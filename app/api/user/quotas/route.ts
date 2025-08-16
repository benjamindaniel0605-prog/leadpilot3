import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { db } from '@/lib/database'
import { leads } from '@/lib/schema'
import { eq, and, gte } from 'drizzle-orm'

export async function GET(request: NextRequest) {
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

    // Récupérer le profil utilisateur pour connaître son plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    const userPlan = profile?.plan || 'free'

    // Calculer les limites selon le plan
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

    const limits = getPlanLimits(userPlan)

    // Calculer l'utilisation du mois en cours
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const leadsUsed = await db
      .select({ count: leads.id })
      .from(leads)
      .where(
        and(
          eq(leads.userId, user.id),
          gte(leads.createdAt, startOfMonth)
        )
      )
      .then(result => result.length)

    // Calculer les variations utilisées (si applicable)
    const variationsUsed = 0 // À implémenter selon vos besoins

    const quotas = {
      plan: userPlan,
      limits,
      usage: {
        leads: leadsUsed,
        variations: variationsUsed
      },
      remaining: {
        leads: Math.max(0, limits.leads - leadsUsed),
        variations: Math.max(0, limits.variations - variationsUsed)
      },
      percentage: {
        leads: Math.min(100, (leadsUsed / limits.leads) * 100),
        variations: Math.min(100, (variationsUsed / limits.variations) * 100)
      }
    }

    return NextResponse.json(quotas)

  } catch (error) {
    console.error('Erreur récupération quotas:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des quotas' },
      { status: 500 }
    )
  }
}

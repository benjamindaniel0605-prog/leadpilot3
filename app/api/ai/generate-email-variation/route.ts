import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { originalSubject, originalContent, category } = await request.json()

    if (!originalSubject || !originalContent) {
      return NextResponse.json(
        { message: 'Sujet et contenu originaux requis' },
        { status: 400 }
      )
    }

    const prompt = `Tu es un expert en rédaction d'emails commerciaux. Génère une variation de l'email suivant en gardant EXACTEMENT la même structure, le même ton et les mêmes placeholders [PRENOM], [ENTREPRISE], etc.

CATÉGORIE: ${category}
SUJET ORIGINAL: ${originalSubject}
CONTENU ORIGINAL:
${originalContent}

RÈGLES STRICTES:
1. Garde EXACTEMENT la même structure et longueur
2. Garde TOUS les placeholders [PRENOM], [ENTREPRISE], [BENEFICE_PRINCIPAL], [EXPEDITEUR]
3. Garde le même ton professionnel et amical
4. Change seulement les mots et expressions, pas la structure
5. Garde la même ponctuation et formatage

Génère UNIQUEMENT le JSON suivant:
{
  "subject": "nouveau sujet avec placeholders",
  "content": "nouveau contenu avec placeholders"
}`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en rédaction d'emails commerciaux. Tu réponds UNIQUEMENT en JSON valide."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const responseText = completion.choices[0]?.message?.content || ''
    
    // Essayer de parser le JSON de la réponse
    let variation
    try {
      // Nettoyer la réponse pour extraire le JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        variation = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Format de réponse invalide')
      }
    } catch (parseError) {
      console.error('Erreur parsing JSON:', parseError)
      console.error('Réponse ChatGPT:', responseText)
      
      // Fallback: générer une variation simple
      variation = {
        subject: originalSubject,
        content: originalContent
      }
    }

    return NextResponse.json({
      success: true,
      variation: {
        subject: variation.subject || originalSubject,
        content: variation.content || originalContent
      }
    })

  } catch (error) {
    console.error('Erreur génération variation:', error)
    return NextResponse.json(
      { 
        message: 'Erreur lors de la génération de la variation',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'API test fonctionne !' })
}

export async function POST() {
  return NextResponse.json({ message: 'API test POST fonctionne !' })
}

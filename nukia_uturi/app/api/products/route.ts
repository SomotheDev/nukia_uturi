import { NextResponse } from 'next/server'
import { products } from '../../lib/db'

export async function GET() {
  try {
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


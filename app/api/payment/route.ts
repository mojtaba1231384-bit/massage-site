import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount, phone, bookingData } = body

    // برای تست (دمو) - در حالت واقعی با زرین‌پال ارتباط برقرار کن
    const TEST_AUTHORITY = 'TEST_' + Math.random().toString(36).substring(7)
    
    return NextResponse.json({ 
      url: `http://localhost:3000/payment/verify?Authority=${TEST_AUTHORITY}&Status=OK`
    })
  } catch (error) {
    return NextResponse.json({ error: 'مشکل در سرور' }, { status: 500 })
  }
}
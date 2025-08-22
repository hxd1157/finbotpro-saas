import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(req: Request) {
  const session = await auth()
  const url = new URL(req.url)
  if (url.pathname.startsWith('/dashboard') && !session?.user) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }

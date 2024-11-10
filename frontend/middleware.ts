import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

  // Skip CORS handling for API routes, let the route handlers manage it
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }


  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  await supabase.auth.getSession()

  return res
}
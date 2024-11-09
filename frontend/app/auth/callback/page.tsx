'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
//   const [status, setStatus] = useState<string>('Setting up your session...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        
        // Handle returning users (code flow)
        if (code) {
          await supabase.auth.exchangeCodeForSession(code)
          router.push('/')
          return
        }

        // Handle new users (hash flow)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        )
        
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          router.push('/')
          return
        }

        // If we already have a session, just redirect
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/')
          return
        }

        // Only redirect with error if no auth method worked
        router.push('/?error=no_auth_method_found')
        
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/?error=auth_error')
      }
    }

    handleCallback()
  }, [router, searchParams, supabase.auth])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  )
}
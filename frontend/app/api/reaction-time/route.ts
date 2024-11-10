// pages/api/reaction-time/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Helper function to handle CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://www.youtube.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
  
  // Handle OPTIONS preflight request
  export async function OPTIONS() {
    return NextResponse.json({}, {
      headers: corsHeaders,
    })
  }

export async function POST(req: Request) {

    if (req.headers.get('origin') !== 'https://www.youtube.com') {
        return NextResponse.json(
          { error: 'Unauthorized origin' },
          { status: 403 }
        )
      }

  try {
    const { userId, reactionTime, timestamp } = await req.json()
    
    // Validate input
    if (!userId || !reactionTime || reactionTime < 0) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    
    const supabase = createRouteHandlerClient({ cookies })
    
    // Insert reaction time
    const { error } = await supabase
      .from('reaction_times')
      .insert({
        user_id: userId,
        time: reactionTime,
        created_at: timestamp
      })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save reaction time' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { 
        status: 500,
        headers: corsHeaders
      }
    )
  }
}
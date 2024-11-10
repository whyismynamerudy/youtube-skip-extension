// pages/api/reaction-time/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
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
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
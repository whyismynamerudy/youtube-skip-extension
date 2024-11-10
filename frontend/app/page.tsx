'use client'

// import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Timer, Users, Zap, Crown, Download } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

// Initialize Supabase client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )
const supabase = createClientComponentClient()

interface Stats {
  totalUsers: number;
  totalSkips: number;
}

interface LeaderboardEntry {
  userId: string;
  email: string;
  bestTime: number;
  rank: number;
}

export default function Home() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalSkips: 0 })
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [user, setUser] = useState<any>(null) // eslint-disable-line
  const [userStats, setUserStats] = useState<{ rank: number; bestTime: number } | null>(null)

  useEffect(() => {
    checkUser()
    fetchStats()
    fetchLeaderboard()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      const { data } = await supabase
        .from('user_stats')
        .select('rank, best_time')
        .eq('user_id', user.id)
        .single()
      
      if (data) {
        setUserStats({
          rank: data.rank,
          bestTime: data.best_time // Transform the snake_case to camelCase
        })
      }
    }
  }

  // async function fetchStats() {
  //   const { data } = await supabase
  //     .from('stats')
  //     .select('total_users, total_skips')
  //     .single()
    
  //   if (data) {
  //     setStats({
  //       totalUsers: data.total_users,
  //       totalSkips: data.total_skips
  //     })
  //   }
  // }

  async function fetchStats() {
    // Since we removed the global_stats table, let's calculate these directly
    const [usersCount, skipsCount] = await Promise.all([
      supabase.from('user_stats').select('user_id', { count: 'exact' }),
      supabase.from('reaction_times').select('id', { count: 'exact' })
    ])
    
    setStats({
      totalUsers: usersCount.count || 0,
      totalSkips: skipsCount.count || 0
    })
  }
  
  async function fetchLeaderboard() {
    const { data } = await supabase
      .from('leaderboard')
      .select('user_id, email, best_time, rank')
      .order('rank', { ascending: true })
      .limit(10)
    
    if (data) {
      setLeaderboard(data.map(entry => ({
        userId: entry.user_id,
        email: entry.email,
        bestTime: entry.best_time,
        rank: entry.rank
      })))
    }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })
    
    if (error) {
      console.error('Error:', error)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <Timer className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Ad Reaction Timer</h1>
        </div>
        {!user ? (
          <Button onClick={signInWithGoogle} variant="outline">
            Sign in with Google
          </Button>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-black">{user.email}</span>
            <Button variant="outline" onClick={() => {
              supabase.auth.signOut()
              router.push('/')
            }}>
              Sign Out
            </Button>
          </div>
        )}
      </nav>

      {user && userStats && (
        <Card className="mb-8 bg-blue-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Your Stats</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Crown className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Your Rank</p>
                <p className="text-2xl font-bold text-white">#{userStats.rank}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Best Time</p>
                <p className="text-2xl font-bold text-white">{userStats.bestTime.toFixed(3)}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span>Total Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Total Skips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalSkips}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-green-500" />
              <span>Get Started</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Download Extension</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span>Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div key={entry.userId} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                <div className="flex items-center space-x-4">
                  <Badge variant={index < 3 ? "default" : "secondary"}>
                    #{entry.rank}
                  </Badge>
                  <span className="text-white">{entry.email}</span>
                </div>
                <span className="text-xl font-bold text-blue-500">
                  {entry.bestTime.toFixed(3)}s
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {user && (
        <div 
          id="youtube-reaction-timer-data" 
          style={{ display: 'none' }}
          data-user-id={user.id}
          data-email={user.email}
        />
      )}
    </main>
  )
}
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, User, Share2, Database, Clock, Lock, Trash2 } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Last Updated: November 10, 2024</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">User Account Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (through Google Sign-in)</li>
              <li>Google OAuth authentication tokens</li>
              <li>User identifiers provided by Google authentication</li>
            </ul>

            <h3 className="font-semibold">Performance Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reaction times when clicking YouTube&apos;s &quot;Skip Ad&quot; button</li>
              <li>Timestamp of when reactions were recorded</li>
              <li>Statistical data derived from reaction times (e.g., personal best times, rankings)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and maintain your user account</li>
              <li>To track and display your reaction times</li>
              <li>To generate and maintain global leaderboards</li>
              <li>To calculate and display your ranking among other users</li>
              <li>To improve the extension&apos;s functionality and user experience</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Information Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We only share your information in the following limited circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your email address and best reaction times are displayed on public leaderboards</li>
              <li>Aggregated, anonymized statistics about overall extension usage</li>
            </ul>
            <p className="font-semibold mt-4">We do not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sell your personal information to third parties</li>
              <li>Share your data for advertising purposes</li>
              <li>Use your data for purposes unrelated to the extension&apos;s core functionality</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We implement appropriate security measures to protect your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All data is stored securely using Supabase&apos;s encrypted infrastructure</li>
              <li>Authentication is handled through secure OAuth protocols</li>
              <li>Regular security audits and updates are performed</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We retain your data for as long as you maintain an active account. Your reaction times and rankings are stored indefinitely to maintain historical leaderboard accuracy.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your reaction time history</li>
              <li>Opt-out of leaderboard displays</li>
            </ul>
            <p className="mt-4">To exercise these rights, please contact us at [Your Contact Email]</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Changes to This Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last Updated&quot; date at the top. You are advised to review this privacy policy periodically for any changes.</p>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">{"getslate0001<at>gmail.com"}</p>
        </div>
      </div>
    </main>
  )
}
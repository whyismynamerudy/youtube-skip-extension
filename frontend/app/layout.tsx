import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "YouTube Ad Reaction Timer",
  description: "Compete to be the fastest ad skipper!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative`}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-purple-400/30 rounded-full blur-3xl animate-drift" />
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-blue-400/30 rounded-full blur-3xl animate-drift-slow" />
        </div>
        
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}

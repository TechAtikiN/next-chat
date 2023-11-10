// style imports
import './globals.css'

// named imports
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

// default imports
import Header from '@/components/global/navbar/Header'
import ClientProviders from '@/components/providers/ClientProviders'
import FirebaseAuthProvider from '@/components/providers/FirebaseAuthProvider'
import SubscriptionProvider from '@/components/providers/SubscriptionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next-chat',
  description: 'A next generation chat app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang='en'>
        <body className='flex flex-col min-h-screen'>
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />

                {children}
                <Toaster />
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  )
}

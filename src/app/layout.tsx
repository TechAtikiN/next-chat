// style imports
import './globals.css'

// named imports
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// default imports
import Header from '@/components/global/navbar/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

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
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <Header />

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ToggleThemeButton } from '@/components/theme/toggle-theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZipLink',
  description: 'Easy Links',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <div style={{ position:"fixed", left:"12px", bottom:"12px" }}>
            <ToggleThemeButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

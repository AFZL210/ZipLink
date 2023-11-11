import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { AuthContext } from '@/context/AuthContext';
import { RecoilRootProvider } from '@/context/RecoilContext';
import Auth from '@/context/Auth';

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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
          <AuthContext>
            <RecoilRootProvider>
              <Auth />
              {children}
            </RecoilRootProvider>
          </AuthContext>
          <Toaster />
          <div style={{ position: "fixed", left: "12px", bottom: "12px" }}>
            {/* <ToggleThemeButton /> */}
          </div>
      </body>
    </html>
  )
}

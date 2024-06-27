import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/NavBar'
import AuthProvider from './context/AuthProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth HobyHive',
  description: 'HobyHive website for friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* <Navbar /> */}
          <main className="flex justify-center items-start p-6 min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
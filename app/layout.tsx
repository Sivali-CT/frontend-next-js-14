import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/global/Navbar'
import Footer from './components/global/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SCT - Demo Web Application',
  description: 'Marketing landing page for development and testing purposes. Created by SCT.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>  
          {children}
        <Footer/>
      </body>
    </html>
  )
}
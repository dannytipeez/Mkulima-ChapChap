import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import Navbar from '@/components/Navbar'
import { store } from '@/redux/store'
import { auth } from '@/redux/features/auth-Slice'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MkulimaChapChap',
  description: 'FMS for farmer, expert and providers',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">

      <body className={inter.className}>
        <ReduxProvider>
          {children}</ReduxProvider></body>
    </html>

  )
}

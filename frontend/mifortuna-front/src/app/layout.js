import "./globals.css";
import { Inter } from 'next/font/google'
import Menu from "./components/menu"

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Menu />
        {children}
      </body>
    </html>
  )
}

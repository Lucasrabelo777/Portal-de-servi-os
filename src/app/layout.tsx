import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Projeto Reinicializado',
  description: 'Projeto Next.js reinicializado com configuração limpa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
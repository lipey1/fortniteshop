import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fortnite Shop - Loja Diária',
  description: 'Veja os itens da loja do Fortnite de hoje e quanto tempo falta para atualizar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}




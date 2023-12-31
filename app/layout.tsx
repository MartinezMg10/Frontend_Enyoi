import './globals.css'
import type { Metadata } from 'next'
import {Baloo_2 } from 'next/font/google'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const baloo= Baloo_2({subsets: ['latin'], weight:['400','700','800'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={baloo.className}>{children}</body>
    </html>
  )
}

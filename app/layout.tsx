import Link from 'next/link'
import React from 'react'

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>        
        <header>
          <Link href="/">
            Home
          </Link>
          {' | '}
          <Link href="/posts">
            Posts
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
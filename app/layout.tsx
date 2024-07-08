import Link from 'next/link'
import React from 'react'

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <title>Tina App</title>
        <meta name="description" content="Austin Matherne" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>        
        <header>
          <Link href="/">
            Home
          </Link>
          {' | '}
          <Link href="/posts">
            Posts
          </Link>
          {' | '}
          <Link href="/websites">
            Websites
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
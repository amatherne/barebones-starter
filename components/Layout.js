import Link from 'next/link'
import Head from 'next/head'

export const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <main>{props.children}</main>
    </div>
  );
}

import Link from 'next/link'

export const Navigation = () => {
  return (
    <>
      <header>
        <Link href="/">
          Home
        </Link>
        {/*{' | '}
        <Link href="/posts">
          Posts
        </Link>*/}
        {' | '}
        <Link href="/websites">
          Websites
        </Link>
        {' | '}
        <Link href="/sounds">
          Sounds
        </Link>
      </header>
    </>
  );
}
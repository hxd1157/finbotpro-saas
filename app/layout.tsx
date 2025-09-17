import '../styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/lib/auth'

export const metadata = {
  title: 'FinBotPro — AI Finance & Tax',
  description: 'Futuristic AI platform for finance & tax teams'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" width={120} height={26} alt="FinBotPro"/>
              </Link>
              <nav className="hidden md:flex gap-5 text-sm opacity-90">
                <Link href="/(marketing)/about">About</Link>
                <Link href="/(marketing)/pricing">Pricing</Link>
                <Link href="/onboarding" className="badge">Get started</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {session?.user ? (
                <form action={async () => { 'use server'; await signOut() }}>
                  <button className="btn" type="submit">Sign out</button>
                </form>
              ) : (
                <form action={async () => { 'use server'; await signIn('apple') }}>
                  <button className="btn" type="submit">Sign in with Apple</button>
                </form>
              )}
            </div>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="container py-10 opacity-70 text-sm">
          <hr className="mb-4"/>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} FinBotPro. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/(marketing)/about">About</Link>
              <Link href="/(marketing)/pricing">Pricing</Link>
              <a href="mailto:hello@finbotpro.com">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

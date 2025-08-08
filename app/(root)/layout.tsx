import Footer from '@/components/footer'
import { isAuthenticated, getCurrentUser } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import LogoutButton from '@/components/LogoutButton'

const RootLayout = async ({ children }: { children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated()

  if (!isUserAuthenticated) redirect('/sign-up')
  return (
    <div className='root-layout  flex flex-col'>
      <nav className="flex justify-between items-center px-6 py-3 bg-dark-100 shadow-md">
        <Link href='/' className="flex items-center">
          <Image src='/logo.png' alt='logo' width={150} height={100} className="object-contain" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href='/interview' className="text-white hover:text-primary-100 transition-colors">
            Interviews
          </Link>
          <LogoutButton />
        </div>
      </nav>
      {children}
      <Footer />
    </div>
  )
}

export default RootLayout


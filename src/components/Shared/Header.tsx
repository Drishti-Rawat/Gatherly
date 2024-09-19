import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import MobileNavItems from './MobileNavItems'
import NavItems from './NavItems'

const Header = () => {
  return (
    <header className='w-full border-b '>
      <div className='wrapper flex items-center justify-between'>
        {/* logo */}
        <Link href={"/"} className='flex items-center  justify-center'>
            <Image src={"/assets/images/logo.png"} width={50} height={50} alt={"logo"}/>
            <h2 className='text-2xl font-bold  gradient-text'>Gatherly</h2>
        </Link>

      
          <SignedIn>
            <nav className='w-full max-w-xs hidden sm:flex-between'>
             <NavItems/>
            </nav>

          </SignedIn>
       

        <div className='flex gap-2 items-center'>
          <SignedIn>
            <UserButton afterSwitchSessionUrl='/'/>
            <MobileNavItems/>
          </SignedIn>

       <SignedOut>
        <Button asChild className='text-xs rounded-full' size={'lg'}>
          <Link href={'/sign-in'}>Login</Link></Button>
        </SignedOut>
        </div>

      </div>
    </header>
  )
}

export default Header

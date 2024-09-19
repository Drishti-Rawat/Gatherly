import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignedOut } from '@clerk/nextjs'

const Header = () => {
  return (
    <header className='w-full border-b '>
      <nav className='wrapper flex items-center justify-between'>
        {/* logo */}
        <Link href={"/"} className='flex items-center'>
            <Image src={"/assets/images/logo.png"} width={50} height={50} alt={"logo"}/>
            <h2 className='text-2xl font-bold  gradient-text'>Gatherly</h2>
        </Link>

       <SignedOut>
        <Button asChild className='text-xs rounded-full' size={'lg'}>
          <Link href={'/sign-in'}>Login</Link></Button>
        </SignedOut>
      </nav>
    </header>
  )
}

export default Header

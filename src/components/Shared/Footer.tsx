import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col p-5  '>
      <Link className='flex items-center ' href={'/'}>
    <Image src={"/assets/images/logo.png"} width={50} height={50} alt={"logo"}/>
    <h2 className='text-2xl font-bold  gradient-text'>Gatherly</h2>
    </Link>

    <p className='text-sm'>&copy; 2024 Gatherly. All Rights Reserved.</p>
      </div>

      
    </footer>
  )
}

export default Footer

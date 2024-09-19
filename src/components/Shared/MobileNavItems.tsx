import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {  Menu, Ribbon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'


const MobileNavItems = () => {
  return (
    <nav className='md:hidden'>
<Sheet>
  <SheetTrigger><Menu/></SheetTrigger>
  <SheetContent className='bg-primary-50 flex flex-col gap-6 md:hidden'>
    
    <Link className='flex items-center justify-center' href={'/'}>
    <Image src={"/assets/images/logo.png"} width={50} height={50} alt={"logo"}/>
    <h2 className='text-2xl font-bold  gradient-text'>Gatherly</h2>
    </Link>
    <Separator className='border border-gray-50'/>

      <NavItems/>
      
 
  </SheetContent>
  
</Sheet>
</nav>



  )
}

export default MobileNavItems

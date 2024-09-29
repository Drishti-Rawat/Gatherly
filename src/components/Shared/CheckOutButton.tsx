"use client"

import { Ievent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'


const CheckOutButton = ({event}:{event:Ievent}) => {
    const {user}= useUser()
    const userID = user?.publicMetadata.userid as string
    // console.log("got evnt",event)
    const hasEventFinished = new Date(event.endDateTime)< new Date()
  return (
    <div className='flex items-center gap-3'>
        {/* can not buy past event */}
        {
            hasEventFinished?(
                <p className='p-regular-12 text-red-500'>Sorry, tickets are not longer available</p>
            ):(
                <>
                <SignedOut>

                <Button asChild className='button rounded-full '>
                    <Link href={`/sign-in`}>Get Tickets</Link>
                </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout event={event} userId={userID}/>
                </SignedIn>
                </>
                
            )
        }
      
    </div>
  )
}

export default CheckOutButton

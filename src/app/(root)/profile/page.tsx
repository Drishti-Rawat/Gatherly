import CollectionEvents from '@/components/Shared/CollectionEvents'
import { Button } from '@/components/ui/button'
import {  getEventByUser } from '@/lib/actions/Event.action'
import { getOrdersByUser } from '@/lib/actions/Order.action'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async({searchParams}:SearchParamProps) => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userid as string;

    const ordersPage = Number(searchParams?.ordersPage || 1);
    const eventsPage = Number(searchParams?.eventsPage || 1);

    const EventsOrganized = await getEventByUser({userId,page:1})
    // console.log("EventsOrganized",EventsOrganized)

    const orders = await getOrdersByUser({userId,page:1})
    const orderEvent = orders?.data.map((order:IOrder)=>order.event)||[]
    console.log("orderEvent",orderEvent)
  return (
    <>
    {/* my tickets */}
    <section className='bg-primary-50 bg-dotted-pattern bg-contain bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'>My tickets</h3>
            <Button  asChild className='button hidden sm:flex'>
                <Link href="/#events">Explore More Events</Link>
            </Button>
        </div>


    </section>
    {/* my events */}
    <section className='wrapper my-8'>
    <CollectionEvents
        data = {orderEvent}
        emptyTitles= "No events tickets Purcahed. "
        emptyStateSubText = "No worries! plenty of exiciting evnts to get you started. "
        collectionTitle = "My_Tickets"
        limit= {3}
        page={ordersPage}
        totalPages={orders?.totalPages}
        urlParamName='ordersPage'
        
        />

    </section>
    {/* my events organized */}
    <section className='bg-primary-50 bg-dotted-pattern bg-contain bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
            <Button  asChild className='button hidden sm:flex'>
                <Link href="/events/create">Create New Event</Link>
            </Button>
        </div>


    </section>
    <section className='wrapper my-8'>
    <CollectionEvents
        data = {EventsOrganized?.data}
        emptyTitles= "No events have been organized yet. "
        emptyStateSubText = "Go ahead and create an event. "
        collectionTitle = "Event_Organized"
        limit= {6}
        page={eventsPage}
        totalPages={EventsOrganized?.totalPages}
        urlParamName='eventsPage'
        
        />

    </section>
    </>
  )
}

export default ProfilePage

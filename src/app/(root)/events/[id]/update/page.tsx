import React from 'react'
import EventForm from "@/components/Shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import { getEventByID } from '@/lib/actions/Event.action';

type UpdateEventProps = {
  params: {
    id: string
  }
}
const UpdateEventPage = async({params:{id}}:UpdateEventProps) => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userid as string;
    // console.log(userId)
    const event = await getEventByID(id)
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-contain bg-center py-5 md:py-10 ">
      <h3 className="wrapper h3-bold text-center sm:text-left">
        Update Event
      </h3>
    </section>

    <div className="wrapper my-8">
      <EventForm userId={userId} type="Update" event={event} eventId={id}/>
    </div>
  </>
  )
}

export default UpdateEventPage






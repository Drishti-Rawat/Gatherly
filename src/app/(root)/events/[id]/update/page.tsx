import React from 'react'
import EventForm from "@/components/Shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const UpdateEventPage = () => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.user_id as String;
    console.log(userId)
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-contain bg-center py-5 md:py-10 ">
      <h3 className="wrapper h3-bold text-center sm:text-left">
        Update Event
      </h3>
    </section>

    <div className="wrapper my-8">
      <EventForm userId={userId} type="update"/>
    </div>
  </>
  )
}

export default UpdateEventPage






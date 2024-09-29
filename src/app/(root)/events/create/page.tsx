import EventForm from "@/components/Shared/EventForm";
// import { auth } from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs/server';

import React from "react";

const CreateEventPage = () => {

  // to get the seesion data

  const {sessionClaims} = auth()
  console.log(sessionClaims)
  // const userId = sessionClaims?.user_id as string;
  const userId = sessionClaims?.userid as string;
  
  console.log("UserId",userId)
  
 
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain bg-center py-5 md:py-10 ">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create"/>
      </div>
    </>
  );
};

export default CreateEventPage;

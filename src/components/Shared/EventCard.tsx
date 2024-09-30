import { Ievent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteConfirmation from "./DeleteConfirmation";

type EventCardProps = {
  event: Ievent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const EventCard = ({ event, hasOrderLink, hidePrice }: EventCardProps) => {


  const {sessionClaims} = auth()
  const userId = sessionClaims?.userid as string
  console.log("userId",userId)

  const isEventCreator = userId === event.organizer._id.toString()

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link href={`/events/${event._id}`} style={{backgroundImage: `url(${event.imageUrl})`}} className="w-full flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"/>

      {/* is event creator - add edit adnd delete */}
      {
        isEventCreator && !hidePrice && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-primary-50 p-3 shadow-sm transition-all">
            <Link href={`/events/${event._id}/update`}>
            <Image src={"/assets/icons/edit.svg"} width={20} height={20} alt={"edit"}/>
            </Link>

           
            <DeleteConfirmation eventId = {event._id}/>
            
          </div>
        )
      }

      <div
         className="flex min-h-[230px] flex-col gap-3 md:gap-4 p-5">
          {!hidePrice &&
          <div className="flex gap-2 ">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600">{event.isFree ? "Free" : `$${event.price}`}</span>
            <p className="p-semibold-14 w-min line-clamp-1 bg-blue-100 px-4 py-1 text-blue-600 rounded-full">{event.category.name}</p>

          </div>}

          <p className="p-medium-16 md:p-medium-18 text-grey-500">{formatDateTime(event.startDateTime).dateTime}</p>

         <Link href={`/events/${event._id}`}> <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black ">{event.title}</p>
         <p className="line-clamp-3 p-regular-14">{event.description}</p>
         </Link>
          <div className="flex-between w-full ">
            <p className="p-medium-14 md:p-medium-16 text-grey-500">{event.organizer.firstName} {event.organizer.lastName}</p>
            {
              hasOrderLink &&
              <Link href={`/orders?eventId=${event._id}`} className="flex gap-2 ">
                <p className="text-primary-500">Order Details</p>
                <Image src={"/assets/icons/arrow.svg"} width={10} height={10} alt={"arrow-right"}/>
              </Link>
            }

          </div>

        </div>
      
    </div>
  );
};

export default EventCard;

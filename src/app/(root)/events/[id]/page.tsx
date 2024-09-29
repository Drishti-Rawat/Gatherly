import CheckOutButton from "@/components/Shared/CheckOutButton";
import CollectionEvents from "@/components/Shared/CollectionEvents";
import { getEventByID, getRelatedEventsByCategory } from "@/lib/actions/Event.action";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const EventDetailPage = async ({ params: { id },searchParams }: SearchParamProps) => {
  const event = await getEventByID(id);
  // console.log(event);
  const RelatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page  as string,
   
  });

  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain ">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          width={1000}
          height={1000}
          alt={event.title}
          className="h-full min-h-[300px]  object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-4 ">
            <h2 className="h2-bold">{event.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-14 rounded-full bg-green-500/20 px-5 py-2 text-green-800">
                  {event.isFree ? "Free" : `$${event.price}`}
                </p>
                <p className="p-medium-14 rounded-full bg-blue-500/20 px-4 py-2.5 text-blue-600">
                  {event.category.name}
                </p>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-primary-500">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>

          {/* checkout button */}
          <CheckOutButton event = {event}/>

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                width={32}
                height={32}
                alt="date"
              />
              <div className="flex p-medium-16 flex-wrap items-center">
                <p className="ml-1">
                  {formatDateTime(event.startDateTime).dateOnly} /
                  {formatDateTime(event.startDateTime).timeOnly} -
                </p>
                <p className="ml-1">
                  {formatDateTime(event.endDateTime).dateOnly} /
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center  gap-3">
                <Image src="/assets/icons/location.svg" width={32} height={32} alt="location"/>
                <p className="p-medium-16">{event.location}</p>

            </div>

          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-gray-600">Event Description</p>
            <p className="p-medium-16  lg:p-regular-18">{event.description}</p>
            <p className="p-medium-16  lg:p-regular-16 truncate text-primary-500 underline">{event.url}</p>


          </div>
        </div>
      </div>
    </section>

    {/* recommended post -- events from the same oraganizer */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold"> Related Events</h2>
      <CollectionEvents
        data = {RelatedEvents?.data}
        emptyTitles= "No events yet. "
        emptyStateSubText = "Come back later and create one!"
        collectionTitle = "All_Events"
        limit= {6}
        page={1}
        totalPages={2}
      />


    </section>

    </>
  );
};

export default EventDetailPage;

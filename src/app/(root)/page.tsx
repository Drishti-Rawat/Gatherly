import CategoryFilter from "@/components/Shared/CategoryFilter";
import CollectionEvents from "@/components/Shared/CollectionEvents";
import Search from "@/components/Shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/Event.action";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

import Image from "next/image";
import Link from "next/link";

export default async function Home({
  searchParams}:SearchParamProps) {

    const page = Number(searchParams?.page || 1)
    const searchText = (searchParams?.query as string)||""
    const category = (searchParams?.category as string)||""

  const All_events = await getAllEvents({
    query: searchText,
    category:category,
    page: page,
    limit: 6
  })
  // console.log(All_events)
  // const {user}= useUser()
  // console.log(user?.publicMetadata)
  const {sessionClaims} = auth()
  console.log("session claims",sessionClaims)
 
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Collaborate: Your Events in One Place!</h1>
            <p className="p-regular-14">An event management platform designed to streamline hosting, connecting, and collaborating. Whether you’re a small business, a large corporation, or an individual, you can easily manage events with a user-friendly interface and robust features, engaging with your guests like never before.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 

      <section id="events" className="wrapper my-8 flex flex-col  gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by Top Event Companies</h2>

        <div className="w-full flex flex-col gap-5 md:flex-row">
          <Search/>
          <CategoryFilter/>

        </div>

        <CollectionEvents
        data = {All_events?.data}
        emptyTitles= "No events yet. "
        emptyStateSubText = "Come back later and create one!"
        collectionTitle = "All_Events"
        limit= {6}
        page={page}
        totalPages={All_events?.totalPages}
        />
      </section>
    </>
  );
}

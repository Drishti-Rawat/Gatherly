"use client"
import React, { startTransition, useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteEvent } from '@/lib/actions/Event.action'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const DeleteConfirmation = ({eventId }: {eventId: string}) => {
    const pathname = usePathname()
    const [isPending , startTransition] = useTransition()
  return (
    <AlertDialog>
  <AlertDialogTrigger  >
    <Image src={"/assets/icons/delete.svg"} width={20} height={20} alt={"edit"}/>
  </AlertDialogTrigger>
  <AlertDialogContent className="bg-white rounded-2xl">
    <AlertDialogHeader>
      <AlertDialogTitle className="p-regular-16 text-grey-600">Are you sure you want to delete?</AlertDialogTitle>
      <AlertDialogDescription>
      This will permanently delete this Event
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>startTransition(async()=>await deleteEvent({eventId,path:pathname}))}>
        {isPending ? "Deleting..." : "Delete"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteConfirmation

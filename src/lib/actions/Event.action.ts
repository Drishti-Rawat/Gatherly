"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const PopulateEvent = async (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    console.log(path);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: organizer._id,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const UpdateEvent = async ({
  userId,
  event,
  path,
}: UpdateEventParams) => {
  try {
    await connectToDatabase();
    const EventToUpdate = await Event.findById(event._id);
    if (!EventToUpdate || EventToUpdate.organizer._id.toString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    // console.log("event is updateing", event);
    const updateEvent = await Event.findByIdAndUpdate(
      event._id,
      {  ...event,
        category: event.categoryId, },
      {  new: true,}
    );
    // console.log("evnet updates successfully",updateEvent);

    revalidatePath(path);
    return JSON.parse(JSON.stringify(updateEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventByID = async (id: string) => {
  try {
    await connectToDatabase();

    const event = await PopulateEvent(Event.findById(id));
    if (!event) {
      throw new Error("Event not found");
    }
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();
    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);
    const events = await PopulateEvent(eventsQuery);

    const eventsCount = await Event.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getEventByUser = async ({userId,limit=6,page}:GetEventsByUserParams) => {
  try {
    await connectToDatabase();
    const conditions = {organizer:userId}
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
    .sort({createdAt:'desc'})
    .skip(skipAmount)
    .limit(limit)

    const events = await PopulateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)
    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    
  } catch (error) {
    handleError(error);
  }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDatabase();
    const Deletedevent = await Event.findByIdAndDelete(eventId);
    if (Deletedevent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};


export const getRelatedEventsByCategory = async ({categoryId, limit = 3 , page=1,eventId}:GetRelatedEventsByCategoryParams) => {
  try {
    await connectToDatabase();
    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await PopulateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error);
  }
}
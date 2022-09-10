import create from "zustand";
import { EventService } from "../services/event.service";
import { Event, EventTypes, ICreateEvent } from "../types/event";

interface EventState {
  event: Event;
  fetchEvent: (callback?: any) => Promise<void>;
  storeEvent: (event: Event) => Promise<void>;
  deleteEvent: (eventId: number) => Promise<void>;
  createEvent: (CreateEventDto: ICreateEvent) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>
}

const initDate = new Date();

const initEvent: Event = {
  id: 0,
  createdAt: initDate,
  estimatedGuests: 0,
  lastUpdatedAt: initDate,
  name: "",
  type: EventTypes.Other,
  closed: false,
};

const useStore = create<EventState>((set) => ({
  event: initEvent,
  fetchEvent: async (callback?: any) => {
    const event = await EventService.current(callback);
    set(({ event }))
  },
  storeEvent: async (event: Event) => {
    await EventService.store(event);
    set({ event })
  },
  createEvent: async (CreateEventDto: ICreateEvent) => {
    const event = await EventService.create(CreateEventDto);
    set({ event })
  },
  updateEvent: async (event: Event): Promise<void> => {
    const updatedEvent = await EventService.update(event);
    set({ event: updatedEvent });
  },
  deleteEvent: async (eventId: number) => {
    await EventService.delete(eventId);
    set(({ event: initEvent }))
  },
}));

export { useStore as useEventStore };
;

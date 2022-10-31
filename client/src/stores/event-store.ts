import create from "zustand";
import { EventService } from "../services/event.service";
import { Event, EventTypes, CreateEventDto } from "../types/event";
import { showErrorMessage } from "../utils/error-message.util";

interface EventState {
  event: Event;
  fetchEvent: (callback?: any) => Promise<void>;
  storeEvent: (event: Event) => Promise<void>;
  deleteEvent: (eventId: number) => Promise<void>;
  createEvent: (CreateEventDto: CreateEventDto) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
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
    try {
      const event = await EventService.current();
      set({ event });
    } catch (e) {
      showErrorMessage({ callback });
    }
  },
  storeEvent: async (event: Event) => {
    try {
      await EventService.store(event);
      set({ event });
    } catch (e: any) {
      showErrorMessage({ errorString: e.message as string })
    }
  },
  createEvent: async (CreateEventDto: CreateEventDto) => {
    try {
      const event = await EventService.create(CreateEventDto);
      set({ event });
    } catch (e: any) {
      showErrorMessage({ errorString: e.message as string })
    }
  },
  updateEvent: async (event: Event): Promise<void> => {
    try {
      const updatedEvent = await EventService.update(event);
      set({ event: updatedEvent });
    } catch (e: any) {
      showErrorMessage({ errorString: e.message as string })
    }
  },
  deleteEvent: async (eventId: number) => {
    try {
      await EventService.delete(eventId);
      set({ event: initEvent });
    } catch (e: any) {
      showErrorMessage({ errorString: e.message as string })
    }
  },
}));

export { useStore as useEventStore };

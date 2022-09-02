import create from "zustand";
import { Event, EventTypes } from "../types/event";

interface EventState {
  event: Event;
  setEvent: (event: Event) => void;
  clearEvent: () => void;
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
  //Define initial event values
  event: initEvent,

  //Set the global event
  setEvent: (event) => set((state) => ({ event })),

  //Clear the stored event
  clearEvent: () => set((state) => ({ event: initEvent })),
}));

export { useStore as useEventStore };

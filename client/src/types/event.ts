//Attrs required to create an event (the dto)
export interface CreateEventDto {
  name: string;
  estimatedGuests: number;
  type: EventTypes;
}

//All possible event types
export enum EventTypes {
  Wedding = "Wedding",
  Birthday = "Birthday",
  Party = "Party",
  Other = "Other",
}

//The event entity from the server
export interface Event extends CreateEventDto {
  id: number;
  createdAt: Date;
  lastUpdatedAt: Date;
  closed: boolean;
}

export default Event;

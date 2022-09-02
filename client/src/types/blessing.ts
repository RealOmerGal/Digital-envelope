//Attrs required to create a blessing (the dto)
export interface ICreateBlessing {
  text: string;
  createdBy: string;
  eventId: number;
  total: number;
}

//The blessing entity in the server
export interface Blessing extends ICreateBlessing {
  id: number;
  createdAt: Date;
}

export default Blessing;

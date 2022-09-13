//Attrs required to create a blessing (the dto)
export interface CreateBlessingDto {
  text: string;
  createdBy: string;
  eventId: number;
  amount: number;
}

//The blessing entity in the server
export interface Blessing extends CreateBlessingDto {
  id: number;
  createdAt: Date;
}

export default Blessing;

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  paymentProfileId?: string;
}

export default User;

import { PaymentMethod } from "@stripe/stripe-js";

export interface CreatePaymentDto {
  token?: PaymentMethod["id"];
  amount: number | string;
  email: string;
}

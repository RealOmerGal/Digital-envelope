import { CreateBlessingDto } from "../types/blessing";
import { CreatePaymentDto } from "../types/payment";
import { showSuccessMessage } from "../utils/success-message.util";
import axiosInstance from "./axios-instance";

export class BlessingService {
  private static prefix = "/blessing";

  public static async getByEvent(skip: number, take: number) {
    try {
      return await (
        await axiosInstance.get(`${this.prefix}?take=${take}&skip=${skip}`)
      ).data;
    } catch (e) {}
  }
  public static async create(
    createBlessingDto: CreateBlessingDto,
    createPaymentDto: CreatePaymentDto,
    callback: () => void
  ) {
    try {
      const createBlessingAndPaymentDto = {
        ...createBlessingDto,
        ...createPaymentDto,
      };
      await (
        await axiosInstance.post(this.prefix, createBlessingAndPaymentDto)
      ).data;
      showSuccessMessage({
        title: "Thank you!",
        successString: "Your blessings was successfully sent",
        callback,
      });
    } catch (e) {}
  }
}

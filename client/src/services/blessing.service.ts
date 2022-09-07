import { ICreateBlessing } from "../types/blessing";
import { showSuccessMessage } from "../utils/success-message.util";
import axiosInstance from "./axios-instance";

export class BlessingService {
  static readonly prefix = "/blessing";

  public static async getByEvent(skip: number, take: number) {
    try {
      return await (await axiosInstance.get(`${this.prefix}?take=${take}&skip=${skip}`)).data;
    } catch (e) { }
  }
  public static async create(createBlessingDto: ICreateBlessing) {
    try {
      await (await axiosInstance.post(this.prefix, createBlessingDto)).data;
      showSuccessMessage({
        title: "Thank you!",
        successString: "Your blessings was successfully sent",
      });
    } catch (e) { }
  }
}

import { ICreateBlessing } from "../types/blessing";
import { showErrorMessage } from "../utils/error-message.util";
import axiosInstance from "./axios-instance";

export class BlessingService {
  static readonly prefix = "/blessing";

  public static async getByEvent(eventId: number) {
    try {
      return await (await axiosInstance.get(`${this.prefix}/${eventId}`)).data;
    } catch (e) {
      showErrorMessage({});
    }
  }
  public static async create(createBlessingDto: ICreateBlessing) {
    try {
      return await (await axiosInstance.post(this.prefix, createBlessingDto)).data;
    } catch (e) {
      showErrorMessage({ errorString: e as string });
    }
  }
}

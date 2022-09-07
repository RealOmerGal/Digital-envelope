import axiosInstance from "./axios-instance";
import { serverUrl } from "../config";

export class AuthService {
  static readonly prefix = "/auth";

  public static async getUser() {
    try {
      return await (
        await axiosInstance.get(`${this.prefix}/currentuser`)
      ).data;
    } catch (e) { }
  }
  public static login(): void {
    window.location.href = serverUrl + `${this.prefix}/google`;
  }
  public static async logout(): Promise<boolean> {
    try {
      await axiosInstance.post(`${this.prefix}/logout`);
      return true;
    } catch (e) {
      return false;
    }
  }
}

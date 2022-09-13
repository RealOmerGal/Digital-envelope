import axiosInstance from "./axios-instance";
import { serverUrl } from "../config";

export class AuthService {
  private static prefix = "/auth";

  public static async getUser() {
    return await (
      await axiosInstance.get(`${this.prefix}/currentuser`)
    ).data;
  }
  public static login(): void {
    window.location.href = serverUrl + `${this.prefix}/google`;
  }
  public static async logout(): Promise<void> {
    await axiosInstance.post(`${this.prefix}/logout`);
  }
}

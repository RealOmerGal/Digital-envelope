import axiosInstance from "./axios-instance";
import User from "../types/user";

export class UserService {
  private static prefix = "/user";

  public static async updateUser(data: Partial<User>) {
    try {
      return await (
        await axiosInstance.patch(this.prefix, data)
      ).data;
    } catch (e) {}
  }
}

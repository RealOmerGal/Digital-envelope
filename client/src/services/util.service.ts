import { showErrorMessage } from "../utils/error-message.util";
import axiosInstance from "./axios-instance";

export class UtilityService {
  public static async generateDashboard(eventId: number) {
    try {
      return await (
        await axiosInstance.get(`/dashboard/${eventId}`)
      ).data;
    } catch (e) {
      showErrorMessage({});
    }
  }
  public static generateQr(redirectUrl: string, eventName: string) {
    return `https://api.qrserver.com/v1/create-qr-code/?data=${redirectUrl}&amp;size=80x80/?eventName=${eventName}`;
  }
}

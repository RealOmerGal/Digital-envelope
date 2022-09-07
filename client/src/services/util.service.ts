import axiosInstance from "./axios-instance";

export class UtilityService {
  public static async generateDashboard() {
    try {
      return await (
        await axiosInstance.get('/dashboard/')
      ).data;
    } catch (e) { }
  }
  public static generateQr(redirectUrl: string, eventName: string) {
    return `https://api.qrserver.com/v1/create-qr-code/?data=${redirectUrl}&amp;size=80x80/?eventName=${eventName}`;
  }
}

import { CreateEventDto } from "../types/event";
import axiosInstance from "./axios-instance";
import Event from "../types/event";
import { showErrorMessage } from "../utils/error-message.util";

export class EventService {
  private static prefix = "/event";

  public static async getByUser(callback?: any) {
    try {
      return await (
        await axiosInstance.get(`${this.prefix}/user`)
      ).data;
    } catch (e) {
      showErrorMessage({ callback });
    }
  }
  public static async create(event: CreateEventDto) {
    return (await axiosInstance.post(this.prefix, event)).data;
  }

  public static async update(event: Event) {
    const { id, ...attrs } = { ...event };
    return (await axiosInstance.put(this.prefix, attrs)).data;
  }

  public static async delete(eventId: number) {
    return (await axiosInstance.delete(`${this.prefix}/${eventId}`)).data;
  }
  public static async store(event: Event): Promise<void> {
    return await axiosInstance.post(`${this.prefix}/store`, event);
  }

  public static async current() {
    return await (
      await axiosInstance.get(`${this.prefix}/current`)
    ).data;
  }
}

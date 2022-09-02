import { ICreateEvent } from "../types/event";
import axiosInstance from "./axios-instance";
import Event from "../types/event";
import { showErrorMessage } from "../utils";

export class EventService {
  static readonly prefix = "/event";

  public static async getById(id: number) {
    try {
      return await (
        await axiosInstance.get(`${this.prefix}/${id}`)
      ).data;
    } catch (e) {
      showErrorMessage({ errorString: "Could not load events" });
    }
  }

  public static async getByUser(callback?: any) {
    try {
      return await (
        await axiosInstance.get(`${this.prefix}/user`)
      ).data;
    } catch (e) {
      showErrorMessage({ callback });
    }
  }
  public static async create(event: ICreateEvent) {
    try {
      return (await axiosInstance.post(this.prefix, event)).data;
    } catch (e) {
      showErrorMessage({});
    }
  }

  public static async update(event: Event) {
    try {
      const { id, ...attrs } = { ...event };
      return (await axiosInstance.put(`${this.prefix}/${id}`, attrs)).data;
    } catch (e) {
      showErrorMessage({});
    }
  }

  public static async delete(eventId: number) {
    try {
      return (await axiosInstance.delete(`${this.prefix}/${eventId}`)).data;
    } catch (e) {
      showErrorMessage({});
    }
  }
  public static async reverseOpeningState(eventId: number, state: boolean) {
    try {
      return (
        await axiosInstance.put(`${this.prefix}/${eventId}`, {
          closed: state,
        })
      ).data;
    } catch (e) {
      showErrorMessage({});
    }
  }
}

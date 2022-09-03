import { ICreateEvent } from "../types/event";
import axiosInstance from "./axios-instance";
import Event from "../types/event";
import { showErrorMessage } from "../utils/error-message.util";

export class EventService {
  static readonly prefix = "/event";

  public static async getById(id: number) {
    try {
      return await (
        await axiosInstance.get(this.prefix)
      ).data;
    } catch (e) {
      showErrorMessage({ errorString: e + "" });
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
      showErrorMessage({ errorString: e + "" });
    }
  }

  public static async update(event: Event) {
    try {
      const { id, ...attrs } = { ...event };
      return (await axiosInstance.put(this.prefix, attrs)).data;
    } catch (e) {
      showErrorMessage({ errorString: e + "" });
    }
  }

  public static async delete(eventId: number) {
    try {
      return (await axiosInstance.delete(`${this.prefix}/${eventId}`)).data;
    } catch (e) {
      showErrorMessage({ errorString: e + "" });
    }
  }
  public static async reverseOpeningState(state: boolean) {
    try {
      return (
        await axiosInstance.put(this.prefix, {
          closed: state,
        })
      ).data;
    } catch (e) {
      showErrorMessage({ errorString: e + "" });
    }
  }

  public static async store(event: Event): Promise<void> {
    try {
      return await axiosInstance.post(`${this.prefix}/store`, event);
    }
    catch (e) {
      showErrorMessage({ errorString: e + "" })
    }
  }

  public static async current(callback?: () => void) {
    try {
      return await (await axiosInstance.get(`${this.prefix}/current`)).data
    } catch (e) {
      showErrorMessage({ callback })
    }
  }
}

import axios from "axios";
import { serverUrl } from "../config";
import { showErrorMessage } from "../utils";

const axiosInstance = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401 || 403) {
      showErrorMessage({
        errorString: "Your login session has expired, please log in again",
        callback: () => (window.location.href = `${serverUrl}/auth/google`),
      });
    } else if (error.response.status === 500) {
      showErrorMessage({ errorString: error });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

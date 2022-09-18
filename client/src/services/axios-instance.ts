import axios from "axios";
import { serverUrl } from "../config";
import { showErrorMessage } from "../utils/error-message.util";

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
    if (error.response.status === 403 || error.response.status === 401) {
      showErrorMessage({
        errorString: "Your login session has expired, please log in again",
        callback: () => (window.location.href = `${serverUrl}/auth/google`),
      });
    } else {
      showErrorMessage({ errorString: error.response.data.message });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

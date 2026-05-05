import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.swapnoborno.com/api",
  withCredentials: true,
});

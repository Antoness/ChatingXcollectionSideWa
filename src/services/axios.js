import axios from "axios";

export const axiosInstance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

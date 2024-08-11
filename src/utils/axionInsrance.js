import axios from "axios";
export const baseURL = "https://dummyjson.com";
export const axiosInstance = axios.create({ baseURL });

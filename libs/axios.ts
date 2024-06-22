import axios from "axios";
const BASE_URL = "http://192.168.1.176:5000" || process.env.NEXT_PUBLIC_URL_API ;  
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
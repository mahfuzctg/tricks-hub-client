import { Nexios } from "nexios-http";
import envConfig from "./envConfig";


const nexiosInstance = new Nexios({
  baseURL: envConfig.baseApi,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default nexiosInstance;

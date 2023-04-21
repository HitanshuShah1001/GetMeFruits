import axios, { AxiosInstance } from "axios";
import { Alert } from "react-native/";

export const axiosclient: AxiosInstance = axios.create({
  baseURL: `http://localhost:4000`,
});

axiosclient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Alert.alert(error.response.data.message);
    return Promise.reject(error);
  }
);

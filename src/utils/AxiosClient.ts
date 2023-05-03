import axios, { AxiosInstance } from "axios";
import { Alert } from "react-native/";

export const axiosclient: AxiosInstance = axios.create({
  baseURL: `https://fruitmanagement.herokuapp.com`,
});

axiosclient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Alert.alert(error?.response?.data?.error);

    return Promise.reject(error);
  }
);

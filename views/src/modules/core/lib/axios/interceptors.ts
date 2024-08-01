import {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosInstance,
} from "axios";
import { api } from "./index";

const onResponse = (response: AxiosResponse) => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onRequest = async (config: AxiosRequestConfig) => {
  const { headers } = config;

  return { ...config, headers: headers as AxiosRequestHeaders };
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
};

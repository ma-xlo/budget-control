import { AxiosResponse, AxiosError } from "axios";

type RawError = {
  message: string;
};

export type APIError = AxiosError<RawError>;

export type DefaultResponse<Data> = {
  data: Data;
};

export type PaginationResponse<Data> = {
  ct: number;
  data: Data;
};

export type FetcherResponse<Data> = Promise<AxiosResponse<Data>>;
export type RawResponse<Data> = DefaultResponse<Data>;
export type PaginationRawResponse<Data> = PaginationResponse<Data>;
export type APIResponse<Data> = FetcherResponse<RawResponse<Data>>;

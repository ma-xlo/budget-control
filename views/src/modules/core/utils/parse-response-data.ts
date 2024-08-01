import { AxiosResponse } from "axios";
import { RawResponse } from "@core/entities/response";
export default function parseResponseData<T>(
  response: AxiosResponse<RawResponse<T>> | AxiosResponse<T> | any
): T {
  if (
    typeof response.data === `object` &&
    `data` in response.data &&
    !response.data?.[`ct`]
  ) {
    return response.data.data;
  }
  return response.data;
}

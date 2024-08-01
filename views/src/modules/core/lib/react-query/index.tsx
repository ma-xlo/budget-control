import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryKey,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Props } from "./types";
import { api } from "../axios";
import { RawResponse } from "@entities/response";
import { queryKeyToUrl } from "@core/utils/helpers";
import parseResponseData from "@core/utils/parse-response-data";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 30 * 1000,
    },
  },
});

export async function defaultQueryFn<T>({ queryKey }: { queryKey: QueryKey }) {
  const url = queryKeyToUrl(queryKey);
  const response = await api.get<RawResponse<T>>(url);

  return parseResponseData<T>(response);
}

export const ReactQueryProvider = ({ children }: Props) => {
  const [qc] = useState(() => queryClient);
  return (
    <QueryClientProvider client={qc}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export const useGetCachedQueryData = (key: string | number) => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData([key]);
  return data;
};

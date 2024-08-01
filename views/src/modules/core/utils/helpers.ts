import { QueryKey } from "@tanstack/react-query";

export const queryKeyToUrl = (queryKey: QueryKey): string => {
  if (!Array.isArray(queryKey)) {
    throw new Error("queryKey deve ser um array");
  }

  const pathParts: string[] = [];
  const queryParams: string[] = [];

  queryKey.forEach((key) => {
    if (typeof key === "string" && key.includes("=")) {
      // É uma query string, adicionar ao array de queryParams
      queryParams.push(key);
    } else {
      // Não é uma query string, adicionar ao array de pathParts
      pathParts.push(encodeURIComponent(key.toString()));
    }
  });

  const path = pathParts.join("/");
  const query = queryParams.join("&");

  return query ? `/${path}/?${query}` : `/${path}/`;
};

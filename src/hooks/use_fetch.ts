import { useEffect, useState } from "react";
import { API_BASE_URL } from "@constants/api";

type FetchOptions = {
  endpoint: string;
  limit?: number;
  page?: number;
  fields?: string;
  ids?: string[];
  q?: string;
};

export const useFetch = <T>({
  endpoint,
  limit,
  page,
  fields,
  ids,
  q,
}: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<(Error & { status?: number }) | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = new URL(`${API_BASE_URL}/${endpoint}`);

        if (q) url.searchParams.append("q", q);
        if (ids) url.searchParams.append("ids", ids.join(","));
        if (page) url.searchParams.append("page", page.toString());
        if (limit) url.searchParams.append("limit", limit.toString());
        if (fields) url.searchParams.append("fields", fields);

        const response = await fetch(url.toString());

        if (!response.ok) {
          const responseError = new Error(
            `HTTP error! status: ${response.statusText}`,
          ) as Error & { status?: number };

          responseError.status = response.status;
          throw responseError;
        }

        const result = await response.json();

        setError(null);
        setData(result.data);
      } catch (err) {
        setError(err as Error & { status?: number });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, limit, page, fields, ids, q]);

  return { data, isLoading, error };
};

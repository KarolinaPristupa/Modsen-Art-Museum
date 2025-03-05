import { useEffect, useState } from "react";
import { API_BASE_URL } from "@constants/api";

type RandomOptions = {
  endpoint: string;
  limit?: number;
  page?: number;
  fields?: string;
  ids?: string[];
  q?: string;
  randomize?: number;
  width?: number;
  height?: number;
};

export const useRandom = <T>({
  endpoint,
  limit,
  page,
  fields,
  ids,
  q,
  randomize,
}: RandomOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<(Error & { status?: number }) | null>(
    null,
  );

  useEffect(() => {
    const controller = new AbortController();

    const randomData = async () => {
      setIsLoading(true);
      try {
        const url = new URL(`${API_BASE_URL}/${endpoint}`);

        url.searchParams.append("_", `${Date.now()}_${Math.random()}`);
        if (randomize) {
          url.searchParams.append("size", "9");
          url.searchParams.append(
            "page",
            String(Math.floor(Math.random() * 100) + 1),
          );
        }
        if (q) url.searchParams.append("q", q);
        if (ids) url.searchParams.append("ids", ids.join(","));
        if (page) url.searchParams.append("page", page.toString());
        if (limit) url.searchParams.append("limit", limit.toString());
        if (fields) url.searchParams.append("fields", fields);

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        setData(result.data);
        setError(null);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err as Error & { status?: number });
        }
      } finally {
        setIsLoading(false);
      }
    };

    randomData();
    return () => controller.abort();
  }, [endpoint, limit, page, fields, ids, q, randomize]);

  return { data, isLoading, error };
};

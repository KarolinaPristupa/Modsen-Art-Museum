import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "@hooks/use_fetch";
import { API_BASE_URL } from "@constants/api";

global.fetch = jest.fn();

describe("useFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = { data: [{ id: 1, name: "Test Item" }] };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() =>
      useFetch<{ id: number; name: string }[]>({
        endpoint: "items",
      }),
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData.data);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/items`);
  });

  it("handles API error response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const { result } = renderHook(() => useFetch({ endpoint: "items" }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.status).toBe(404);
  });

  it("handles network error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useFetch({ endpoint: "items" }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error?.message).toBe("Network Error");
  });
});

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type ApiError = AxiosError<{ message: string }>;

export function useApiQuery<T>(
  key: string[],
  fn: () => Promise<{ data: T }>,
  options?: { enabled?: boolean },
) {
  return useQuery<T, ApiError>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await fn();
      return data;
    },
    ...options,
  });
}

export function useApiMutation<T, V>(
  fn: (vars: V) => Promise<{ data: T }>,
  options?: {
    onSuccess?: (data: T) => void;
    invalidateKeys?: string[][];
  },
) {
  const queryClient = useQueryClient();

  return useMutation<T, ApiError, V>({
    mutationFn: async (vars) => {
      const { data } = await fn(vars);
      return data;
    },
    onSuccess: (data) => {
      options?.invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      options?.onSuccess?.(data);
    },
  });
}

import { useMemo } from "react";
import type { UIState, UIStatesProps } from "../types";

interface UIStateResult {
  readonly state: UIState;
  readonly error: unknown;
  readonly retry?: () => void;
}

function isEmptyData(data: unknown, emptyCheck?: (data: unknown) => boolean): boolean {
  if (emptyCheck) return emptyCheck(data);
  if (data === null || data === undefined) return true;
  if (Array.isArray(data) && data.length === 0) return true;
  return false;
}

export function useUIState(props: UIStatesProps): UIStateResult {
  const { data, loading, error, query, emptyCheck } = props;

  return useMemo(() => {
    if (query) {
      const isLoading = query.isLoading ?? query.isPending ?? false;
      if (isLoading) {
        return { state: "loading" as const, error: null };
      }
      if (query.isError) {
        return { state: "error" as const, error: query.error, retry: query.refetch };
      }
      if (isEmptyData(query.data, emptyCheck)) {
        return { state: "empty" as const, error: null };
      }
      return { state: "success" as const, error: null };
    }

    if (loading) {
      return { state: "loading" as const, error: null };
    }
    if (error) {
      return { state: "error" as const, error };
    }
    if (isEmptyData(data, emptyCheck)) {
      return { state: "empty" as const, error: null };
    }
    return { state: "success" as const, error: null };
  }, [data, loading, error, query, emptyCheck]);
}

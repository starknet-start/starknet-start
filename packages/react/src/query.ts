import {
  type InfiniteData,
  type QueryKey,
  type UseInfiniteQueryOptions as UseInfiniteQueryOptions_,
  type UseInfiniteQueryResult as UseInfiniteQueryResult_,
  type UseMutationOptions as UseMutationOptions_,
  type UseMutationResult as UseMutationResult_,
  type UseQueryOptions as UseQueryOptions_,
  type UseQueryResult as UseQueryResult_,
  useInfiniteQuery as useInfiniteQuery_,
  useMutation as useMutation_,
  useQuery as useQuery_,
} from "@tanstack/react-query";

export type UseQueryProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Pick<
  UseQueryOptions_<TQueryFnData, TError, TData, TQueryKey>,
  "enabled" | "refetchInterval" | "retry" | "retryDelay"
>;

export type UseQueryResult<TData, TError> = Pick<
  UseQueryResult_<TData, TError>,
  | "data"
  | "error"
  | "status"
  | "isSuccess"
  | "isError"
  | "isPending"
  | "fetchStatus"
  | "isFetching"
  | "isLoading"
  | "refetch"
>;

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  args: UseQueryOptions_<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  const base = useQuery_({ ...args, structuralSharing: false });

  return {
    data: base.data,
    error: base.error,
    status: base.status,
    isSuccess: base.isSuccess,
    isError: base.isError,
    isPending: base.isPending,
    fetchStatus: base.fetchStatus,
    isFetching: base.isFetching,
    isLoading: base.isLoading,
    refetch: base.refetch,
  };
}
export type UseMutationProps<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = Pick<
  UseMutationOptions_<TData, TError, TVariables, TContext>,
  "onSuccess" | "onError" | "onMutate" | "onSettled"
>;

export type UseMutationResult<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = Pick<
  UseMutationResult_<TData, TError, TVariables, TContext>,
  | "data"
  | "error"
  | "isError"
  | "isIdle"
  | "isPending"
  | "isPaused"
  | "isSuccess"
  | "reset"
  | "mutate"
  | "mutateAsync"
  | "status"
  | "variables"
>;

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  args: UseMutationOptions_<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const base = useMutation_(args);

  return {
    data: base.data,
    error: base.error,
    reset: base.reset,
    isError: base.isError,
    isIdle: base.isIdle,
    isPending: base.isPending,
    isSuccess: base.isSuccess,
    isPaused: base.isPaused,
    mutate: base.mutate,
    mutateAsync: base.mutateAsync,
    status: base.status,
    variables: base.variables,
  };
}

export type UseInfiniteQueryProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  _TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = Pick<
  UseInfiniteQueryOptions_<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
  "enabled" | "refetchInterval" | "retry" | "retryDelay"
>;

export type UseInfiniteQueryResult<TData, TPageParam, TError> = Pick<
  UseInfiniteQueryResult_<InfiniteData<TData, TPageParam>, TError>,
  | "data"
  | "error"
  | "status"
  | "isSuccess"
  | "isError"
  | "isPending"
  | "fetchStatus"
  | "isFetching"
  | "isLoading"
  | "refetch"
  | "fetchNextPage"
  | "fetchPreviousPage"
  | "hasNextPage"
  | "hasPreviousPage"
  | "isFetchingNextPage"
  | "isFetchingPreviousPage"
>;

export function useInfiniteQuery<
  TQueryFnData,
  TError = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  args: UseInfiniteQueryOptions_<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >,
) {
  const base = useInfiniteQuery_({ ...args, structuralSharing: false });

  return {
    data: base.data,
    error: base.error,
    status: base.status,
    isSuccess: base.isSuccess,
    isError: base.isError,
    isPending: base.isPending,
    fetchStatus: base.fetchStatus,
    isFetching: base.isFetching,
    isLoading: base.isLoading,
    refetch: base.refetch,
    fetchNextPage: base.fetchNextPage,
    fetchPreviousPage: base.fetchPreviousPage,
    hasNextPage: base.hasNextPage,
    hasPreviousPage: base.hasPreviousPage,
    isFetchingNextPage: base.isFetchingNextPage,
    isFetchingPreviousPage: base.isFetchingPreviousPage,
  };
}

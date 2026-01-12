import type { Events } from "@starknet-io/types-js";
import {
  type EventsQueryKeyParams,
  eventsQueryFn,
  eventsQueryKey,
} from "@starknet-start/query";
import type { RpcProvider } from "starknet";
import {
  type UseInfiniteQueryProps,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from "../query";
import { useProvider } from "./use-provider";

/** Arguments for `useEvents`. */
export type UseEventsProps = UseInfiniteQueryProps<
  Events,
  Error,
  Events,
  Events,
  ReturnType<typeof eventsQueryKey>,
  string
> &
  EventsQueryKeyParams;

/** Value returned from `useEvents`. */
export type UseEventsResult = Omit<
  UseInfiniteQueryResult<Events, string, Error>,
  "fetchPreviousPage" | "isFetchingPreviousPage" | "hasPreviousPage"
>;

/**
 * Hook to fetch events continuously
 *
 * The parameters could be used to filter the events by contract address, name
 * or specify a range of blocks to get the events from
 *
 * The returned object contain different functions and props to fetch next pages
 */
export function useEvents({
  address,
  eventName,
  fromBlock: fromBlock_,
  toBlock: toBlock_,
  pageSize,
}: UseEventsProps): UseEventsResult {
  const { provider } = useProvider();
  const rpcProvider = provider as RpcProvider;

  return useInfiniteQuery({
    // TODO: useMemo ?
    queryKey: eventsQueryKey({
      address,
      eventName,
      fromBlock: fromBlock_,
      toBlock: toBlock_,
      pageSize,
    }),
    queryFn: eventsQueryFn({
      provider: rpcProvider,
      address,
      eventName,
      fromBlock: fromBlock_,
      toBlock: toBlock_,
      pageSize,
    }),
    initialPageParam: "0",
    getNextPageParam: (lastPage, _pages) => lastPage.continuation_token,
  });
}

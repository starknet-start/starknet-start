import { blockNumberQueryFn, blockNumberQueryKey } from "@starknet-start/query";
import { type BlockNumber, BlockTag } from "starknet";

import { useStarknet } from "../context/starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";

/** Arguments for `useBlockNumber`. */
export type UseBlockNumberProps = UseQueryProps<
  number | undefined,
  Error,
  number,
  ReturnType<typeof blockNumberQueryKey>
> & {
  /** Identifier for the block to fetch. */
  blockIdentifier?: BlockNumber;
};

/** Value returned from `useBlockNumber`. */
export type UseBlockNumberResult = UseQueryResult<number | undefined, Error>;

/**
 * Hook for fetching the current block number.
 *
 * @remarks
 *
 * Control if and how often data is refreshed with `refetchInterval`.
 */
export function useBlockNumber({
  blockIdentifier = BlockTag.LATEST,
  ...props
}: UseBlockNumberProps = {}): UseBlockNumberResult {
  const { provider } = useStarknet();

  return useQuery({
    queryKey: blockNumberQueryKey({ blockIdentifier }),
    queryFn: blockNumberQueryFn({ provider, blockIdentifier }),
    ...props,
  });
}

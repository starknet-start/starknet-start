import { blockQueryFn, blockQueryKey } from "@starknet-start/query";
import { type BlockNumber, BlockTag, type GetBlockResponse } from "starknet";

import { useStarknet } from "../context/starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";

/** Arguments for `useBlock`. */
export type UseBlockProps = UseQueryProps<
  GetBlockResponse,
  Error,
  GetBlockResponse,
  ReturnType<typeof blockQueryKey>
> & {
  /** Identifier for the block to fetch. */
  blockIdentifier?: BlockNumber;
};

/** Value returned from `useBlock`. */
export type UseBlockResult = UseQueryResult<GetBlockResponse, Error>;

/**
 * Hook for fetching a block.
 *
 * @remarks
 *
 * Specify which block to fetch with the `blockIdentifier` argument.
 * Control if and how often data is refreshed with `refetchInterval`.
 */
export function useBlock({
  blockIdentifier = BlockTag.LATEST,
  ...props
}: UseBlockProps = {}): UseBlockResult {
  const { provider } = useStarknet();
  return useQuery({
    queryKey: blockQueryKey({ blockIdentifier }),
    queryFn: blockQueryFn({ provider, blockIdentifier }),
    ...props,
  });
}

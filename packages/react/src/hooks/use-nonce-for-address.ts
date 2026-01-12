import type { Address } from "@starknet-start/chains";
import {
  nonceForAddressQueryFn,
  nonceForAddressQueryKey,
} from "@starknet-start/query";
import { type BlockNumber, BlockTag, type Nonce } from "starknet";
import { useStarknet } from "../context/starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";

/** Arguments for `useNonceForAddress`. */
export type UseNonceForAddressProps = UseQueryProps<
  Nonce,
  Error,
  Nonce,
  ReturnType<typeof nonceForAddressQueryKey>
> & {
  /** Address to fetch nonce for. */
  address?: Address;
  /** Identifier for the block to fetch. */
  blockIdentifier?: BlockNumber;
};

/** Value returned from `useNonceForAddress`. */
export type UseNonceForAddressResult = UseQueryResult<Nonce, Error>;

/**
 * Hook for fetching the nonce for the given address.
 */
export function useNonceForAddress({
  address,
  blockIdentifier = BlockTag.LATEST,
  ...props
}: UseNonceForAddressProps): UseNonceForAddressResult {
  const { provider } = useStarknet();

  return useQuery({
    queryKey: nonceForAddressQueryKey({ address, blockIdentifier }),
    queryFn: nonceForAddressQueryFn({
      address,
      provider,
      blockIdentifier,
    }),
    enabled: props.enabled ?? !!address,
    ...props,
  });
}

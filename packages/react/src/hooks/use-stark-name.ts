import type { Address } from "@starknet-start/chains";
import { starkNameQueryFn, starkNameQueryKey } from "@starknet-start/query";
import { useMemo } from "react";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";
import { useNetwork } from "./use-network";
import { useProvider } from "./use-provider";

/** Arguments for `useStarkName` hook. */
export type StarkNameArgs = UseQueryProps<
  string,
  Error,
  string,
  ReturnType<typeof starkNameQueryKey>
> & {
  /** Account address. */
  address?: Address;
  /** Naming contract to use . */
  contract?: Address;
};

/** Value returned by `useStarkName` hook. */
export type StarkNameResult = UseQueryResult<string, Error>;

/**
 * Hook for fetching Stark name for address.
 *
 * @remarks
 *
 * This hook fetches the stark name of the specified address.
 * It defaults to the starknet.id contract but a different contract can be
 * targetted by specifying its contract address
 * If address does not have a stark name, it will return "stark"
 */
export function useStarkName({
  address,
  contract,
  enabled: enabled_ = true,
  ...props
}: StarkNameArgs): StarkNameResult {
  const { provider } = useProvider();
  const { chain } = useNetwork();

  const enabled = useMemo(
    () => Boolean(enabled_ && address),
    [enabled_, address],
  );

  return useQuery({
    queryKey: starkNameQueryKey({
      address,
      contract,
      network: chain.network,
    }),
    queryFn: starkNameQueryFn({
      address,
      contract,
      provider,
      network: chain.network,
    }),
    enabled,
    ...props,
  });
}

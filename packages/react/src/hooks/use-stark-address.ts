import type { Address } from "@starknet-start/chains";
import {
  starkAddressQueryFn,
  starkAddressQueryKey,
} from "@starknet-start/query";
import { useMemo } from "react";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";
import { useNetwork } from "./use-network";
import { useProvider } from "./use-provider";

export type UseStarkAddressProps = UseQueryProps<
  Address,
  Error,
  Address,
  ReturnType<typeof starkAddressQueryKey>
> & {
  /** Stark name. */
  name?: string;
  /** Naming contract to use . */
  contract?: Address;
};

export type UseStarkAddressResult = UseQueryResult<Address, Error>;

/**
 * Hook to get the address associated to a stark name.
 *
 * @remarks
 *
 * This hook fetches the address of the specified stark name
 * It defaults to the starknetID contract but a different contract can be targetted by specifying its address
 * If stark name does not have an associated address, it will return "0x0"
 *
 */
export function useStarkAddress({
  name,
  contract,
  enabled: enabled_ = true,
  ...props
}: UseStarkAddressProps): UseStarkAddressResult {
  const { provider } = useProvider();
  const { chain } = useNetwork();

  const enabled = useMemo(() => Boolean(enabled_ && name), [enabled_, name]);

  return useQuery({
    queryKey: starkAddressQueryKey({ name, contract, network: chain.network }),
    queryFn: starkAddressQueryFn({
      name,
      contract,
      provider,
      network: chain.network,
    }),
    enabled,
    ...props,
  });
}

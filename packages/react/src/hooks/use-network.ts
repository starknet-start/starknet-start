import type { Chain } from "@starknet-start/chains";

import { useStarknet } from "../context/starknet";

/** Value returned from `useNetwork`. */
export type UseNetworkResult = {
  /** The current chain. */
  chain: Chain;
  /** List of supported chains. */
  chains: Chain[];
};

/**
 * Hook for accessing the current connected chain.
 *
 * @remarks
 *
 * The network object contains information about the
 * network.
 *
 */
export function useNetwork(): UseNetworkResult {
  const { chain, chains } = useStarknet();
  return { chain, chains };
}

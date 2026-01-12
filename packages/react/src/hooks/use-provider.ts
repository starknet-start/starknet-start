import type { PaymasterInterface, ProviderInterface } from "starknet";

import { useStarknet } from "../context/starknet";

/** Value returned from `useProvider`. */
export interface UseProviderResult {
  /** The current provider. */
  provider: ProviderInterface;
  /** The current paymaster provider. */
  paymasterProvider?: PaymasterInterface;
}

/**
 * Hook for accessing the current provider.
 *
 * @remarks
 *
 * Use this hook to access the current provider object
 * implementing starknet.js `ProviderInterface`.
 */
export function useProvider(): UseProviderResult {
  const { provider, paymasterProvider } = useStarknet();
  return { provider, paymasterProvider };
}

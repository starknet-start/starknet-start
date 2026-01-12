import type { PaymasterInterface, ProviderInterface } from "starknet";

import { useStarknet } from "../context/starknet";

export interface UseProviderResult {
  provider: ProviderInterface;
  paymasterProvider?: PaymasterInterface;
}

export function useProvider(): UseProviderResult {
  const { provider, paymasterProvider } = useStarknet();
  return { provider, paymasterProvider };
}

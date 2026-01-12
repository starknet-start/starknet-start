import type {
  StarknetTypedContract,
  UseContractArgs,
  UseContractResult,
} from "@starknet-start/query";
import type { Abi } from "abi-wan-kanabi";
import { useMemo } from "react";
import { Contract } from "starknet";
import { useStarknet } from "../context/starknet";

/**
 * Hook to bind a `Contract` instance.
 *
 * @remarks
 *
 * - The returned contract is a starknet.js `Contract` object.
 * - Must pass `abi` as const for strict type safety
 *
 */
export function useContract<TAbi extends Abi>({
  abi,
  address,
  provider: providedProvider,
}: UseContractArgs<TAbi>): UseContractResult<TAbi> {
  const { provider: currentProvider } = useStarknet();

  const contract = useMemo(() => {
    const provider = providedProvider ? providedProvider : currentProvider;
    if (abi && address && provider) {
      return new Contract({
        abi,
        address,
        providerOrAccount: provider,
      }).typedv2(abi) as StarknetTypedContract<TAbi>;
    }
    return undefined;
  }, [abi, address, providedProvider, currentProvider]);

  return { contract };
}

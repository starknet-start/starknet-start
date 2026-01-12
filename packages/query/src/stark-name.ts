import type { Address } from "@starknet-start/chains";
import { Provider, type ProviderInterface } from "starknet";

export type StarkNameQueryKeyParams = {
  address?: string;
  contract?: string;
  network?: string;
};

export type StarkNameQueryFnParams = StarkNameQueryKeyParams & {
  provider: ProviderInterface;
};

const StarknetIdNamingContract: Record<string, string> = {
  sepolia: "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474",
  mainnet: "0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678",
};

export function starkNameQueryKey({
  address,
  contract,
  network,
}: StarkNameQueryKeyParams) {
  return [
    {
      entity: "starkName" as const,
      address,
      contract,
      network,
    },
  ] as const;
}

export function starkNameQueryFn({
  address,
  contract,
  provider,
  network,
}: StarkNameQueryFnParams) {
  return async (): Promise<string> => {
    if (!address) throw new Error("address is required");
    if (!network) throw new Error("network is required");

    const namingContract = contract ?? StarknetIdNamingContract[network];
    const p = new Provider(provider);
    return await p.getStarkName(address as Address, namingContract);
  };
}

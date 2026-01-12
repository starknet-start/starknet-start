import type { Address } from "@starknet-start/chains";
import {
  CallData,
  Provider,
  type ProviderInterface,
  starknetId,
} from "starknet";

export type StarkAddressQueryKeyParams = {
  name?: string;
  contract?: string;
  network?: string;
};

export type StarkAddressQueryFnParams = StarkAddressQueryKeyParams & {
  provider: ProviderInterface;
};

const StarknetIdNamingContract: Record<string, string> = {
  sepolia: "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474",
  mainnet: "0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678",
};

export function starkAddressQueryKey({
  name,
  contract,
  network,
}: StarkAddressQueryKeyParams) {
  return [
    {
      entity: "addressFromStarkName" as const,
      name,
      contract,
      network,
    },
  ] as const;
}

export function starkAddressQueryFn({
  name,
  contract,
  provider,
  network,
}: StarkAddressQueryFnParams) {
  return async (): Promise<Address> => {
    if (!name) throw new Error("name is required");
    if (!network) throw new Error("network is required");

    const namingContract = contract ?? StarknetIdNamingContract[network];
    const p = new Provider(provider);
    const encodedDomain = encodeDomain(name);
    const result = await p.callContract({
      contractAddress: namingContract as string,
      entrypoint: "domain_to_address",
      calldata: CallData.compile({ domain: encodedDomain, hint: [] }),
    });

    if (BigInt(result[0]) === BigInt(0)) throw new Error("Address not found");

    return result[0] as Address;
  };
}

const encodeDomain = (domain: string): string[] => {
  if (!domain) return ["0"];

  const encoded = [];
  for (const subdomain of domain.replace(".stark", "").split(".")) {
    encoded.push(starknetId.useEncoded(subdomain).toString(10));
  }
  return encoded;
};

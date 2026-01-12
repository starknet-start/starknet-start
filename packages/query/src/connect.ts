import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";

export type ConnectVariables = { connector?: WalletWithStarknetFeatures };

export function connectMutationKey({ chainId }: { chainId: string }) {
  return [{ entity: "connect", chainId }] as const;
}

export function connectMutationFn({
  connect,
}: {
  connect: (args: ConnectVariables) => Promise<void> | void;
}) {
  return async (variables?: ConnectVariables) => {
    return await connect(variables ?? {});
  };
}

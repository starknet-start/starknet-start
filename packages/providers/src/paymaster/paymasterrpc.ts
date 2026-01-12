import type { Chain } from "@starknet-start/chains";
import { PaymasterRpc, type RpcProviderOptions } from "starknet";

import type { ChainPaymasterFactory } from "./factory";

/** Arguments for `jsonRpcProvider`. */
export type PaymasterRpcProviderArgs = {
  rpc: (chain: Chain) => RpcProviderOptions | null;
};

/** Configure the JSON-RPC provider using the provided function. */
export function paymasterRpcProvider({
  rpc,
}: PaymasterRpcProviderArgs): ChainPaymasterFactory<PaymasterRpc> {
  return (chain) => {
    const config = rpc(chain);
    if (!config) return null;

    const provider = new PaymasterRpc(config);
    return provider;
  };
}

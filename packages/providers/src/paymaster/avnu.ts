import type { PaymasterRpc } from "starknet";
import type { ChainPaymasterFactory } from "./factory";
import { paymasterRpcProvider } from "./paymasterrpc";

/** Arguments for `avnuPaymasterProvider`. */
export type AvnuPaymasterProviderArgs = {
  /** Avnu API key. */
  apiKey?: string;
};

/** Configure the Avnu paymaster provider using the provided API key. */
export function avnuPaymasterProvider({
  apiKey,
}: AvnuPaymasterProviderArgs): ChainPaymasterFactory<PaymasterRpc> {
  return paymasterRpcProvider({
    rpc: (chain) => {
      const baseHttpUrl = chain.paymasterRpcUrls.avnu.http[0];
      if (!baseHttpUrl) return null;
      return {
        nodeUrl: baseHttpUrl,
        headers: { "x-paymaster-api-key": apiKey ?? "" },
      };
    },
  });
}

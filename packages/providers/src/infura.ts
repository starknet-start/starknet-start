import { jsonRpcProvider } from "./jsonrpc";

/** Arguments for `infuraProvider`. */
export type InfuraProviderArgs = {
  /** Infura API key. */
  apiKey: string;
};

/** Configure the Infura provider using the provided API key. */
export function infuraProvider({ apiKey }: InfuraProviderArgs) {
  return jsonRpcProvider({
    rpc: (chain) => {
      const baseHttpUrl = chain.rpcUrls["infura"]?.http[0];
      if (!baseHttpUrl) return null;
      const nodeUrl = `${baseHttpUrl}/${apiKey}`;
      return { nodeUrl };
    },
  });
}

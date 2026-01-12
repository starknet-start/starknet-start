import { jsonRpcProvider } from "./jsonrpc";

/** Arguments for `alchemyProvider`. */
export type AlchemyProviderArgs = {
  /** Alchemy API key. */
  apiKey: string;
};

/** Configure the Alchemy provider using the provided API key. */
export function alchemyProvider({ apiKey }: AlchemyProviderArgs) {
  return jsonRpcProvider({
    rpc: (chain) => {
      const baseHttpUrl = chain.rpcUrls["alchemy"]?.http[0];
      if (!baseHttpUrl) return null;
      const nodeUrl = `${baseHttpUrl}/${apiKey}`;
      return { nodeUrl };
    },
  });
}

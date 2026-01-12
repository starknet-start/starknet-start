import { jsonRpcProvider } from "./jsonrpc";

/** Arguments for `blastProvider`. */
export type BlastProviderArgs = {
  /** Blast API key. */
  apiKey: string;
};

/** Configure the Blast provider using the provided API key. */
export function blastProvider({ apiKey }: BlastProviderArgs) {
  return jsonRpcProvider({
    rpc: (chain) => {
      const baseHttpUrl = chain.rpcUrls["blast"]?.http[0];
      if (!baseHttpUrl) return null;
      const nodeUrl = `${baseHttpUrl}/${apiKey}`;
      return { nodeUrl };
    },
  });
}

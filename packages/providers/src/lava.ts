import { jsonRpcProvider } from "./jsonrpc";

/** Arguments for `lavaProvider`. */
export type LavaProviderArgs = {
  /** Lava API key. */
  apiKey: string;
};

/** Configure the Lava provider using the provided API key. */
export function lavaProvider({ apiKey }: LavaProviderArgs) {
  return jsonRpcProvider({
    rpc: (chain) => {
      const baseHttpUrl = chain.rpcUrls["lava"]?.http[0];
      if (!baseHttpUrl) return null;
      const nodeUrl = `${baseHttpUrl}/${apiKey}`;
      return { nodeUrl };
    },
  });
}

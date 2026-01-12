import { jsonRpcProvider } from "./jsonrpc";

/** Configure the Cartridge provider. */
export function cartridgeProvider() {
  return jsonRpcProvider({
    rpc: (chain) => {
      const nodeUrl = chain.rpcUrls["cartridge"]?.http[0];
      if (!nodeUrl) return null;
      return { nodeUrl };
    },
  });
}

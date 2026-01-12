import { jsonRpcProvider } from "./jsonrpc";

/** Configure the provider to use the public RPC endpoint. */
export function publicProvider() {
  return jsonRpcProvider({
    rpc: (chain) => {
      // Pick random node from the list of public nodes.
      const rpcs = chain.rpcUrls.public.http;
      const nodeUrl = rpcs[Math.floor(Math.random() * rpcs.length)];
      if (!nodeUrl) return null;
      return { nodeUrl, specVersion: "0.10.0" };
    },
  });
}

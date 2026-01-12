import { getSlotChain } from "@starknet-start/chains";
import { jsonRpcProvider } from "./jsonrpc";

/** Arguments for `slotProvider`. */
export type SlotProviderArgs = {
  /** The name of your slot instance. */
  projectId: string;
};

/** Configure the Slot provider using the provided Project ID. */
export function slotProvider({ projectId }: SlotProviderArgs) {
  return jsonRpcProvider({
    rpc: () => {
      const chain = getSlotChain(projectId);
      const nodeUrl = chain.rpcUrls.public.http[0];
      return { nodeUrl };
    },
  });
}

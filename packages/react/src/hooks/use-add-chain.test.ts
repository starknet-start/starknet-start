import { shortString } from "starknet";
import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { type UseAddChainArgs, useAddChain } from "./use-add-chain";
import { useConnect } from "./use-connect";
import { useDisconnect } from "./use-disconnect";

// Reference: https://github.com/PhilippeR26/Starknet-WalletAccount/blob/main/doc/walletAPIspec.md#example--3
const chainData: UseAddChainArgs = {
  id: "ZORG",
  chain_id: shortString.encodeShortString("ZORG"),
  chain_name: "ZORG",
  rpc_urls: ["http://192.168.1.44:6060"],
  native_currency: {
    type: "ERC20",
    options: {
      address:
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      name: "ETHER",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

function useAddChainWithConnect() {
  return {
    addChain: useAddChain({ params: chainData }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useAddChain", () => {
  it("adds a new chain to the connector", async () => {
    const { result } = renderHook(() => useAddChainWithConnect());

    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });

    await act(async () => {
      result.current.addChain.addChain();
    });

    await waitFor(() => {
      expect(result.current.addChain.isSuccess).toBeTruthy();
    });
  });

  it("throws error if user doesn't approve the new chain", async () => {
    const { result } = renderHook(() => useAddChainWithConnect(), {
      connectorOptions: { rejectRequest: true },
    });
    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });
    await act(async () => {
      result.current.addChain.addChain();
    });
    await waitFor(() => {
      expect(result.current.addChain.isError).toBeTruthy();
    });
  });
});

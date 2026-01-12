import { constants } from "starknet";
import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { useConnect } from "./use-connect";
import { useDisconnect } from "./use-disconnect";
import { useSwitchChain } from "./use-switch-chain";

function useSwitchChainWithConnect() {
  return {
    switchChain: useSwitchChain({
      params: { chainId: constants.StarknetChainId.SN_MAIN },
    }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useSwitchChain", () => {
  it("switch chain to mainnet", async () => {
    const { result } = renderHook(() => useSwitchChainWithConnect());

    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });

    await act(async () => {
      result.current.switchChain.switchChain();
    });

    await waitFor(() => {
      expect(result.current.switchChain.isSuccess).toBeTruthy();
    });
  });

  it("throws error if user cancels to switch to mainnet", async () => {
    const { result } = renderHook(() => useSwitchChainWithConnect(), {
      connectorOptions: { rejectRequest: true },
    });
    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });
    await act(async () => {
      result.current.switchChain.switchChain();
    });
    await waitFor(() => {
      expect(result.current.switchChain.isError).toBeTruthy();
    });
  });
});

import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { useConnect } from "./use-connect";
import { useDisconnect } from "./use-disconnect";
import { useWalletRequest } from "./use-wallet-request";

function useWalletRequestWithConnect() {
  return {
    walletRequest: useWalletRequest({ type: "wallet_getPermissions" }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useWalletRequest", () => {
  it("get permissions when connector is connected", async () => {
    const { result } = renderHook(() => useWalletRequestWithConnect());

    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });

    await act(async () => {
      result.current.walletRequest.request();
    });

    await waitFor(() => {
      expect(result.current.walletRequest.data).toHaveLength(1);
    });
  });

  it("throw error if connector is not connected", async () => {
    const { result } = renderHook(() => useWalletRequestWithConnect());

    await act(async () => {
      result.current.walletRequest.request();
    });

    await waitFor(() => {
      expect(result.current.walletRequest.isError).toBeTruthy();
    });
  });
});

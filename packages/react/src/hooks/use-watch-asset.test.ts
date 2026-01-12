import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { useConnect } from "./use-connect";
import { useDisconnect } from "./use-disconnect";
import { type UseWatchAssetArgs, useWatchAsset } from "./use-watch-asset";

const addrxASTR =
  "0x005EF67D8c38B82ba699F206Bf0dB59f1828087A710Bad48Cc4d51A2B0dA4C29";
const myAsset: UseWatchAssetArgs = {
  type: "ERC20",
  options: {
    address: addrxASTR,
    name: "ETHER",
    symbol: "ETH",
    decimals: 18,
  },
};

function useWatchAssetWithConnect() {
  return {
    watchAsset: useWatchAsset({ params: myAsset }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useWatchAsset", () => {
  it("add a token to the connected wallet", async () => {
    const { result } = renderHook(() => useWatchAssetWithConnect());

    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });
    await act(async () => {
      result.current.watchAsset.watchAsset();
    });

    await waitFor(() => {
      expect(result.current.watchAsset.isSuccess).toBeTruthy();
    });
  });

  it("throws error if user cancels the watch asset request", async () => {
    const { result } = renderHook(() => useWatchAssetWithConnect(), {
      connectorOptions: { rejectRequest: true },
    });

    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });

    await act(async () => {
      result.current.watchAsset.watchAsset();
    });

    await waitFor(() => {
      expect(result.current.watchAsset.isError).toBeTruthy();
    });
  });
});

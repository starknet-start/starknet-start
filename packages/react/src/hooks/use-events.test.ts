import type { Abi } from "abi-wan-kanabi";
import { describe, expect, it } from "vitest";
import { accounts, defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { useAccount } from "./use-account";
import { useConnect } from "./use-connect";
import { useContract } from "./use-contract";
import { useDisconnect } from "./use-disconnect";
import { useEvents } from "./use-events";
import { useNetwork } from "./use-network";
import { useSendTransaction } from "./use-send-transaction";

function useSendTransactionWithConnect() {
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi,
    address: chain.nativeCurrency.address,
  });

  const { address } = useAccount();

  const calls =
    contract && address
      ? [contract.populate("transfer", [address, 1n])]
      : undefined;

  return {
    sendTransaction: useSendTransaction({ calls }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

async function sendTransfer() {
  const { result } = renderHook(() => useSendTransactionWithConnect());

  await act(async () => {
    result.current.connect.connect({
      connector: defaultConnector,
    });
  });

  await act(async () => {
    result.current.sendTransaction.send();
  });

  await waitFor(() => {
    expect(result.current.sendTransaction.isSuccess).toBeTruthy();
  });
}

describe("useEvents", () => {
  describe("when no transfer is sent", () => {
    it("returns an empty events list", async () => {
      const { result } = renderHook(() =>
        useEvents({
          address: accounts.sepolia[0].address as `0x${string}`,
          eventName: "Transfer",
          fromBlock: 0,
          toBlock: 0,
          pageSize: 1,
        }),
      );

      await waitFor(() => {
        const { data, ...rest } = result.current;
        expect(data).toEqual({ pages: [{ events: [] }], pageParams: ["0"] });
        expect(rest).toMatchInlineSnapshot(`
          {
            "error": null,
            "fetchNextPage": [Function],
            "fetchPreviousPage": [Function],
            "fetchStatus": "idle",
            "hasNextPage": false,
            "hasPreviousPage": false,
            "isError": false,
            "isFetching": false,
            "isFetchingNextPage": false,
            "isFetchingPreviousPage": false,
            "isLoading": false,
            "isPending": false,
            "isSuccess": true,
            "refetch": [Function],
            "status": "success",
          }
        `);
      });
    });
  });

  describe.skip("when a transfer is sent", () => {
    it("returns the Transfer events", async () => {
      await sendTransfer();

      const { result } = renderHook(() =>
        useEvents({
          address: accounts.sepolia[0].address as `0x${string}`,
          eventName: "Transfer",
          fromBlock: 0,
          toBlock: 0,
          pageSize: 1,
        }),
      );

      await waitFor(() => {
        const { data, ...rest } = result.current;
        expect(data).toBeDefined();
        expect(rest).toMatchInlineSnapshot(`
          {
            "error": null,
            "fetchNextPage": [Function],
            "fetchPreviousPage": [Function],
            "fetchStatus": "idle",
            "hasNextPage": false,
            "hasPreviousPage": false,
            "isError": false,
            "isFetching": false,
            "isFetchingNextPage": false,
            "isFetchingPreviousPage": false,
            "isLoading": false,
            "isPending": false,
            "isSuccess": true,
            "refetch": [Function],
            "status": "success",
          }
        `);
      });
    });
  });
});

const abi = [
  {
    type: "function",
    name: "transfer",
    state_mutability: "external",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
  },
] as const satisfies Abi;

import type { Abi } from "abi-wan-kanabi";
import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { UserRejectedRequestError } from "../errors";
import { useAccount } from "./use-account";
import { useConnect } from "./use-connect";
import { useContract } from "./use-contract";
import { useDisconnect } from "./use-disconnect";
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

describe("useSendTransaction", () => {
  it("sends a transaction sucessfully", async () => {
    const { result } = renderHook(() => useSendTransactionWithConnect());

    await act(async () => {
      await result.current.connect.connectAsync({
        connector: defaultConnector,
      });
    });

    await act(async () => {
      await result.current.sendTransaction.sendAsync();
    });

    await waitFor(() => {
      expect(result.current.sendTransaction.isSuccess).toBeTruthy();
    });
  });

  it("throws error if user rejects transaction", async () => {
    const { result } = renderHook(() => useSendTransactionWithConnect());

    await act(async () => {
      await result.current.connect.connectAsync({
        connector: defaultConnector,
      });
    });

    defaultConnector.updateOptions({ rejectRequest: true });

    try {
      await act(async () => {
        try {
          await result.current.sendTransaction.sendAsync();
        } catch {}
      });

      await waitFor(() => {
        expect(result.current.sendTransaction.isError).toBeTruthy();
        expect(result.current.sendTransaction.error).toBeInstanceOf(
          UserRejectedRequestError,
        );
      });
    } finally {
      defaultConnector.updateOptions({ rejectRequest: false });
    }
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

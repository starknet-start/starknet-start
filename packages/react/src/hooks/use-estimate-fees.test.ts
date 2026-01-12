import type { Abi } from "abi-wan-kanabi";
import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { useAccount } from "./use-account";
import { useConnect } from "./use-connect";
import { useContract } from "./use-contract";
import { useDisconnect } from "./use-disconnect";
import { useEstimateFees } from "./use-estimate-fees";
import { useNetwork } from "./use-network";

function useEstimateFeesWithConnect() {
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi,
    address: chain.nativeCurrency.address,
  });

  const { address } = useAccount();

  const calls = contract
    ? [contract.populate("transfer", [address ?? "0x01", 1n])]
    : undefined;

  return {
    estimateFees: useEstimateFees({ calls }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useEstimateFees", () => {
  it("estimate sucessfull if account is connected", async () => {
    const { result } = renderHook(() => useEstimateFeesWithConnect());

    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });

    await waitFor(() => {
      expect(result.current.estimateFees.isSuccess).toBeTruthy();
      expect(result.current.estimateFees.data).toMatchInlineSnapshot(`
        {
          "overall_fee": 2130048000000000n,
          "resourceBounds": {
            "l1_data_gas": {
              "max_amount": 192n,
              "max_price_per_unit": 1500000000n,
            },
            "l1_gas": {
              "max_amount": 0n,
              "max_price_per_unit": 1500000000n,
            },
            "l2_gas": {
              "max_amount": 1419840n,
              "max_price_per_unit": 1500000000n,
            },
          },
          "unit": "FRI",
        }
      `);
    });
  });

  it("estimate fails if account is not connected", async () => {
    const { result } = renderHook(() => useEstimateFeesWithConnect());

    await waitFor(() => {
      expect(result.current.estimateFees.isError).toBeTruthy();
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

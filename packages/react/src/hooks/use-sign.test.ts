import { shortString } from "starknet";
import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { useConnect } from "./use-connect";
import { useDisconnect } from "./use-disconnect";
import { type UseSignTypedDataArgs, useSignTypedData } from "./use-sign";

// Reference: https://github.com/PhilippeR26/Starknet-WalletAccount/blob/main/doc/walletAPIspec.md#example--9
const typedData: UseSignTypedDataArgs = {
  message: {
    id: "0x0000004f000f",
    from: "0x2c94f628d125cd0e86eaefea735ba24c262b9a441728f63e5776661829a4066",
    amount: "400",
    nameGamer: "Hector26",
    endDate:
      "0x27d32a3033df4277caa9e9396100b7ca8c66a4ef8ea5f6765b91a7c17f0109c",
    itemsAuthorized: ["0x01", "0x03", "0x0a", "0x0e"],
    chkFunction: "check_authorization",
    rootList: [
      {
        address:
          "0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79",
        amount: "1554785",
      },
    ],
  },
  types: {
    StarkNetDomain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "string" },
    ],
    Airdrop: [
      { name: "address", type: "string" },
      { name: "amount", type: "string" },
    ],
    Validate: [
      { name: "id", type: "string" },
      { name: "from", type: "string" },
      { name: "amount", type: "string" },
      { name: "nameGamer", type: "string" },
      { name: "endDate", type: "string" },
      { name: "itemsAuthorized", type: "string*" }, // array of string
      { name: "chkFunction", type: "selector" }, // name of function
      { name: "rootList", type: "merkletree", contains: "Airdrop" }, // root of a merkle tree
    ],
  },
  primaryType: "Validate",
  domain: {
    name: "myDapp",
    version: "1",
    chainId: shortString.encodeShortString("SN_SEPOLIA"),
  },
};

function useSignWithConnect() {
  return {
    sign: useSignTypedData({ params: typedData }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useSignTypedData", () => {
  it("user accepted to sign", async () => {
    const { result } = renderHook(() => useSignWithConnect());

    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });

    await act(async () => {
      result.current.sign.signTypedData();
    });

    await waitFor(() => {
      expect(result.current.sign.data).toBeTruthy();
    });
  });

  it("throws error if user rejected to sign", async () => {
    const { result } = renderHook(() => useSignWithConnect(), {
      connectorOptions: { rejectRequest: true },
    });
    await act(async () => {
      result.current.connect.connect({
        connector: defaultConnector,
      });
    });
    await act(async () => {
      result.current.sign.signTypedData();
    });
    await waitFor(() => {
      expect(result.current.sign.isError).toBeTruthy();
    });
  });
});

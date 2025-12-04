import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook, waitFor } from "../../test/react";
import { useConnect } from "./use-connect";
import {
  type UseDeclareContractArgs,
  useDeclareContract,
} from "./use-declare-contract";
import { useDisconnect } from "./use-disconnect";

// TODO
const params: UseDeclareContractArgs = {
  compiled_class_hash: "",
  contract_class: {
    abi: "",
    contract_class_version: "",
    sierra_program: [""],
    entry_points_by_type: {
      CONSTRUCTOR: [
        {
          function_idx: 1,
          selector: "",
        },
      ],
      EXTERNAL: [
        {
          function_idx: 1,
          selector: "",
        },
      ],
      L1_HANDLER: [
        {
          function_idx: 1,
          selector: "",
        },
      ],
    },
  },
};

function useDeclareContractWithConnect() {
  return {
    declare: useDeclareContract({ params }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe.skip("useDeclareContract", () => {
  it("user approved the declaration in the wallet", async () => {
    const { result } = renderHook(() => useDeclareContractWithConnect());

    await act(async () => {
      await result.current.connect.connectAsync({
        connector: defaultConnector,
      });
    });

    await act(async () => {
      await result.current.declare.declareAsync();
    });

    await waitFor(() => {
      expect(result.current.declare.isSuccess).toBeTruthy();
    });
  });

  it("throws error if the user declines the proposal", async () => {
    const { result } = renderHook(() => useDeclareContractWithConnect(), {
      connectorOptions: { rejectRequest: true },
    });
    await act(async () => {
      await result.current.connect.connectAsync({
        connector: defaultConnector,
      });
    });
    await act(async () => {
      await result.current.declare.declareAsync();
    });
    await waitFor(() => {
      expect(result.current.declare.isError).toBeTruthy();
    });
  });
});

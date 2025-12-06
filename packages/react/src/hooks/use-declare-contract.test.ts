import { hash } from "starknet";
import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { getRandomizedContract } from "../../test/fixtures/cairo210";
import { act, renderHook, waitFor } from "../../test/react";
import { useConnect } from "./use-connect";
import type { UseDeclareContractArgs } from "./use-declare-contract";
import { useDeclareContract } from "./use-declare-contract";
import { useDisconnect } from "./use-disconnect";

const { sierra, casm } = getRandomizedContract();
const compiled_class_hash = hash.computeCompiledClassHash(casm);

const params: UseDeclareContractArgs = {
  compiled_class_hash,
  contract_class: {
    ...sierra,
    abi: JSON.stringify(sierra.abi),
  },
};

function useDeclareContractWithConnect() {
  return {
    declare: useDeclareContract({ params }),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useDeclareContract", () => {
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
    const { result } = renderHook(() => useDeclareContractWithConnect());

    await act(async () => {
      await result.current.connect.connectAsync({
        connector: defaultConnector,
      });
    });

    defaultConnector.updateOptions({ rejectDeclare: true });

    try {
      await act(async () => {
        try {
          await result.current.declare.declareAsync();
        } catch {}
      });

      await waitFor(() => {
        expect(result.current.declare.isError).toBeTruthy();
      });
    } finally {
      defaultConnector.updateOptions({ rejectDeclare: false });
    }
  });
});

import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "../../test/react";

import { useBlock } from "./use-block";

describe("useBlock", () => {
  it("returns the latest block", async () => {
    const { result } = renderHook(() => useBlock());

    await waitFor(() => {
      expect(result.current.status).toEqual("success");
    });

    const { data, ...rest } = result.current;
    expect(data).toBeDefined();
    expect(rest).toMatchInlineSnapshot(`
      {
        "error": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetching": false,
        "isLoading": false,
        "isPending": false,
        "isSuccess": true,
        "refetch": [Function],
        "status": "success",
      }
    `);
  });

  it("returns an error if the block doesn't exist", async () => {
    const { result } = renderHook(() => useBlock({ blockIdentifier: 999999 }));

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    const { data } = result.current;
    expect(data).toBeUndefined();
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": [RpcError: RPC: starknet_getBlockWithTxHashes with params {
        "block_id": {
          "block_number": 999999
        }
      }

            24: Block not found: undefined],
        "fetchStatus": "idle",
        "isError": true,
        "isFetching": false,
        "isLoading": false,
        "isPending": false,
        "isSuccess": false,
        "refetch": [Function],
        "status": "error",
      }
    `);
  });
});

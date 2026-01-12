import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "../../test/react";

import { useBlockNumber } from "./use-block-number";

describe("useBlockNumber", () => {
  it("returns the current block number", async () => {
    const { result } = renderHook(() => useBlockNumber());

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
});

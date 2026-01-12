import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "../../test/react";

import { useNonceForAddress } from "./use-nonce-for-address";

describe("useNonceForAddress", () => {
  it("returns nonce for the given address", async () => {
    const { result } = renderHook(() =>
      useNonceForAddress({
        address:
          "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691",
      }),
    );

    await waitFor(() => {
      expect(result.current.status).toEqual("success");
    });

    const { data, ...rest } = result.current;
    expect(data).toEqual("0x0");
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

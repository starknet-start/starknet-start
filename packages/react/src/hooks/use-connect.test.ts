import { describe, expect, it } from "vitest";
import { act, renderHook, waitFor } from "../../test/react";

import { useConnect } from "./use-connect";

describe("useConnect", () => {
  it("connects the specified connector", async () => {
    const { result } = renderHook(() => useConnect());

    await waitFor(() => {
      expect(result.current.connector).toBeUndefined();
      expect(result.current.connectors).toHaveLength(1);
    });

    await act(async () => {
      const connector = result.current.connectors[0];
      await result.current.connectAsync({ connector });
    });

    await waitFor(() => {
      expect(result.current.connector).toBeDefined();
    });
  });
});

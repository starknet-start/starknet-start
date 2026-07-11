import type { ProviderInterface } from "starknet";

import { StarknetIdImpl } from "starknet";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { starkNameQueryFn } from "./stark-name";

vi.mock("starknet", () => ({
  StarknetIdImpl: {
    getStarkName: vi.fn(),
  },
}));

const provider = {} as ProviderInterface;
const address = "0x123";
const mainnetNamingContract = "0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678";

describe("starkNameQueryFn", () => {
  beforeEach(() => {
    vi.mocked(StarknetIdImpl.getStarkName).mockReset();
  });

  it("requires an address", async () => {
    await expect(starkNameQueryFn({ provider, network: "mainnet" })()).rejects.toThrow("address is required");
  });

  it("requires a network", async () => {
    await expect(starkNameQueryFn({ provider, address })()).rejects.toThrow("network is required");
  });

  it("delegates to StarknetIdImpl with the default network contract", async () => {
    vi.mocked(StarknetIdImpl.getStarkName).mockResolvedValue("alice.stark");

    await expect(starkNameQueryFn({ provider, address, network: "mainnet" })()).resolves.toBe("alice.stark");

    expect(StarknetIdImpl.getStarkName).toHaveBeenCalledWith(provider, address, mainnetNamingContract);
  });

  it("uses a custom naming contract when provided", async () => {
    vi.mocked(StarknetIdImpl.getStarkName).mockResolvedValue("alice.stark");

    await starkNameQueryFn({
      provider,
      address,
      network: "mainnet",
      contract: "0x456",
    })();

    expect(StarknetIdImpl.getStarkName).toHaveBeenCalledWith(provider, address, "0x456");
  });
});

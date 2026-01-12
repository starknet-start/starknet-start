import { mainnet } from "@starknet-start/chains";
import { assert, describe, expect, it } from "vitest";

import { viewblock } from "./viewblock";

describe("ViewblockExplorer", () => {
  it("should link to a block", () => {
    const explorer = viewblock(mainnet);
    assert(explorer);

    // hash not supported

    expect(explorer.block({ number: 2755646 })).toMatchInlineSnapshot(
      `"https://viewblock.io/starknet/block/2755646"`,
    );
  });

  it("should link to a transaction", () => {
    const explorer = viewblock(mainnet);
    assert(explorer);

    expect(
      explorer.transaction(
        "0x696393ca93411324a3b68c0ae45f39071be09cd9cc58e20180960835ab8fbfd",
      ),
    ).toMatchInlineSnapshot(
      `"https://viewblock.io/starknet/tx/0x696393ca93411324a3b68c0ae45f39071be09cd9cc58e20180960835ab8fbfd"`,
    );
  });

  it("should link to a contract", () => {
    const explorer = viewblock(mainnet);
    assert(explorer);

    expect(
      explorer.contract(
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      ),
    ).toMatchInlineSnapshot(
      `"https://viewblock.io/starknet/contract/0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"`,
    );
  });

  it("should link to a class", () => {
    const explorer = viewblock(mainnet);
    assert(explorer);

    expect(
      explorer.class(
        "0x04ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
      ),
    ).toMatchInlineSnapshot(
      `"https://viewblock.io/starknet/class/0x04ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b"`,
    );
  });
});

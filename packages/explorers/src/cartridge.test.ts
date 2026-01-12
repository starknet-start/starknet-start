import { mainnet } from "@starknet-start/chains";
import { assert, describe, expect, it } from "vitest";

import { cartridge } from "./cartridge";

describe("CartridgeExplorer", () => {
  it("should link to a block", () => {
    const explorer = cartridge(mainnet);
    assert(explorer);

    expect(
      explorer.block({
        hash: "0x06d7b5ecf23928af0a12daec0db203f85162588e42607e3379310febc8f072e9",
      }),
    ).toMatchInlineSnapshot(
      `"https://explorer.cartridge.gg/block/0x06d7b5ecf23928af0a12daec0db203f85162588e42607e3379310febc8f072e9"`,
    );

    expect(explorer.block({ number: 2755646 })).toMatchInlineSnapshot(
      `"https://explorer.cartridge.gg/block/2755646"`,
    );
  });

  it("should link to a transaction", () => {
    const explorer = cartridge(mainnet);
    assert(explorer);

    expect(
      explorer.transaction(
        "0x696393ca93411324a3b68c0ae45f39071be09cd9cc58e20180960835ab8fbfd",
      ),
    ).toMatchInlineSnapshot(
      `"https://explorer.cartridge.gg/tx/0x696393ca93411324a3b68c0ae45f39071be09cd9cc58e20180960835ab8fbfd"`,
    );
  });

  it("should link to a contract", () => {
    const explorer = cartridge(mainnet);
    assert(explorer);

    expect(
      explorer.contract(
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      ),
    ).toMatchInlineSnapshot(
      `"https://explorer.cartridge.gg/contract/0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"`,
    );
  });

  it("should link to a class", () => {
    const explorer = cartridge(mainnet);
    assert(explorer);

    expect(
      explorer.class(
        "0x04ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b",
      ),
    ).toMatchInlineSnapshot(
      `"https://explorer.cartridge.gg/class/0x04ad3c1dc8413453db314497945b6903e1c766495a1e60492d44da9c2a986e4b"`,
    );
  });
});

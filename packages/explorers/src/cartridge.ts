import type { Chain } from "@starknet-start/chains";
import type { Explorer, ExplorerFactory } from "./explorer";

// Define the CartridgeExplorer class that extends Explorer
export class CartridgeExplorer implements Explorer {
  public name = "Cartridge Explorer";
  private link: string;

  constructor(chain: Chain) {
    this.link = chain.explorers?.["cartridge"]?.toString() ?? "";
  }

  block(hashOrNumber: { hash?: string; number?: number }): string {
    return `${this.link}/block/${hashOrNumber.hash ?? hashOrNumber.number}`;
  }

  transaction(hash: string): string {
    return `${this.link}/tx/${hash}`;
  }

  contract(address: string): string {
    return `${this.link}/contract/${address}`;
  }

  class(hash: string): string {
    return `${this.link}/class/${hash}`;
  }
}

// Define the cartridge factory function
export const cartridge: ExplorerFactory<CartridgeExplorer> = (chain: Chain) => {
  return new CartridgeExplorer(chain);
};

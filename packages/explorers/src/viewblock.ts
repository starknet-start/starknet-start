import type { Chain } from "@starknet-start/chains";
import type { Explorer, ExplorerFactory } from "./explorer";

// Define the ViewblockExplorer class that extends Explorer
export class ViewblockExplorer implements Explorer {
  public name = "Viewblock";
  private link: string;

  constructor(chain: Chain) {
    this.link = chain.explorers?.["viewblock"]?.toString() ?? "";
  }

  block(hashOrNumber: { hash?: string; number?: number }): string {
    if (hashOrNumber.hash && hashOrNumber.number === undefined) {
      throw new Error(
        "The viewblock explorer doesnt support hashes for blocks. Please provide a number.",
      );
    }
    return `${this.link}/block/${hashOrNumber.number}`;
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

// Define the viewblock factory function
export const viewblock: ExplorerFactory<ViewblockExplorer> = (chain: Chain) => {
  return new ViewblockExplorer(chain);
};

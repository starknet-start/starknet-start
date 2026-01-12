import type { Chain } from "@starknet-start/chains";

export interface Explorer {
  // link to a block
  block(hashOrNumber: { hash?: string; number?: number }): string;
  // link to a transaction
  transaction(hash: string): string;
  // link to a contract/account
  contract(address: string): string;
  // link to class hash
  class(hash: string): string;
  // the name of the explorer
  name: string;
}

export type ExplorerFactory<T extends Explorer = Explorer> = (
  chain: Chain,
) => T | null;

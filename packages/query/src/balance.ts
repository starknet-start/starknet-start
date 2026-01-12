import type { Chain } from "@starknet-start/chains";
import { type BlockNumber, type CallOptions, num, shortString } from "starknet";
import { formatUnits } from "viem";
import type { StarknetTypedContract } from "./contract";

type TAbi = typeof balanceABIFragment;
type Contract = StarknetTypedContract<TAbi>;

export function balanceQueryKey({
  chain,
  token,
  address,
  blockIdentifier,
}: {
  chain: Chain;
  token?: string;
  address?: string;
  blockIdentifier?: BlockNumber;
}) {
  return [
    {
      entity: "balance",
      chainId: chain?.name,
      token,
      address,
      blockIdentifier,
    },
  ] as const;
}

export function balanceQueryFn({
  chain,
  token,
  address,
  contract,
  blockIdentifier,
}: {
  chain: Chain;
  token?: string;
  address?: string;
  contract?: Contract;
  blockIdentifier?: BlockNumber;
}) {
  return async () => {
    if (!address) throw new Error("address is required");
    if (!contract) throw new Error("contract is required");

    const options: CallOptions = {
      blockIdentifier,
    };

    const isNativeCurrency = token === chain.nativeCurrency.address;

    let symbol = chain.nativeCurrency.symbol;
    if (!isNativeCurrency) {
      const symbol_ = await contract.withOptions(options).symbol();
      symbol = shortString.decodeShortString(num.toHex(symbol_));
    }

    let decimals = chain.nativeCurrency.decimals;
    if (!isNativeCurrency) {
      const decimals_ = await contract.withOptions(options).decimals();
      decimals = Number(decimals_);
    }

    const balanceOf = (await contract
      .withOptions(options)
      .balanceOf(address)) as bigint;

    const formatted = formatUnits(balanceOf, decimals);

    return {
      value: balanceOf,
      decimals: decimals,
      symbol: symbol,
      formatted: formatted,
    };
  };
}

const balanceABIFragment = [
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "balanceOf",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "symbol",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::felt252",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "decimals",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u8",
      },
    ],
    state_mutability: "view",
  },
] as const;

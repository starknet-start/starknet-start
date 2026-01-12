import type { Address } from "@starknet-start/chains";
import { balanceQueryFn, balanceQueryKey } from "@starknet-start/query";
import { useMemo } from "react";
import { type BlockNumber, BlockTag } from "starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";

import { useContract } from "./use-contract";
import { useInvalidateOnBlock } from "./use-invalidate-on-block";
import { useNetwork } from "./use-network";

const DEFAULT_FETCH_INTERVAL = 5_000;

export type Balance = {
  decimals: number;
  symbol: string;
  formatted: string;
  value: bigint;
};

export type UseBalanceProps = UseQueryProps<
  Balance,
  Error,
  Balance,
  ReturnType<typeof balanceQueryKey>
> & {
  /** The contract's address. Defaults to the native currency. */
  token?: Address;
  /** The address to fetch balance for. */
  address?: Address;
  /** Whether to watch for changes. */
  watch?: boolean;
  /** Block identifier used when performing call. */
  blockIdentifier?: BlockNumber;
};

export type UseBalanceResult = UseQueryResult<Balance, Error>;

/**
 * Fetch the balance for the provided address and token.
 *
 * If no token is provided, the native currency is used.
 */
export function useBalance({
  token: token_,
  address,
  refetchInterval: refetchInterval_,
  watch = false,
  enabled: enabled_ = true,
  blockIdentifier = BlockTag.LATEST,
  ...props
}: UseBalanceProps) {
  const { chain } = useNetwork();
  const token = token_ ?? chain.nativeCurrency.address;

  const { contract } = useContract({
    abi: balanceABIFragment,
    address: token,
  });

  const queryKey_ = useMemo(
    () => balanceQueryKey({ chain, token, address, blockIdentifier }),
    [chain, token, address, blockIdentifier],
  );

  const enabled = useMemo(
    () => Boolean(enabled_ && contract && address),
    [enabled_, contract, address],
  );

  const refetchInterval =
    refetchInterval_ ??
    (blockIdentifier === BlockTag.PRE_CONFIRMED && watch
      ? DEFAULT_FETCH_INTERVAL
      : undefined);

  useInvalidateOnBlock({
    enabled: Boolean(enabled && watch),
    queryKey: queryKey_,
  });

  return useQuery({
    enabled,
    refetchInterval,
    queryKey: queryKey_,
    queryFn: balanceQueryFn({
      chain,
      contract,
      token,
      address,
      blockIdentifier,
    }),
    ...props,
  });
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

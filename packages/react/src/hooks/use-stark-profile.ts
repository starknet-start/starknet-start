import type { Address } from "@starknet-start/chains";
import {
  STARKNET_ID_CONTRACTS,
  type StarkProfileQueryFnParams,
  type StarkProfileResponse,
  starkProfileQueryFn,
  starkProfileQueryKey,
} from "@starknet-start/query";
import { useMemo } from "react";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";
import { useContract } from "./use-contract";
import { useNetwork } from "./use-network";

/** Arguments for `useStarkProfile` hook. */
export type StarkProfileArgs = UseQueryProps<
  GetStarkprofileResponse,
  Error,
  GetStarkprofileResponse,
  ReturnType<typeof starkProfileQueryKey>
> & {
  /** Account address. */
  address?: Address;
  /** Get Starknet ID default pfp url if no profile picture is set */
  useDefaultPfp?: boolean;
  /** Naming contract to use. */
  namingContract?: Address;
  /** Identity contract to use. */
  identityContract?: Address;
};

/** Value returned by `useStarkProfile` hook. */
export type GetStarkprofileResponse = StarkProfileResponse;

export type UseStarkProfileResult = UseQueryResult<
  GetStarkprofileResponse,
  Error
>;

/**
 * Hook for fetching Stark profile for address.
 */
export function useStarkProfile({
  address,
  useDefaultPfp = true,
  namingContract,
  identityContract,
  enabled: enabled_ = true,
  ...props
}: StarkProfileArgs): UseStarkProfileResult {
  const { chain } = useNetwork();
  const networkContracts = STARKNET_ID_CONTRACTS[chain.network];
  if (!networkContracts) throw new Error("Network not supported");

  const { contract: multicallContract_ } = useContract({
    abi: multicallABI,
    address: networkContracts.multicall,
  });

  const enabled = useMemo(
    () => Boolean(enabled_ && address),
    [enabled_, address],
  );

  const { refetchInterval, ...rest } = props;

  return useQuery({
    queryKey: starkProfileQueryKey({
      address,
      namingContract,
      identityContract,
      network: chain.network,
      useDefaultPfp,
    }),
    queryFn: starkProfileQueryFn({
      address,
      useDefaultPfp,
      namingContract,
      network: chain.network,
      identityContract,
      multicallContract:
        multicallContract_ as StarkProfileQueryFnParams["multicallContract"],
    }),
    enabled,
    refetchInterval,
    ...rest,
  });
}

const multicallABI = [
  {
    name: "ComposableMulticallImpl",
    type: "impl",
    interface_name: "composable_multicall::IComposableMulticall",
  },
  {
    name: "composable_multicall::Execution",
    type: "enum",
    variants: [
      {
        name: "Static",
        type: "()",
      },
      {
        name: "IfEqual",
        type: "(core::integer::u32, core::integer::u32, core::felt252)",
      },
      {
        name: "IfNotEqual",
        type: "(core::integer::u32, core::integer::u32, core::felt252)",
      },
    ],
  },
  {
    name: "composable_multicall::DynamicFelt",
    type: "enum",
    variants: [
      {
        name: "Hardcoded",
        type: "core::felt252",
      },
      {
        name: "Reference",
        type: "(core::integer::u32, core::integer::u32)",
      },
    ],
  },
  {
    name: "composable_multicall::DynamicCalldata",
    type: "enum",
    variants: [
      {
        name: "Hardcoded",
        type: "core::felt252",
      },
      {
        name: "Reference",
        type: "(core::integer::u32, core::integer::u32)",
      },
      {
        name: "ArrayReference",
        type: "(core::integer::u32, core::integer::u32)",
      },
    ],
  },
  {
    name: "composable_multicall::DynamicCall",
    type: "struct",
    members: [
      {
        name: "execution",
        type: "composable_multicall::Execution",
      },
      {
        name: "to",
        type: "composable_multicall::DynamicFelt",
      },
      {
        name: "selector",
        type: "composable_multicall::DynamicFelt",
      },
      {
        name: "calldata",
        type: "core::array::Array::<composable_multicall::DynamicCalldata>",
      },
    ],
  },
  {
    name: "core::array::Span::<core::felt252>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    name: "composable_multicall::IComposableMulticall",
    type: "interface",
    items: [
      {
        name: "aggregate",
        type: "function",
        inputs: [
          {
            name: "calls",
            type: "core::array::Array::<composable_multicall::DynamicCall>",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::array::Span::<core::felt252>>",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    kind: "enum",
    name: "composable_multicall::contract::ComposableMulticall::Event",
    type: "event",
    variants: [],
  },
] as const;

import type { Address } from "@starknet-start/chains";
import {
  type CallQueryArgs,
  callQueryFn,
  callQueryKey,
} from "@starknet-start/query";
import { useMemo } from "react";
import { type Abi, BlockTag, type CallResult, type Contract } from "starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";
import { useContract } from "./use-contract";
import { useInvalidateOnBlock } from "./use-invalidate-on-block";
import { useNetwork } from "./use-network";

const DEFAULT_FETCH_INTERVAL = 5_000;

export type CallQueryKey = typeof callQueryKey;

/** Options for `useCall`. */
export type UseCallProps = CallQueryArgs &
  UseQueryProps<CallResult, Error, CallResult, ReturnType<CallQueryKey>> & {
    /** The target contract's ABI. */
    abi?: Abi;
    /** The target contract's address. */
    address?: Address;
    /** Refresh data at every block. */
    watch?: boolean;
  };

/** Value returned from `useCall`. */
export type UseCallResult = UseQueryResult<CallResult, Error>;

/**
 * Hook to perform a read-only contract call.
 *
 * @remarks
 *
 * The hook only performs a call if the target `abi`, `address`,
 * `functionName`, and `args` are not undefined.
 *
 */
export function useCall({
  abi,
  address,
  functionName,
  args,
  blockIdentifier = BlockTag.LATEST,
  refetchInterval: refetchInterval_,
  watch = false,
  enabled: enabled_ = true,
  parseArgs,
  parseResult,
  ...props
}: UseCallProps): UseCallResult {
  const { chain } = useNetwork();
  const { contract } = useContract({ abi, address });

  const queryKey_ = useMemo(
    () =>
      callQueryKey({
        chain,
        contract: contract as Contract,
        functionName,
        args,
        blockIdentifier,
      }),
    [chain, contract, functionName, args, blockIdentifier],
  );

  const enabled = useMemo(
    () => Boolean(enabled_ && contract && functionName && args),
    [enabled_, contract, functionName, args],
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
    queryKey: queryKey_,
    queryFn: callQueryFn({
      contract: contract as Contract,
      functionName,
      args,
      blockIdentifier,
      parseArgs,
      parseResult,
    }),
    refetchInterval,
    enabled,
    ...props,
  });
}

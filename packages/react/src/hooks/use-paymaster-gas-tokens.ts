import {
  paymasterGasTokensQueryFn,
  paymasterGasTokensQueryKey,
} from "@starknet-start/query";
import { useMemo } from "react";
import type { TokenData } from "starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";
import { useInvalidateOnBlock } from "./use-invalidate-on-block";
import { useProvider } from "./use-provider";

/** Options for `usePaymasterGasTokens`. */
export type UsePaymasterGasTokensProps = UseQueryProps<
  TokenData[],
  Error,
  TokenData[],
  ReturnType<typeof paymasterGasTokensQueryKey>
> & {
  /** Refresh data at every block. */
  watch?: boolean;
};

/** Value returned from `usePaymasterGasTokens`. */
export type UsePaymasterGasTokensResult = UseQueryResult<TokenData[], Error>;

/**
 * Hook to fetch all gas token supported by the Paymaster.
 *
 * @remarks
 *
 * The hook only performs fetch if the `paymasterProvider` is not undefined.
 */
export function usePaymasterGasTokens({
  watch = false,
  enabled: enabled_ = true,
  ...props
}: UsePaymasterGasTokensProps = {}): UsePaymasterGasTokensResult {
  const { paymasterProvider } = useProvider();

  const queryKey_ = useMemo(() => paymasterGasTokensQueryKey(), []);

  const enabled = useMemo(() => Boolean(enabled_), [enabled_]);

  useInvalidateOnBlock({
    enabled: Boolean(enabled && watch),
    queryKey: queryKey_,
  });

  return useQuery({
    queryKey: queryKey_,
    queryFn: paymasterGasTokensQueryFn({
      paymasterProvider,
    }),
    enabled,
    ...props,
  });
}

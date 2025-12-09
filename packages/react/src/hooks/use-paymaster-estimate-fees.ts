import {
  type PaymasterEstimateFeesArgs,
  paymasterEstimateFeesQueryFn,
  paymasterEstimateFeesQueryKey,
} from "@starknet-start/query";
import { useMemo } from "react";
import { useStarknetAccount } from "src/context/account";
import type { PaymasterFeeEstimate } from "starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";
import { useInvalidateOnBlock } from "./use-invalidate-on-block";

/** Options for `useEstimateFees`. */
export type UsePaymasterEstimateFeesProps = PaymasterEstimateFeesArgs &
  UseQueryProps<
    PaymasterFeeEstimate,
    Error,
    PaymasterFeeEstimate,
    ReturnType<typeof paymasterEstimateFeesQueryKey>
  > & {
    /** Refresh data at every block. */
    watch?: boolean;
  };

/** Value returned from `useEstimateFees`. */
export type UsePaymasterEstimateFeesResult = UseQueryResult<
  PaymasterFeeEstimate,
  Error
>;

/**
 * Hook to estimate fees for smart contract calls.
 *
 * @remarks
 *
 * The hook only performs estimation if the `calls` is not undefined.
 */
export function usePaymasterEstimateFees({
  calls,
  options,
  watch = false,
  enabled: enabled_ = true,
  ...props
}: UsePaymasterEstimateFeesProps): UsePaymasterEstimateFeesResult {
  const { account } = useStarknetAccount();

  const queryKey_ = useMemo(
    () => paymasterEstimateFeesQueryKey({ calls, options }),
    [calls, options],
  );

  const enabled = useMemo(
    () => Boolean(enabled_ && calls && options),
    [enabled_, calls, options],
  );

  useInvalidateOnBlock({
    enabled: Boolean(enabled && watch),
    queryKey: queryKey_,
  });

  return useQuery({
    queryKey: queryKey_,
    queryFn: paymasterEstimateFeesQueryFn({
      account,
      calls,
      options,
    }),
    enabled,
    ...props,
  });
}

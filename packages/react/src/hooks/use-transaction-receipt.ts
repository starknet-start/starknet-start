import {
  transactionReceiptQueryFn,
  transactionReceiptQueryKey,
} from "@starknet-start/query";
import { useMemo } from "react";
import type { GetTransactionReceiptResponse } from "starknet";
import { useStarknet } from "../context/starknet";
import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";
import { useInvalidateOnBlock } from "./use-invalidate-on-block";

/** Arguments for the `useTransactionReceipt` hook. */
export type UseTransactionReceiptProps = UseQueryProps<
  GetTransactionReceiptResponse,
  Error,
  GetTransactionReceiptResponse,
  ReturnType<typeof transactionReceiptQueryKey>
> & {
  /** The transaction hash. */
  hash?: string;
  /** Refresh data at every block. */
  watch?: boolean;
};

export type UseTransactionReceiptResult = UseQueryResult<
  GetTransactionReceiptResponse,
  Error
>;

/**
 * Hook to fetch a single transaction receipt.
 *
 * @remarks
 *
 * This hook keeps a cache of receipts by chain and transaction hash
 * so that you can use the hook freely in your application without worrying
 * about sending duplicate network requests.
 *
 * If you need to refresh the transaction receipt data, set `watch: true` in
 * the props. The hook will periodically refresh the transaction data in the
 * background.
 *
 */
export function useTransactionReceipt({
  hash,
  watch,
  enabled: enabled_ = true,
  ...props
}: UseTransactionReceiptProps): UseTransactionReceiptResult {
  const { provider, chain } = useStarknet();

  const queryKey_ = useMemo(
    () => transactionReceiptQueryKey({ chain, hash }),
    [chain, hash],
  );

  const enabled = useMemo(() => Boolean(enabled_ && hash), [enabled_, hash]);

  useInvalidateOnBlock({
    enabled: Boolean(enabled && watch),
    queryKey: queryKey_,
  });

  return useQuery({
    queryKey: queryKey_,
    queryFn: transactionReceiptQueryFn({ provider, hash }),
    enabled,
    ...props,
  });
}

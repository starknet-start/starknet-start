import type {
  AccountInterface,
  Call,
  PaymasterDetails,
  PaymasterFeeEstimate,
} from "starknet";

export type PaymasterEstimateFeesArgs = {
  calls?: Call[];
  options?: PaymasterDetails;
};

export type PaymasterEstimateFeesQueryFnParams = {
  account?: AccountInterface;
} & PaymasterEstimateFeesArgs;

export function paymasterEstimateFeesQueryKey({
  calls,
  options,
}: PaymasterEstimateFeesArgs) {
  return [
    {
      entity: "estimatePaymasterTransactionFee" as const,
      calls,
      options,
    },
  ] as const;
}

export function paymasterEstimateFeesQueryFn({
  account,
  calls,
  options,
}: PaymasterEstimateFeesQueryFnParams) {
  return async (): Promise<PaymasterFeeEstimate> => {
    if (!account) throw new Error("account is required");
    if (!calls || calls.length === 0) throw new Error("calls are required");
    if (!options) throw new Error("paymaster options are required");
    return await account.estimatePaymasterTransactionFee(calls, options);
  };
}

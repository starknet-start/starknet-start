import type {
  AccountInterface,
  Call,
  EstimateFeeResponseOverhead,
  UniversalDetails,
} from "starknet";

export type EstimateFeesArgs = {
  calls?: Call[];
  options?: UniversalDetails;
};

export type EstimateFeesQueryFnParams = {
  account?: AccountInterface;
} & EstimateFeesArgs;

export function estimateFeesQueryKey({ calls, options }: EstimateFeesArgs) {
  return [
    {
      entity: "estimateInvokeFee" as const,
      calls,
      options,
    },
  ] as const;
}

export function estimateFeesQueryFn({
  account,
  calls,
  options,
}: EstimateFeesQueryFnParams) {
  return async (): Promise<EstimateFeeResponseOverhead> => {
    if (!account) throw new Error("account is required");
    if (!calls || calls.length === 0) throw new Error("calls are required");
    return await account.estimateInvokeFee(calls, options);
  };
}

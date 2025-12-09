import type {
  AccountInterface,
  BigNumberish,
  Call,
  InvokeFunctionResponse,
  PaymasterDetails,
} from "starknet";

export function paymasterSendTransactionMutationKey(args: Call[]) {
  return [{ entity: "paymaster_sendTransaction", calls: args }] as const;
}

export function paymasterSendTransactionMutationFn({
  account,
  options,
  maxFeeInGasToken,
}: {
  account?: AccountInterface;
  options?: PaymasterDetails;
  maxFeeInGasToken?: BigNumberish;
}) {
  return async (calls: Call[]): Promise<InvokeFunctionResponse> => {
    if (!account) throw new Error("account is required");
    if (!calls || calls.length === 0) throw new Error("calls are required");
    if (!options) throw new Error("paymaster options are required");

    return account.executePaymasterTransaction(
      calls,
      options,
      maxFeeInGasToken,
    );
  };
}

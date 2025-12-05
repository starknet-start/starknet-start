import {
  paymasterSendTransactionMutationFn,
  paymasterSendTransactionMutationKey,
} from "@starknet-start/query";
import { useCallback } from "react";
import { useStarknetAccount } from "src/context/account";
import type {
  BigNumberish,
  Call,
  InvokeFunctionResponse,
  PaymasterDetails,
} from "starknet";
import { type UseMutationResult, useMutation } from "../query";

export type UsePaymasterSendTransactionArgs = {
  /** List of smart contract calls to execute. */
  calls?: Call[];
  /** Paymaster details. */
  options: PaymasterDetails;
  /** Max fee in gas token. */
  maxFeeInGasToken?: BigNumberish;
};

/** Value returned from `usePaymasterSendTransaction`. */
export type UsePaymasterSendTransactionResult = Omit<
  UseMutationResult<InvokeFunctionResponse, Error, Call[]>,
  "mutate" | "mutateAsync"
> & {
  send: (args?: Call[]) => void;
  sendAsync: (args?: Call[]) => Promise<InvokeFunctionResponse>;
};

/** Hook to send one or several transaction(s) to the network through a paymaster. */
export function usePaymasterSendTransaction(
  props: UsePaymasterSendTransactionArgs,
): UsePaymasterSendTransactionResult {
  const { calls, options, maxFeeInGasToken, ...rest } = props;
  const { account } = useStarknetAccount();

  const { mutate, mutateAsync, ...result } = useMutation<
    InvokeFunctionResponse,
    Error,
    Call[]
  >({
    mutationKey: paymasterSendTransactionMutationKey(calls || []),
    mutationFn: paymasterSendTransactionMutationFn({
      account,
      options,
      maxFeeInGasToken,
    }),
    ...rest,
  });

  const send = useCallback(
    (args?: Call[]) => {
      mutate(args || calls || []);
    },
    [mutate, calls],
  );

  const sendAsync = useCallback(
    (args?: Call[]) => {
      return mutateAsync(args || calls || []);
    },
    [mutateAsync, calls],
  );

  return {
    send,
    sendAsync,
    ...result,
  };
}

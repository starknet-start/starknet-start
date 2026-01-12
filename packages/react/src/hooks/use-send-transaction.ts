import type { Call as RequestCall } from "@starknet-io/types-js";
import type { Call } from "starknet";
import {
  type RequestArgs,
  type RequestResult,
  type UseWalletRequestProps,
  type UseWalletRequestResult,
  useWalletRequest,
} from "./use-wallet-request";

export type UseSendTransactionArgs = {
  /** List of smart contract calls to execute. */
  calls?: Call[];
};

export type UseSendTransactionProps = UseSendTransactionArgs &
  Omit<
    UseWalletRequestProps<"wallet_addInvokeTransaction">,
    keyof RequestArgs<"wallet_addInvokeTransaction">
  >;

export type UseSendTransactionResult = Omit<
  UseWalletRequestResult<"wallet_addInvokeTransaction">,
  "request" | "requestAsync"
> & {
  send: (args?: Call[]) => void;
  sendAsync: (
    args?: Call[],
  ) => Promise<RequestResult<"wallet_addInvokeTransaction">>;
};

/** Hook to send one or several transaction(s) to the network. */
export function useSendTransaction(
  props: UseSendTransactionProps,
): UseSendTransactionResult {
  const { calls, ...rest } = props;

  const params = calls ? { calls: transformCalls(calls) } : undefined;

  const { request, requestAsync, ...result } = useWalletRequest({
    type: "wallet_addInvokeTransaction",
    params,
    ...rest,
  });

  const send = (args?: Call[]) => {
    return request(
      args
        ? {
            params: { calls: transformCalls(args) },
            type: "wallet_addInvokeTransaction",
          }
        : undefined,
    );
  };

  const sendAsync = (args?: Call[]) => {
    return requestAsync(
      args
        ? {
            params: { calls: transformCalls(args) },
            type: "wallet_addInvokeTransaction",
          }
        : undefined,
    );
  };

  return {
    send,
    sendAsync,
    ...result,
  };
}

function transformCalls(calls: Call[]) {
  return calls.map(
    (call) =>
      ({
        contract_address: call.contractAddress,
        entry_point: call.entrypoint,
        calldata: call.calldata,
      }) as RequestCall,
  );
}

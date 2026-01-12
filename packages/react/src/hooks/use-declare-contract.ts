import type { AddDeclareTransactionParameters } from "@starknet-io/types-js";

import {
  type RequestArgs,
  type RequestResult,
  type UseWalletRequestProps,
  type UseWalletRequestResult,
  useWalletRequest,
} from "./use-wallet-request";

export type UseDeclareContractArgs = AddDeclareTransactionParameters;

export type UseDeclareContractProps = Omit<
  UseWalletRequestProps<"wallet_addDeclareTransaction">,
  keyof RequestArgs<"wallet_addDeclareTransaction">
> & {
  params?: UseDeclareContractArgs;
};

export type UseDeclareContractResult = Omit<
  UseWalletRequestResult<"wallet_addDeclareTransaction">,
  "request" | "requestAsync"
> & {
  declare: (args?: UseDeclareContractArgs) => void;
  declareAsync: (
    args?: UseDeclareContractArgs,
  ) => Promise<RequestResult<"wallet_addDeclareTransaction">>;
};

/**
 * Hook to declare a new class in the current network.
 *
 */
export function useDeclareContract(
  props: UseDeclareContractProps,
): UseDeclareContractResult {
  const { params, ...rest } = props;

  const { request, requestAsync, ...result } = useWalletRequest({
    type: "wallet_addDeclareTransaction",
    params,
    ...rest,
  });

  const declare = (args?: UseDeclareContractArgs) => {
    return request(
      args
        ? {
            params: args,
            type: "wallet_addDeclareTransaction",
          }
        : undefined,
    );
  };

  const declareAsync = (args?: UseDeclareContractArgs) => {
    return requestAsync(
      args
        ? {
            params: args,
            type: "wallet_addDeclareTransaction",
          }
        : undefined,
    );
  };

  return {
    declare,
    declareAsync,
    ...result,
  };
}

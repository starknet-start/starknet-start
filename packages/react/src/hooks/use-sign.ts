import type { TypedData } from "@starknet-io/types-js";

import {
  type RequestArgs,
  type RequestResult,
  type UseWalletRequestProps,
  type UseWalletRequestResult,
  useWalletRequest,
} from "./use-wallet-request";

export type UseSignTypedDataArgs = TypedData;

export type UseSignTypedDataProps = Omit<
  UseWalletRequestProps<"wallet_signTypedData">,
  keyof RequestArgs<"wallet_signTypedData">
> & {
  params?: UseSignTypedDataArgs;
};

export type UseSignTypedDataResult = Omit<
  UseWalletRequestResult<"wallet_signTypedData">,
  "request" | "requestAsync"
> & {
  signTypedData: (args?: UseSignTypedDataArgs) => void;
  signTypedDataAsync: (
    args?: UseSignTypedDataArgs,
  ) => Promise<RequestResult<"wallet_signTypedData">>;
};

export function useSignTypedData(
  props: UseSignTypedDataProps,
): UseSignTypedDataResult {
  const { params, ...rest } = props;

  const { request, requestAsync, ...result } = useWalletRequest({
    type: "wallet_signTypedData",
    params,
    ...rest,
  });

  const signTypedData = (args?: UseSignTypedDataArgs) => {
    return request(
      args
        ? {
            params: args,
            type: "wallet_signTypedData",
          }
        : undefined,
    );
  };

  const signTypedDataAsync = (args?: UseSignTypedDataArgs) => {
    return requestAsync(
      args
        ? {
            params: args,
            type: "wallet_signTypedData",
          }
        : undefined,
    );
  };

  return {
    signTypedData,
    signTypedDataAsync,
    ...result,
  };
}

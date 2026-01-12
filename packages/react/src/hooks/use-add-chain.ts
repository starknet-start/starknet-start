import type { AddStarknetChainParameters } from "@starknet-io/types-js";

import {
  type RequestArgs,
  type RequestResult,
  type UseWalletRequestProps,
  type UseWalletRequestResult,
  useWalletRequest,
} from "./use-wallet-request";

export type UseAddChainArgs = AddStarknetChainParameters;

export type UseAddChainProps = Omit<
  UseWalletRequestProps<"wallet_addStarknetChain">,
  keyof RequestArgs<"wallet_addStarknetChain">
> & {
  params?: UseAddChainArgs;
};

export type UseAddChainResult = Omit<
  UseWalletRequestResult<"wallet_addStarknetChain">,
  "request" | "requestAsync"
> & {
  addChain: (args?: UseAddChainArgs) => void;
  addChainAsync: (
    args?: UseAddChainArgs,
  ) => Promise<RequestResult<"wallet_addStarknetChain">>;
};

/**
 * Hook to add a new network in the list of networks of the wallet.
 */
export function useAddChain(props: UseAddChainProps): UseAddChainResult {
  const { params, ...rest } = props;

  const { request, requestAsync, ...result } = useWalletRequest({
    type: "wallet_addStarknetChain",
    params,
    ...rest,
  });

  const addChain = (args?: UseAddChainArgs) => {
    return request(
      args
        ? {
            params: args,
            type: "wallet_addStarknetChain",
          }
        : undefined,
    );
  };

  const addChainAsync = (args?: UseAddChainArgs) => {
    return requestAsync(
      args
        ? {
            params: args,
            type: "wallet_addStarknetChain",
          }
        : undefined,
    );
  };

  return {
    addChain,
    addChainAsync,
    ...result,
  };
}

import type { SwitchStarknetChainParameters } from "@starknet-io/types-js";

import {
  type RequestArgs,
  type RequestResult,
  type UseWalletRequestProps,
  type UseWalletRequestResult,
  useWalletRequest,
} from "./use-wallet-request";

export type UseSwitchChainArgs = SwitchStarknetChainParameters;

export type UseSwitchChainProps = Omit<
  UseWalletRequestProps<"wallet_switchStarknetChain">,
  keyof RequestArgs<"wallet_switchStarknetChain">
> & {
  params?: UseSwitchChainArgs;
};

export type UseSwitchChainResult = Omit<
  UseWalletRequestResult<"wallet_switchStarknetChain">,
  "request" | "requestAsync"
> & {
  switchChain: (args?: UseSwitchChainArgs) => void;
  switchChainAsync: (
    args?: UseSwitchChainArgs,
  ) => Promise<RequestResult<"wallet_switchStarknetChain">>;
};

/**
 * Hook to change the current network of the wallet.
 *
 */
export function useSwitchChain(
  props: UseSwitchChainProps,
): UseSwitchChainResult {
  const { params, ...rest } = props;

  const { request, requestAsync, ...result } = useWalletRequest({
    type: "wallet_switchStarknetChain",
    params,
    ...rest,
  });

  const switchChain = (args?: UseSwitchChainArgs) => {
    return request(
      args
        ? {
            params: args,
            type: "wallet_switchStarknetChain",
          }
        : undefined,
    );
  };

  const switchChainAsync = (args?: UseSwitchChainArgs) => {
    return requestAsync(
      args
        ? {
            params: args,
            type: "wallet_switchStarknetChain",
          }
        : undefined,
    );
  };

  return {
    switchChain,
    switchChainAsync,
    ...result,
  };
}

import type { WatchAssetParameters } from "@starknet-io/types-js";
import {
  type RequestArgs,
  type RequestResult,
  type UseWalletRequestProps,
  type UseWalletRequestResult,
  useWalletRequest,
} from "./use-wallet-request";

export type UseWatchAssetArgs = WatchAssetParameters;

export type UseWatchAssetProps = Omit<
  UseWalletRequestProps<"wallet_watchAsset">,
  keyof RequestArgs<"wallet_watchAsset">
> & {
  params?: UseWatchAssetArgs;
};

export type UseWatchAssetResult = Omit<
  UseWalletRequestResult<"wallet_watchAsset">,
  "request" | "requestAsync"
> & {
  watchAsset: (args?: UseWatchAssetArgs) => void;
  watchAssetAsync: (
    args?: UseWatchAssetArgs,
  ) => Promise<RequestResult<"wallet_watchAsset">>;
};

/**
 * Hook to watch an asset in the wallet.
 *
 */

export function useWatchAsset(props: UseWatchAssetProps): UseWatchAssetResult {
  const { params, ...rest } = props;

  const { request, requestAsync, ...result } = useWalletRequest({
    type: "wallet_watchAsset",
    params,
    ...rest,
  });

  const watchAsset = (args?: UseWatchAssetArgs) => {
    return request(
      args
        ? {
            params: args,
            type: "wallet_watchAsset",
          }
        : undefined,
    );
  };

  const watchAssetAsync = (args?: UseWatchAssetArgs) => {
    return requestAsync(
      args
        ? {
            params: args,
            type: "wallet_watchAsset",
          }
        : undefined,
    );
  };

  return {
    watchAsset,
    watchAssetAsync,
    ...result,
  };
}

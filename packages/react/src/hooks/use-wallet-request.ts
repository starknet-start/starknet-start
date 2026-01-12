import type { RpcTypeToMessageMap } from "@starknet-io/types-js";
import {
  type RequestArgs,
  type RequestMessageTypes,
  type RequestResult,
  walletRequestMutationFn,
  walletRequestMutationKey,
} from "@starknet-start/query";
import { useCallback } from "react";
import { useStarknet } from "../context/starknet";
import {
  type UseMutationProps,
  type UseMutationResult,
  useMutation,
} from "../query";

export type { RequestArgs, RequestResult, RequestMessageTypes };

type MutationResult<T extends RequestMessageTypes> = UseMutationResult<
  RpcTypeToMessageMap[T]["result"],
  Error,
  RequestArgs<T>
>;

/** Arguments for `useWalletRequest` hook. */
export type UseWalletRequestProps<T extends RequestMessageTypes> =
  RequestArgs<T> & UseMutationProps<RequestResult<T>, Error, RequestArgs<T>>;

/** Value returned from `useWalletRequest`. */
export type UseWalletRequestResult<T extends RequestMessageTypes> = Omit<
  MutationResult<T>,
  "mutate" | "mutateAsync"
> & {
  request: (args?: RequestArgs<T>) => void;
  requestAsync: (args?: RequestArgs<T>) => Promise<RequestResult<T>>;
};

/** Hook to perform request calls to connected wallet */
export function useWalletRequest<T extends RequestMessageTypes>(
  props: UseWalletRequestProps<T>,
): UseWalletRequestResult<T> {
  const { connected: connector } = useStarknet();

  const { type, params, ...rest } = props;

  const { mutate, mutateAsync, ...result } = useMutation({
    mutationKey: walletRequestMutationKey({ type, params }),
    mutationFn: walletRequestMutationFn({ connector }),
    ...rest,
  });

  const request = useCallback(
    (args?: RequestArgs<T>) => mutate(args ?? { type, params }),
    [mutate, type, params],
  );

  const requestAsync = useCallback(
    (args?: RequestArgs<T>) => mutateAsync(args ?? { type, params }),
    [mutateAsync, type, params],
  );

  return {
    request,
    requestAsync,
    ...result,
  };
}

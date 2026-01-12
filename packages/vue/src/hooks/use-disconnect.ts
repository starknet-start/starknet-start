import { useStarknet } from "../context/starknet";
import {
  type UseMutationProps,
  type UseMutationResult,
  useMutation,
} from "../query";

type MutationResult = UseMutationResult<void, Error, void, unknown>;

export type UseDisconnectProps = UseMutationProps<void, Error, void>;

export type UseDisconnectResult = Omit<
  MutationResult,
  "mutate" | "mutateAsync"
> & {
  disconnect: MutationResult["mutate"];
  disconnectAsync: MutationResult["mutateAsync"];
};

export function useDisconnect(
  props: UseDisconnectProps = {},
): UseDisconnectResult {
  const starknet = useStarknet();

  const { mutate, mutateAsync, ...result } = useMutation<
    void,
    Error,
    void,
    unknown
  >({
    mutationKey: [{ entity: "disconnect", chainId: starknet.chain.name }],
    mutationFn: starknet.disconnect,
    ...((props ?? {}) as UseMutationProps<void, Error, void, unknown>),
  });

  return {
    disconnect: mutate,
    disconnectAsync: mutateAsync,
    ...result,
  };
}

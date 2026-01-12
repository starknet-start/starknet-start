import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";
import {
  type ConnectVariables,
  connectMutationFn,
  connectMutationKey,
} from "@starknet-start/query";
import { useCallback } from "react";
import { useStarknet } from "../context/starknet";
import {
  type UseMutationProps,
  type UseMutationResult,
  useMutation,
} from "../query";

export type { ConnectVariables };

type MutationResult = UseMutationResult<void, Error, ConnectVariables>;

export type UseConnectProps = UseMutationProps<void, Error, ConnectVariables>;

/** Value returned from `useConnect`. */
export type UseConnectResult = Omit<
  MutationResult,
  "mutate" | "mutateAsync"
> & {
  /** Current connector. */
  connector?: WalletWithStarknetFeatures;
  /** Connectors available for the current chain. */
  connectors: WalletWithStarknetFeatures[];
  /** Connector waiting approval for connection. */
  pendingConnector?: WalletWithStarknetFeatures;
  /** Connect to a new connector. */
  connect: (args?: ConnectVariables) => void;
  /** Connect to a new connector. */
  connectAsync: (args?: ConnectVariables) => Promise<void>;
};

/**
 * Hook for connecting to a StarkNet wallet.
 *
 * @remarks
 *
 * Use this to implement a "connect wallet" component.
 *
 * ```
 */
export function useConnect(props: UseConnectProps = {}): UseConnectResult {
  const {
    connected: connector,
    injectedWallets,
    extraWallets,
    connect: connect_,
    chain,
  } = useStarknet();

  const connectWrapper = useCallback(
    async (args: ConnectVariables): Promise<void> => {
      if (!args.connector) {
        throw new Error("Connector is required");
      }
      await connect_(args.connector);
    },
    [connect_],
  );

  const { mutate, mutateAsync, variables, ...result } = useMutation({
    mutationKey: connectMutationKey({ chainId: chain.name }),
    mutationFn: connectMutationFn({ connect: connectWrapper }),
    ...props,
  });

  const connect = useCallback(
    (args?: ConnectVariables) => mutate(args ?? { connector }),
    [mutate, connector],
  );

  const connectAsync = useCallback(
    (args?: ConnectVariables) => mutateAsync(args ?? { connector }),
    [mutateAsync, connector],
  );

  return {
    connector,
    connectors: [...injectedWallets, ...extraWallets],
    pendingConnector: variables?.connector,
    connect,
    connectAsync,
    variables,
    ...result,
  };
}

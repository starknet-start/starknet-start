import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";
import type { Address } from "@starknet-start/chains";
import { useCallback, useEffect, useState } from "react";
import { useStarknetAccount } from "../context/account";
import { useStarknet } from "../context/starknet";
import { getAddress } from "../utils";
import { useProvider } from "./use-provider";

/** Account connection status. */
export type AccountStatus =
  | "connected"
  | "disconnected"
  | "connecting"
  | "reconnecting";

/** Value returned from `useAccount`. */
export type UseAccountResult = {
  /** The address of the connected account. */
  address?: Address;
  /** The connected connector. */
  connector?: WalletWithStarknetFeatures;
  /** Connector's chain id */
  chainId?: bigint;
  /** True if connecting. */
  isConnecting?: boolean;
  /** True if reconnecting. */
  isReconnecting?: boolean;
  /** True if connected. */
  isConnected?: boolean;
  /** True if disconnected. */
  isDisconnected?: boolean;
  /** The connection status. */
  status: AccountStatus;
};

/**
 * Hook for accessing the account and its connection status.
 *
 * @remarks
 *
 * This hook is used to access the `AccountInterface` object provided by the
 * currently connected wallet.
 */
export function useAccount(): UseAccountResult {
  const { chain, connected: connector } = useStarknet();

  const { provider } = useProvider();
  const { address: connectedAddress } = useStarknetAccount();

  const [state, setState] = useState<UseAccountResult>(
    connectedAddress === undefined
      ? {
          status: "disconnected",
        }
      : {
          status: "connected" as const,
          connector,
          chainId: chain.id,
          address: getAddress(connectedAddress),
          isConnected: true,
          isConnecting: false,
          isDisconnected: false,
          isReconnecting: false,
        },
  );

  const refreshState = useCallback(async () => {
    if (connector && provider && connectedAddress) {
      setState({
        status: "connected" as const,
        connector,
        chainId: chain.id,
        address: getAddress(connectedAddress),
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
      });
    } else {
      return setState({
        status: "disconnected" as const,
        connector: undefined,
        chainId: undefined,
        address: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
      });
    }
  }, [provider, connector, chain.id, connectedAddress]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  return state;
}

import type { Address } from "@starknet-start/chains";
import type { AccountInterface } from "starknet";
import { reactive, shallowRef, watch } from "vue";

import type { Connector } from "../connectors";
import { useStarknet } from "../context/starknet";
import { getAddress } from "../utils";
import { useProvider } from "./use-provider";

export type AccountStatus =
  | "connected"
  | "disconnected"
  | "connecting"
  | "reconnecting";

export interface UseAccountResult {
  account?: AccountInterface;
  address?: Address;
  connector?: Connector;
  chainId?: bigint;
  isConnecting?: boolean;
  isReconnecting?: boolean;
  isConnected?: boolean;
  isDisconnected?: boolean;
  status: AccountStatus;
}

export function useAccount(): UseAccountResult {
  const starknet = useStarknet();
  const { provider, paymasterProvider } = useProvider();

  const state = reactive<UseAccountResult>({ status: "disconnected" });

  const setConnectedState = (connectedAccount?: AccountInterface) => {
    state.status = "connected";
    state.connector = starknet.connector;
    state.chainId = starknet.chain.id;
    state.account = connectedAccount;
    state.address = starknet.address ? getAddress(starknet.address) : undefined;
    state.isConnected = true;
    state.isConnecting = false;
    state.isDisconnected = false;
    state.isReconnecting = false;
  };

  const setDisconnectedState = () => {
    state.status = "disconnected";
    state.connector = undefined;
    state.chainId = undefined;
    state.account = undefined;
    state.address = undefined;
    state.isConnected = false;
    state.isConnecting = false;
    state.isDisconnected = true;
    state.isReconnecting = false;
  };

  if (starknet.address !== undefined) {
    setConnectedState();
  }

  const accountRef = shallowRef<AccountInterface | undefined>();

  const refreshState = async () => {
    if (starknet.connector && provider && starknet.address) {
      setConnectedState(accountRef.value);

      try {
        const connectedAccount = (await starknet.connector.account(
          provider,
          paymasterProvider,
        )) as AccountInterface;
        accountRef.value = connectedAccount;
        setConnectedState(connectedAccount);
      } catch {
        // ignore account resolution errors
      }
    } else {
      accountRef.value = undefined;
      setDisconnectedState();
    }
  };

  watch(
    () => [
      starknet.connector,
      provider,
      paymasterProvider,
      starknet.address,
      starknet.chain,
    ],
    () => {
      refreshState().catch(() => {
        /* ignore */
      });
    },
    { immediate: true },
  );

  return state as unknown as UseAccountResult;
}

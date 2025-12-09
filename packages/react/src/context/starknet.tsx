import {
  GetStarknetProvider,
  type UseConnect,
  useConnect as useGetStarknetConnect,
  useStarknetProvider,
} from "@starknet-io/get-starknet-modal";
import {
  type Address,
  type Chain,
  mainnet,
  sepolia,
} from "@starknet-start/chains";
import type { ExplorerFactory } from "@starknet-start/explorers";
import type { ChainProviderFactory } from "@starknet-start/providers";
import {
  avnuPaymasterProvider,
  type ChainPaymasterFactory,
} from "@starknet-start/providers/paymaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AccountInterface,
  PaymasterRpc,
  ProviderInterface,
} from "starknet";
import { constants, WalletAccountV5 } from "starknet";
import { AccountProvider } from "./account";

type Simplify<T> = { [K in keyof T]: T[K] } & {};

type GetStarknetState = ReturnType<typeof useStarknetProvider>;
type GetStarknetProviderProps = Parameters<typeof GetStarknetProvider>[0];

const defaultQueryClient = new QueryClient();

export type StarknetState = Simplify<
  {
    chains: Chain[];
    chain: Chain;
    explorer?: ExplorerFactory;
    provider: ProviderInterface;
    paymasterProvider?: PaymasterRpc;
    error?: Error;
  } & UseConnect &
    GetStarknetState
>;

const StarknetContext = createContext<StarknetState | undefined>(undefined);

export type StarknetProviderProps = Simplify<
  StarknetProviderInnerProps &
    Omit<GetStarknetProviderProps, "children"> & { children?: React.ReactNode }
>;

type StarknetProviderInnerProps = {
  /** Chains supported by the app. */
  chains: Chain[];
  /** Provider to use. */
  provider: ChainProviderFactory;
  /** Paymaster provider to use. */
  paymasterProvider?: ChainPaymasterFactory;
  /** Explorer to use. */
  explorer?: ExplorerFactory;
  /** Connect the first available connector on page load. */
  autoConnect?: boolean;
  /** React-query client to use. */
  queryClient?: QueryClient;
  /** Application. */
  children?: React.ReactNode;
  /** Default chain to use when wallet is not connected */
  defaultChainId?: bigint;
};

export function StarknetProvider(props: StarknetProviderProps) {
  const { recommendedWallets, extraWallets, store, children, ...rest } = props;
  return (
    <GetStarknetProvider
      extraWallets={extraWallets}
      recommendedWallets={recommendedWallets}
      store={store}
    >
      <StarknetProviderInner {...rest}>{children}</StarknetProviderInner>
    </GetStarknetProvider>
  );
}

function StarknetProviderInner({
  chains,
  provider,
  // autoConnect,
  children,
  defaultChainId,
  explorer,
  paymasterProvider,
  queryClient,
}: StarknetProviderInnerProps) {
  const { connect, disconnect, isConnecting, isError, connected } =
    useGetStarknetConnect();
  const {
    extraWallets,
    injectedWallets,
    onSelectedChange,
    recommendedWallets,
    wallets,
    selected,
  } = useStarknetProvider();

  const defaultChain = defaultChainId
    ? (chains.find((c) => c.id === defaultChainId) ?? chains[0])
    : chains[0];

  if (defaultChain === undefined) {
    throw new Error("Must provide at least one chain.");
  }

  // check for duplicated ids in the chains list
  const seen = new Set<bigint>();

  for (const chain of chains) {
    if (seen.has(chain.id)) {
      throw new Error(`Duplicated chain id found: ${chain.id}`);
    }
    seen.add(chain.id);
  }

  const { provider: defaultProvider } = useMemo(
    () => providerForChain(defaultChain, provider),
    [defaultChain, provider],
  );
  const _paymasterProvider = useMemo(
    () => paymasterProvider ?? avnuPaymasterProvider({}),
    [paymasterProvider],
  );
  const { paymasterProvider: defaultPaymasterProvider } = useMemo(
    () => paymasterProviderForChain(defaultChain, _paymasterProvider),
    [defaultChain, _paymasterProvider],
  );

  const [currentChain, setCurrentChain] = useState<Chain>(defaultChain);
  const [currentProvider, setCurrentProvider] =
    useState<ProviderInterface>(defaultProvider);
  const [currentPaymasterProvider, setCurrentPaymasterProvider] = useState<
    PaymasterRpc | undefined
  >(defaultPaymasterProvider);
  const [address, setAddress] = useState<Address | undefined>();
  const [account, setAccount] = useState<AccountInterface | undefined>();

  const updateChainAndProvider = useCallback(
    (chainId: bigint) => {
      const targetChain = chains.find((c) => c.id === chainId);
      if (!targetChain) return;

      const { provider: newProvider } = providerForChain(targetChain, provider);
      const { paymasterProvider: newPaymasterProvider } =
        paymasterProviderForChain(targetChain, _paymasterProvider);

      setCurrentChain(targetChain);
      setCurrentProvider(newProvider);
      setCurrentPaymasterProvider(newPaymasterProvider);
    },
    [chains, provider, _paymasterProvider],
  );

  useEffect(() => {
    if (connected) {
      // Get address from wallet
      const walletAddress = connected.accounts?.[0]?.address as Address;
      setAddress(walletAddress);

      // Get chain from wallet if available
      if (connected.chains?.[0]) {
        try {
          const chainIdentifier = connected.chains[0];
          const parts = chainIdentifier.split(":");
          const chainIdHex = parts[parts.length - 1];
          const chainId = BigInt(chainIdHex);
          if (chainId !== currentChain.id) {
            updateChainAndProvider(chainId);
          }
        } catch (error) {
          console.error("Failed to parse chain ID:", error);
        }
      }

      setAccount(
        new WalletAccountV5({
          address: walletAddress,
          provider: currentProvider,
          walletProvider: connected,
          paymaster: currentPaymasterProvider,
        }),
      );
    } else {
      setAddress(undefined);
      setAccount(undefined);
      setCurrentChain(defaultChain);
      setCurrentProvider(defaultProvider);
      setCurrentPaymasterProvider(defaultPaymasterProvider);
    }
  }, [
    defaultChain,
    defaultPaymasterProvider,
    defaultProvider,
    connected,
    updateChainAndProvider,
    currentProvider,
    currentPaymasterProvider,
    currentChain,
  ]);

  const state: StarknetState = useMemo(
    () => ({
      connect,
      disconnect,
      isConnecting,
      isError,
      connected,
      chains,
      chain: currentChain,
      explorer,
      provider: currentProvider,
      paymasterProvider: currentPaymasterProvider,
      error: undefined,
      extraWallets,
      injectedWallets,
      onSelectedChange,
      recommendedWallets,
      wallets,
      selected,
    }),
    [
      connect,
      disconnect,
      isConnecting,
      isError,
      connected,
      chains,
      currentChain,
      explorer,
      currentProvider,
      currentPaymasterProvider,
      extraWallets,
      injectedWallets,
      onSelectedChange,
      recommendedWallets,
      wallets,
      selected,
    ],
  );

  return (
    <QueryClientProvider client={queryClient ?? defaultQueryClient}>
      <StarknetContext.Provider value={state}>
        <AccountProvider address={address} account={account}>
          {children}
        </AccountProvider>
      </StarknetContext.Provider>
    </QueryClientProvider>
  );
}

export function useStarknet(): StarknetState {
  const context = useContext(StarknetContext);
  if (!context) {
    throw new Error("useStarknet must be used within a StarknetProvider");
  }
  return context;
}

export function useStarknetManager() {
  const { connect, disconnect } = useStarknet();
  return { connect, disconnect };
}

function providerForChain(
  chain: Chain,
  factory: ChainProviderFactory,
): { chain: Chain; provider: ProviderInterface } {
  const provider = factory(chain);
  if (provider) {
    return { chain, provider };
  }
  throw new Error(`No provider found for chain ${chain.name}`);
}

function paymasterProviderForChain(
  chain: Chain,
  factory: ChainPaymasterFactory,
): { chain: Chain; paymasterProvider: PaymasterRpc } {
  const paymasterProvider = factory(chain);
  if (paymasterProvider) {
    return { chain, paymasterProvider };
  }
  throw new Error(`No paymaster provider found for chain ${chain.name}`);
}

export function starknetChainId(
  chainId: bigint,
): constants.StarknetChainId | undefined {
  switch (chainId) {
    case mainnet.id:
      return constants.StarknetChainId.SN_MAIN;
    case sepolia.id:
      return constants.StarknetChainId.SN_SEPOLIA;
    default:
      return undefined;
  }
}

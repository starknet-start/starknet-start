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
import {
  QueryClient,
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
  constants,
  type PaymasterRpc,
  type ProviderInterface,
} from "starknet";
import type { App, InjectionKey } from "vue";
import { inject, ref, shallowRef } from "vue";
import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-wallet-standard/features";

const StarknetContextKey: InjectionKey<StarknetState> =
  Symbol("StarknetContext");

const defaultQueryClient = new QueryClient();

export interface StarknetState {
  connector?: WalletWithStarknetFeatures;
  connect: ({ connector }: { connector?: WalletWithStarknetFeatures }) => Promise<void>;
  disconnect: () => Promise<void>;
  connectors: WalletWithStarknetFeatures[];
  explorer?: ExplorerFactory;
  chains: Chain[];
  chain: Chain;
  provider: ProviderInterface;
  paymasterProvider?: PaymasterRpc;
  error?: Error;
  address?: Address;
}

export interface StarknetManagerOptions {
  chains: Chain[];
  provider: ChainProviderFactory;
  paymasterProvider?: ChainPaymasterFactory;
  connectors?: WalletWithStarknetFeatures[];
  explorer?: ExplorerFactory;
  autoConnect?: boolean;
  defaultChainId?: bigint;
}

type SafeStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

function getStorage(): SafeStorage | undefined {
  const globalObj = globalThis as { localStorage?: SafeStorage };
  return globalObj.localStorage;
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

function createStarknetManager({
  chains,
  provider,
  paymasterProvider,
  explorer,
  connectors = [],
  autoConnect = false,
  defaultChainId,
}: StarknetManagerOptions) {
  const defaultChain = defaultChainId
    ? (chains.find((c) => c.id === defaultChainId) ?? chains[0])
    : chains[0];
  if (defaultChain === undefined) {
    throw new Error("Must provide at least one chain.");
  }

  const seen = new Set<bigint>();
  for (const chain of chains) {
    if (seen.has(chain.id)) {
      throw new Error(`Duplicated chain id found: ${chain.id}`);
    }
    seen.add(chain.id);
  }

  const { provider: defaultProvider } = providerForChain(
    defaultChain,
    provider,
  );
  const paymasterFactory = paymasterProvider ?? avnuPaymasterProvider({});
  const { paymasterProvider: defaultPaymasterProvider } =
    paymasterProviderForChain(defaultChain, paymasterFactory);

  const connectorRef = shallowRef<WalletWithStarknetFeatures | undefined>();
  const currentChain = ref(defaultChain);
  const currentProvider = shallowRef<ProviderInterface>(defaultProvider);
  const currentPaymasterProvider = shallowRef<PaymasterRpc | undefined>(
    defaultPaymasterProvider,
  );
  const currentAddress = ref<Address | undefined>();
  const error = shallowRef<Error | undefined>();

  const updateChainAndProvider = ({ chainId }: { chainId?: bigint }) => {
    if (!chainId) return;
    const targetChain = chains.find((chain) => chain.id === chainId);
    if (!targetChain) return;
    const { chain, provider: newProvider } = providerForChain(
      targetChain,
      provider,
    );
    const { paymasterProvider: newPaymasterProvider } =
      paymasterProviderForChain(targetChain, paymasterFactory);
    currentChain.value = chain;
    currentProvider.value = newProvider;
    currentPaymasterProvider.value = newPaymasterProvider;
  };

  const handleWalletWithStarknetFeaturesChange = async ({
    chainId,
    account: address,
  }: WalletWithStarknetFeaturesData) => {
    if (chainId) {
      updateChainAndProvider({ chainId });
    }
    if (address && connectorRef.value) {
      currentAddress.value = address as Address;
    }
  };

  const disconnect = async () => {
    currentAddress.value = undefined;
    currentProvider.value = defaultProvider;
    currentPaymasterProvider.value = defaultPaymasterProvider;
    currentChain.value = defaultChain;

    if (autoConnect) {
      getStorage()?.removeItem("lastUsedWalletWithStarknetFeatures");
    }

    if (!connectorRef.value) return;
    connectorRef.value.off("change", handleWalletWithStarknetFeaturesChange);
    connectorRef.value.off("disconnect", disconnect);

    try {
      await connectorRef.value.disconnect();
    } catch {}

    connectorRef.value = undefined;
  };

  const connect = async ({ connector }: { connector?: WalletWithStarknetFeatures }) => {
    if (!connector) {
      throw new Error("Must provide a connector.");
    }

    const needsListenerSetup = connectorRef.value?.id !== connector.id;
    if (needsListenerSetup) {
      connectorRef.value?.off("change", handleWalletWithStarknetFeaturesChange);
      connectorRef.value?.off("disconnect", disconnect);
    }

    try {
      const { chainId, account: address } = await connector.connect({
        chainIdHint: defaultChain.id,
      });

      if (address !== currentAddress.value) {
        connectorRef.value = connector;
        currentAddress.value = address as Address;
      }

      if (autoConnect) {
        getStorage()?.setItem("lastUsedWalletWithStarknetFeatures", connector.id);
      }

      if (needsListenerSetup) {
        connector.on("change", handleWalletWithStarknetFeaturesChange);
        connector.on("disconnect", disconnect);
      }

      updateChainAndProvider({ chainId });
    } catch (err) {
      error.value = new WalletWithStarknetFeaturesNotFoundError();
      throw err;
    }
  };

  if (autoConnect && !connectorRef.value) {
    const storage = getStorage();
    const lastConnectedWalletWithStarknetFeaturesId = storage?.getItem("lastUsedWalletWithStarknetFeatures");
    if (lastConnectedWalletWithStarknetFeaturesId) {
      const lastConnectedWalletWithStarknetFeatures = connectors.find(
        (connector) => connector.id === lastConnectedWalletWithStarknetFeaturesId,
      );
      if (lastConnectedWalletWithStarknetFeatures) {
        lastConnectedWalletWithStarknetFeatures
          .ready()
          .then((ready) => {
            if (!ready) return;
            connect({ connector: lastConnectedWalletWithStarknetFeatures }).catch(() => {
              /* ignore */
            });
          })
          .catch(() => {
            /* ignore */
          });
      }
    }
  }

  const expose: StarknetState = {
    get connector() {
      return connectorRef.value;
    },
    connectors,
    explorer,
    chains,
    get chain() {
      return currentChain.value;
    },
    get provider() {
      return currentProvider.value;
    },
    get paymasterProvider() {
      return currentPaymasterProvider.value;
    },
    get address() {
      return currentAddress.value;
    },
    get error() {
      return error.value;
    },
    connect,
    disconnect,
  };

  return expose;
}

export interface StarknetPluginOptions extends StarknetManagerOptions {
  queryClient?: QueryClient;
  vueQueryOptions?: VueQueryPluginOptions;
}

export function createStarknetVue(options: StarknetPluginOptions) {
  const manager = createStarknetManager(options);
  const queryClient = options.queryClient ?? defaultQueryClient;

  return {
    install(app: App) {
      app.use(VueQueryPlugin, { queryClient, ...options.vueQueryOptions });
      app.provide(StarknetContextKey, manager);
    },
    manager,
  };
}

export function useStarknet(): StarknetState {
  const state = inject(StarknetContextKey);
  if (!state) {
    throw new Error(
      "useStarknet must be used after installing createStarknetVue plugin",
    );
  }
  return state;
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

import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";
import {
  StandardConnect,
  StandardDisconnect,
  StandardEvents,
  type StandardEventsListeners,
  type StandardEventsNames,
  StarknetWalletApi,
} from "@starknet-io/get-starknet-core";
import type {
  RequestFn,
  RequestFnCall,
  RpcMessage,
  RpcTypeToMessageMap,
} from "@starknet-io/types-js";
import {
  type AddDeclareTransactionParameters,
  type AddInvokeTransactionParameters,
  Permission,
  type Call as RequestCall,
  type SwitchStarknetChainParameters,
  type TypedData,
} from "@starknet-io/types-js";
import type { Chain } from "@starknet-start/chains";
import { devnet, mainnet, sepolia } from "@starknet-start/chains";
import type {
  StandardConnectMethod,
  StandardDisconnectMethod,
  StandardEventsOnMethod,
} from "@wallet-standard/features";
import type { AccountInterface, Call } from "starknet";
import { UserRejectedRequestError } from "../errors";

export type MockWalletOptions = {
  id: string;
  name: string;
  icon?: string;
  available?: boolean;
  failConnect?: boolean;
  rejectRequest?: boolean;
  rejectDeclare?: boolean;
};

export type MockWalletAccounts = {
  sepolia: AccountInterface[];
  mainnet: AccountInterface[];
};

export type IdentifierString = `${string}:${string}`;

export function chainToWalletStandardChain(chain: Chain): IdentifierString {
  return `starknet:0x${chain.id.toString(16)}`;
}

function transformCalls(calls: RequestCall[]): Call[] {
  return calls.map(
    (call) =>
      ({
        contractAddress: call.contract_address,
        entrypoint: call.entry_point,
        calldata: call.calldata,
      }) as Call,
  );
}

export class MockWallet implements WalletWithStarknetFeatures {
  readonly version = "1.0.0" as const;
  readonly name: string;
  readonly icon: `data:image/svg+xml;base64,${string}`;

  private _accounts: MockWalletAccounts;
  private _accountIndex = 0;
  private _connected = false;
  private _chainId: bigint = devnet.id;
  private _options: MockWalletOptions;

  private _listeners: {
    [E in StandardEventsNames]?: StandardEventsListeners[E][];
  } = {};

  constructor(accounts: MockWalletAccounts, options: MockWalletOptions) {
    if (accounts.mainnet.length === 0 || accounts.sepolia.length === 0) {
      throw new Error("MockWallet: accounts must not be empty");
    }

    this._accounts = accounts;
    this._options = options;
    this.name = options.name;
    this.icon = "data:image/svg+xml;base64,mock";
  }

  get chains(): readonly IdentifierString[] {
    const currentChain = this._getCurrentChain();
    return [chainToWalletStandardChain(currentChain)];
  }

  get accounts() {
    if (!this._connected) {
      return [];
    }

    const chain = this._getCurrentChain();

    return [
      {
        address: this._currentAccount.address,
        publicKey: new Uint8Array(),
        chains: [chainToWalletStandardChain(chain)],
        features: [],
      },
    ];
  }

  get features(): WalletWithStarknetFeatures["features"] {
    return {
      [StandardConnect]: {
        version: "1.0.0",
        connect: this._connect.bind(this),
      },
      [StandardDisconnect]: {
        version: "1.0.0",
        disconnect: this._disconnect.bind(this),
      },
      [StandardEvents]: {
        version: "1.0.0",
        on: this._on.bind(this),
      },
      [StarknetWalletApi]: {
        id: this._options.id,
        version: "1.0.0",
        request: this._request.bind(this),
        walletVersion: "1.0.0",
      },
    };
  }

  // Public methods for testing
  switchChain(chainId: bigint): void {
    this._chainId = chainId;
    this._accountIndex = 0;
    this._emit("change", { chains: this.chains, accounts: this.accounts });
  }

  switchAccount(accountIndex: number): void {
    this._accountIndex = accountIndex;
    this._emit("change", { accounts: this.accounts });
  }

  readonly instanceId = Math.random().toString(36).slice(2);

  updateOptions(options: Partial<MockWalletOptions>): void {
    this._options = { ...this._options, ...options };
  }

  // Private implementation
  private _connect: StandardConnectMethod = async ({ silent = false } = {}) => {
    if (this._options.failConnect) {
      throw new UserRejectedRequestError();
    }

    if (!this._options.available) {
      throw new Error("Wallet not available");
    }

    const accounts = await this._request({
      type: "wallet_requestAccounts",
      params: { silent_mode: silent },
    });

    if (accounts.length === 0) {
      return { accounts: [] };
    }

    this._connected = true;

    this._emit("change", { accounts: this.accounts });

    return { accounts: this.accounts };
  };

  private _disconnect: StandardDisconnectMethod = async () => {
    this._connected = false;
    this._emit("change", { accounts: [] });
  };

  private _on: StandardEventsOnMethod = (event, listener) => {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event]?.push(listener);

    return (): void => this._off(event, listener);
  };

  private _off<E extends StandardEventsNames>(
    event: E,
    listener: StandardEventsListeners[E],
  ): void {
    const listeners = this._listeners[event];
    if (!listeners) return;

    this._listeners[event] = listeners.filter(
      (existingListener) => listener !== existingListener,
    );
  }

  private _emit<E extends StandardEventsNames>(
    event: E,
    ...args: Parameters<StandardEventsListeners[E]>
  ): void {
    const listeners = this._listeners[event];
    if (!listeners) return;

    for (const listener of listeners) {
      listener.apply(null, args);
    }
  }

  private _request: RequestFn = async <T extends RpcMessage["type"]>(
    call: RequestFnCall<T>,
  ): Promise<RpcTypeToMessageMap[T]["result"]> => {
    const { type, params } = call;

    if (this._options.rejectRequest) {
      throw new UserRejectedRequestError();
    }

    switch (type) {
      case "wallet_requestChainId":
        return `0x${this._chainId.toString(16)}`;

      case "wallet_getPermissions":
        if (this._connected) return [Permission.ACCOUNTS];
        return [];

      case "wallet_requestAccounts":
        return [this._currentAccount.address];

      case "wallet_addStarknetChain":
        return true;

      case "wallet_watchAsset":
        return true;

      case "wallet_switchStarknetChain": {
        if (!params) throw new Error("Params are missing");
        const { chainId } = params as SwitchStarknetChainParameters;
        this.switchChain(BigInt(chainId));
        return true;
      }

      case "wallet_addDeclareTransaction": {
        if (this._options.rejectDeclare) {
          throw new UserRejectedRequestError();
        }
        if (!params) throw new Error("Params are missing");
        const { compiled_class_hash, contract_class, class_hash } =
          params as AddDeclareTransactionParameters;

        return await this._currentAccount.declare({
          compiledClassHash: compiled_class_hash,
          contract: {
            ...contract_class,
            abi: JSON.parse(contract_class.abi),
          },
          classHash: class_hash,
        });
      }

      case "wallet_addInvokeTransaction": {
        if (!params) throw new Error("Params are missing");
        const { calls } = params as AddInvokeTransactionParameters;
        return await this._currentAccount.execute(transformCalls(calls));
      }

      case "wallet_signTypedData": {
        if (!params) throw new Error("Params are missing");
        const { domain, message, primaryType, types } = params as TypedData;
        return (await this._currentAccount.signMessage({
          domain,
          message,
          primaryType,
          types,
        })) as string[];
      }

      default:
        throw new Error(`Unknown request type: ${type}`);
    }
  };

  private get _currentAccount(): AccountInterface {
    let account: AccountInterface | undefined;
    if (this._chainId === mainnet.id) {
      account = this._accounts.mainnet[this._accountIndex];
    } else {
      account = this._accounts.sepolia[this._accountIndex];
    }

    if (!account) {
      throw new Error("No account available");
    }

    return account;
  }

  private _getCurrentChain(): Chain {
    if (this._chainId === mainnet.id) return mainnet;
    if (this._chainId === sepolia.id) return sepolia;
    return devnet;
  }
}

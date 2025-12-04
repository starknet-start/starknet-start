import type {
  StandardEventsChangeProperties,
  WalletWithStarknetFeatures,
} from "@starknet-io/get-starknet-core";
import type {
  AddStarknetChainParameters,
  Signature,
  TypedData,
  WatchAssetParameters,
} from "@starknet-io/types-js";
import {
  Account,
  type AccountInterface,
  type AllowArray,
  type CairoVersion,
  type Call,
  type CompiledSierra,
  type constants,
  type DeclareContractPayload,
  defaultDeployer,
  extractContractHashes,
  type MultiDeployContractResponse,
  type PaymasterInterface,
  type PaymasterOptions,
  type ProviderInterface,
  type UniversalDeployerContractPayload,
} from "starknet";
import {
  addDeclareTransaction,
  addInvokeTransaction,
  addStarknetChain,
  getPermissions,
  requestAccounts,
  signMessage,
  subscribeWalletEvent,
  switchStarknetChain,
  watchAsset,
} from "./connect";
import { stringify } from "./json";
import type { WalletAccountV5Options } from "./types";

/**
 * WalletAccountV5 class.
 * This class is used to create a wallet account that can be used to interact with a Starknet wallet browser extension, using get-starknet v5.
 */
export class WalletAccountV5 extends Account implements AccountInterface {
  public walletProvider: WalletWithStarknetFeatures;

  /**
   * The function to use to unsubscribe from the wallet events.
   * To call before the instance is deleted.
   */
  private unsubscribe: () => void;

  constructor(options: WalletAccountV5Options) {
    super({ ...options, signer: "" }); // At this point unknown address
    this.walletProvider = options.walletProvider;

    // Update Address/network on change
    this.unsubscribe = this.walletProvider.features["standard:events"].on(
      "change",
      (change: StandardEventsChangeProperties) => {
        if (!change.accounts?.length) return;
        if (change.accounts[0].address)
          this.address = change.accounts[0].address;
        if (change.accounts[0].chains)
          this.channel.setChainId(
            change.accounts[0].chains[0].slice(9) as constants.StarknetChainId,
          );
      },
    );
  }

  /**
   * WALLET EVENTS
   */
  public onChange(
    callback: (change: StandardEventsChangeProperties) => void,
  ): void {
    subscribeWalletEvent(this.walletProvider, callback);
  }

  public unsubscribeChange(): void {
    this.unsubscribe();
  }

  /**
   * WALLET SPECIFIC METHODS
   */
  public requestAccounts(silentMode = false) {
    return requestAccounts(this.walletProvider, silentMode);
  }

  public getPermissions() {
    return getPermissions(this.walletProvider);
  }

  public switchStarknetChain(chainId: constants.StarknetChainId) {
    return switchStarknetChain(this.walletProvider, chainId);
  }

  public watchAsset(asset: WatchAssetParameters) {
    return watchAsset(this.walletProvider, asset);
  }

  public addStarknetChain(chain: AddStarknetChainParameters) {
    return addStarknetChain(this.walletProvider, chain);
  }

  /**
   * ACCOUNT METHODS
   */
  override execute(calls: AllowArray<Call>) {
    // biome-ignore lint/suspicious/noExplicitAny: <>
    const txCalls = [].concat(calls as any).map((it) => {
      const { contractAddress, entrypoint, calldata } = it;
      return {
        contract_address: contractAddress,
        entry_point: entrypoint,
        calldata,
      };
    });

    const params = {
      calls: txCalls,
    };

    return addInvokeTransaction(this.walletProvider, params);
  }

  override declare(payload: DeclareContractPayload) {
    const declareContractPayload = extractContractHashes(payload);
    // DISCUSS: HOTFIX: Adapt Abi format
    const pContract = payload.contract as CompiledSierra;
    const cairo1Contract = {
      ...pContract,
      abi: stringify(pContract.abi),
    };
    if (!declareContractPayload.compiledClassHash) {
      throw Error("compiledClassHash is required");
    }
    const params = {
      compiled_class_hash: declareContractPayload.compiledClassHash,
      contract_class: cairo1Contract,
    };
    return addDeclareTransaction(this.walletProvider, params);
  }

  override async deploy(
    payload:
      | UniversalDeployerContractPayload
      | UniversalDeployerContractPayload[],
  ): Promise<MultiDeployContractResponse> {
    const { calls, addresses } = defaultDeployer.buildDeployerCall(
      payload,
      this.address,
    );
    const invokeResponse = await this.execute(calls);
    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }

  override signMessage(typedData: TypedData): Promise<Signature> {
    return signMessage(this.walletProvider, typedData);
  }

  static async connect(
    provider: ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode: boolean = false,
  ) {
    const [accountAddress] = await requestAccounts(walletProvider, silentMode);
    return new WalletAccountV5({
      provider,
      walletProvider,
      address: accountAddress,
      cairoVersion,
      paymaster,
    });
  }

  static async connectSilent(
    provider: ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
  ) {
    return WalletAccountV5.connect(
      provider,
      walletProvider,
      cairoVersion,
      paymaster,
      true,
    );
  }

  // TODO: MISSING ESTIMATES
}

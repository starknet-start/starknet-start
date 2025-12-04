import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";
import type {
  CairoVersion,
  PaymasterInterface,
  PaymasterOptions,
  ProviderInterface,
  ProviderOptions,
} from "starknet";

export type WalletAccountV5Options = {
  provider: ProviderOptions | ProviderInterface;
  walletProvider: WalletWithStarknetFeatures;
  address: string;
  cairoVersion?: CairoVersion;
  paymaster?: PaymasterOptions | PaymasterInterface;
};

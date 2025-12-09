import { Account } from "./account";
import { AddChain } from "./add-chain";
import { Balance } from "./balance";
import { ChangeDefaultNetwork } from "./change-default-network";
import { DeclareContract } from "./declare-contract";
import { DeployContract } from "./deploy-contract";
import { EstimateFees } from "./estimate-fees";
import { Events } from "./events";
import { NonceForAddress } from "./nonce-for-address";
import { PaymasterGasTokens } from "./paymaster-gas-tokens";
import { ReadContract } from "./read-contract";
import { SendGaslessTransaction } from "./send-gasless-transaction";
import { SendTransaction } from "./send-transaction";
import { SignTypedData } from "./sign-typed-data";
import { StarkAddress } from "./stark-address";
import { StarkName } from "./stark-name";
import { StarkProfile } from "./stark-profile";
import { SwitchChain } from "./switch-chain";
import { WalletPermission } from "./wallet-permission";

export default {
  Account,
  WalletPermission,
  Balance,
  ReadContract,
  SendTransaction,
  SendGaslessTransaction,
  PaymasterGasTokens,
  EstimateFees,
  StarkAddress,
  StarkName,
  StarkProfile,
  SwitchChain,
  AddChain,
  SignTypedData,
  DeclareContract,
  NonceForAddress,
  ChangeDefaultNetwork,
  DeployContract,
  Events,
};

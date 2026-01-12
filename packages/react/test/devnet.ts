import { devnet } from "@starknet-start/chains";
import { Account, type AccountInterface, RpcProvider } from "starknet";
import { MockWallet, type MockWalletAccounts } from "../src/connectors/mock";

const provider = new RpcProvider({ nodeUrl: devnet.rpcUrls.public.http[0] });

export const tokenAddress =
  "0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7";

const devnetAccounts = [
  {
    address:
      "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691",
    privateKey: "0x71d7bb07b9a64f6f78ac4c816aff4da9",
  },
  {
    address:
      "0x078662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1",
    privateKey: "0xe1406455b7d66b1690803be066cbe5e",
  },
  {
    address:
      "0x49dfb8ce986e21d354ac93ea65e6a11f639c1934ea253e5ff14ca62eca0f38e",
    privateKey: "0xa20a02f0ac53692d144b20cb371a60d7",
  },
  {
    address:
      "0x4f348398f859a55a0c80b1446c5fdc37edb3a8478a32f10764659fc241027d3",
    privateKey: "0xa641611c17d4d92bd0790074e34beeb7",
  },
  {
    address: "0xd513de92c16aa42418cf7e5b60f8022dbee1b4dfd81bcf03ebee079cfb5cb5",
    privateKey: "0x5b4ac23628a5749277bcabbf4726b025",
  },
];

function makeAccount({
  address,
  privateKey,
}: {
  address: string;
  privateKey: string;
}): AccountInterface {
  return new Account({ provider, address, signer: privateKey });
}

export const accounts: MockWalletAccounts = {
  sepolia: [makeAccount(devnetAccounts[1]), makeAccount(devnetAccounts[3])],
  mainnet: [makeAccount(devnetAccounts[0]), makeAccount(devnetAccounts[2])],
};

export const defaultConnector = new MockWallet(accounts, {
  id: "mock",
  name: "Mock Connector",
  available: true,
});

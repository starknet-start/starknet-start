import type { Chain } from "./types";

// Starknet chain ids are generated as follows:
//
// 1. Take the name of the network as string (SN_MAIN, SN_SEPOLIA).
// 2. Encode it as Starknet short string.
//
// For example, `encodeShortString('SN_MAIN')` returns `0x535f4d41494e`, which
// is the chain id.

export const mainnet = {
  id: BigInt("0x534e5f4d41494e"),
  network: "mainnet",
  name: "Starknet",
  nativeCurrency: {
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },

  rpcUrls: {
    alchemy: {
      http: ["https://starknet-mainnet.g.alchemy.com/v2"],
    },
    blast: {
      http: ["https://starknet-mainnet.blastapi.io"],
    },
    infura: {
      http: ["https://starknet-mainnet.infura.io/v3"],
    },
    lava: {
      http: ["https://g.w.lavanet.xyz:443/gateway/strk/rpc-http"],
    },
    cartridge: {
      http: ["https://api.cartridge.gg/x/starknet/mainnet"],
    },
    default: {
      http: [],
    },
    public: {
      http: [
        "https://starknet-mainnet.public.blastapi.io/rpc/v0_10",
        "https://rpc.starknet.lava.build",
      ],
    },
  },
  paymasterRpcUrls: {
    avnu: {
      http: ["https://starknet.paymaster.avnu.fi/"],
    },
  },
  explorers: {
    cartridge: ["https://explorer.cartridge.gg"],
    viewblock: ["https://viewblock.io/starknet"],
    voyager: ["https://voyager.online"],
  },
} as const satisfies Chain;

export const sepolia = {
  id: BigInt("0x534e5f5345504f4c4941"),
  network: "sepolia",
  name: "Starknet Sepolia Testnet",
  nativeCurrency: {
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  testnet: true,
  rpcUrls: {
    blast: {
      http: ["https://starknet-sepolia.blastapi.io"],
    },
    infura: {
      http: ["https://starknet-sepolia.infura.io/v3"],
    },
    cartridge: {
      http: ["https://api.cartridge.gg/x/starknet/sepolia"],
    },
    default: {
      http: [],
    },
    public: {
      http: ["https://starknet-sepolia.public.blastapi.io"],
    },
  },
  paymasterRpcUrls: {
    avnu: {
      http: ["https://sepolia.paymaster.avnu.fi/"],
    },
  },
  explorers: {
    cartridge: ["https://starknet-sepolia.explorer.cartridge.gg"],
    voyager: ["https://sepolia.voyager.online"],
  },
} as const satisfies Chain;

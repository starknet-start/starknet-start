import type { Sidebar } from "vocs";

export const sidebar = {
  "/docs/": [
    {
      text: "Introduction",
      items: [
        {
          text: "Getting Started",
          link: "/docs/getting-started",
        },
        {
          text: "Upgrading to V6",
          link: "/docs/upgrading-to-v6",
        },
        {
          text: "Upgrading to V4",
          link: "/docs/upgrading-to-v4",
        },
        {
          text: "StarknetConfig",
          link: "/docs/starknet-config",
        },
        {
          text: "Wallets",
          link: "/docs/wallets",
        },
        {
          text: "RPC Providers",
          link: "/docs/providers",
        },
        {
          text: "Paymaster Providers",
          link: "/docs/paymaster-providers",
        },
        {
          text: "Explorers",
          link: "/docs/explorers",
        },
        {
          text: "Deploying Contracts",
          link: "/docs/deploying-contracts",
        },
      ],
    },
    {
      text: "Smart Contracts",
      items: [
        {
          text: "useBalance",
          link: "/docs/hooks/use-balance",
        },
        {
          text: "useContract",
          link: "/docs/hooks/use-contract",
        },
        {
          text: "useReadContract",
          link: "/docs/hooks/use-read-contract",
        },
        {
          text: "useCall",
          link: "/docs/hooks/use-call",
        },
        {
          text: "useContractFactory",
          link: "/docs/hooks/use-contract-factory",
        },
        {
          text: "useUniversalDeployerContract",
          link: "/docs/hooks/use-universal-deployer-contract",
        },
      ],
    },
    {
      text: "Wallet Actions",
      items: [
        {
          text: "useSendTransaction",
          link: "/docs/hooks/use-send-transaction",
        },
        {
          text: "useSignTypedData",
          link: "/docs/hooks/use-sign-typed-data",
        },
        {
          text: "useAddChain",
          link: "/docs/hooks/use-add-chain",
        },
        {
          text: "useSwitchChain",
          link: "/docs/hooks/use-switch-chain",
        },
        {
          text: "useWalletRequest",
          link: "/docs/hooks/use-wallet-request",
        },
        {
          text: "useDeclareContract",
          link: "/docs/hooks/use-declare-contract",
        },
        {
          text: "useDeployAccount",
          link: "/docs/hooks/use-deploy-account",
        },
      ],
    },
    {
      text: "Paymaster",
      items: [
        {
          text: "usePaymasterGasTokens",
          link: "/docs/hooks/use-paymaster-gas-tokens",
        },
        {
          text: "usePaymasterEstimateFees",
          link: "/docs/hooks/use-paymaster-estimate-fees",
        },
        {
          text: "usePaymasterSendTransaction",
          link: "/docs/hooks/use-paymaster-send-transaction",
        },
      ],
    },
    {
      text: "Connectors",
      items: [
        {
          text: "useInjectedConnectors",
          link: "/docs/hooks/use-injected-connectors",
        },
        { text: "useAccount", link: "/docs/hooks/use-account" },
        {
          text: "useConnect",
          link: "/docs/hooks/use-connect",
        },
        {
          text: "useDisconnect",
          link: "/docs/hooks/use-disconnect",
        },
      ],
    },
    {
      text: "Helpers",
      items: [
        {
          text: "useNetwork",
          link: "/docs/hooks/use-network",
        },
        {
          text: "useProvider",
          link: "/docs/hooks/use-provider",
        },
        {
          text: "useExplorer",
          link: "/docs/hooks/use-explorer",
        },
        {
          text: "useInvalidateOnBlock",
          link: "/docs/hooks/use-invalidate-on-block",
        },
      ],
    },
    {
      text: "RPC Methods",
      items: [
        {
          text: "useBlock",
          link: "/docs/hooks/use-block",
        },
        {
          text: "useBlockNumber",
          link: "/docs/hooks/use-block-number",
        },
        {
          text: "useEstimateFees",
          link: "/docs/hooks/use-estimate-fees",
        },
        {
          text: "useNonceForAddress",
          link: "/docs/hooks/use-nonce-for-address",
        },
        {
          text: "useTransactionReceipt",
          link: "/docs/hooks/use-transaction-receipt",
        },
        {
          text: "useEvents",
          link: "/docs/hooks/use-events",
        },
      ],
    },
    {
      text: "Starknet.ID",
      items: [
        {
          text: "useStarkAddress",
          link: "/docs/hooks/use-stark-address",
        },
        {
          text: "useStarkName",
          link: "/docs/hooks/use-stark-name",
        },
        {
          text: "useStarkProfile",
          link: "/docs/hooks/use-stark-profile",
        },
      ],
    },
  ],
} as const satisfies Sidebar;

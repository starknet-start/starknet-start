import { describe, expect, it } from "vitest";
import { defaultConnector } from "../../test/devnet";
import { act, renderHook } from "../../test/react";

import { useAccount } from "./use-account";
import { useConnect } from "./use-connect";
import { useDisconnect } from "./use-disconnect";

function useAccountWithConnect() {
  return {
    account: useAccount(),
    connect: useConnect(),
    disconnect: useDisconnect(),
  };
}

describe("useAccount", () => {
  describe("returns no account", () => {
    it("on mount", async () => {
      const { result } = renderHook(() => useAccountWithConnect());

      expect(result.current.account).toMatchInlineSnapshot(`
        {
          "account": undefined,
          "address": undefined,
          "chainId": undefined,
          "connector": undefined,
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isReconnecting": false,
          "status": "disconnected",
        }
      `);
    });

    it("after the user disconnects their wallet", async () => {
      const { result } = renderHook(() => useAccountWithConnect());

      await act(async () => {
        await result.current.connect.connectAsync({
          connector: defaultConnector,
        });
      });

      expect(result.current.account.isConnected).toBeTruthy();

      await act(async () => {
        await result.current.disconnect.disconnectAsync();
      });

      expect(result.current.account).toMatchInlineSnapshot(`
        {
          "account": undefined,
          "address": undefined,
          "chainId": undefined,
          "connector": undefined,
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isReconnecting": false,
          "status": "disconnected",
        }
      `);
    });
  });

  describe("returns the account", () => {
    it("after the user connects their wallet", async () => {
      const { result } = renderHook(() => useAccountWithConnect());

      await act(async () => {
        result.current.connect.connect({ connector: defaultConnector });
      });

      // skip serializing mock connector
      expect({
        ...result.current.account,
        connector: undefined,
      }).toMatchInlineSnapshot(`
        {
          "account": WalletAccountV5 {
            "address": "0x078662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1",
            "cairoVersion": undefined,
            "channel": RpcChannel2 {
              "baseFetch": [Function],
              "batchClient": undefined,
              "blockIdentifier": "latest",
              "chainId": "0x534e5f5345504f4c4941",
              "channelSpecVersion": "0.9.0",
              "headers": {
                "Content-Type": "application/json",
              },
              "id": "RPC090",
              "nodeUrl": "http://localhost:5050/rpc",
              "requestId": 0,
              "retries": 200,
              "specVersion": undefined,
              "transactionRetryIntervalFallback": undefined,
              "waitMode": false,
            },
            "defaultTipType": "recommendedTip",
            "deploySelf": [Function],
            "deployer": Deployer {
              "address": "0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125",
              "entryPoint": "deploy_contract",
            },
            "getStateUpdate": [Function],
            "paymaster": _PaymasterRpc {
              "baseFetch": [Function],
              "headers": {
                "Content-Type": "application/json",
                "x-paymaster-api-key": "",
              },
              "nodeUrl": "http://localhost:5050",
              "requestId": 0,
            },
            "responseParser": RPCResponseParser {
              "resourceBoundsOverhead": undefined,
            },
            "signer": Signer {
              "pk": "0x0",
            },
            "transactionVersion": "0x3",
            "unsubscribe": [Function],
            "walletProvider": MockWallet {
              "_accountIndex": 0,
              "_accounts": {
                "mainnet": [
                  Account {
                    "address": "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691",
                    "cairoVersion": undefined,
                    "channel": RpcChannel2 {
                      "baseFetch": [Function],
                      "batchClient": undefined,
                      "blockIdentifier": "latest",
                      "chainId": undefined,
                      "channelSpecVersion": "0.9.0",
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "id": "RPC090",
                      "nodeUrl": "http://localhost:5050/rpc",
                      "requestId": 0,
                      "retries": 200,
                      "specVersion": undefined,
                      "transactionRetryIntervalFallback": undefined,
                      "waitMode": false,
                    },
                    "defaultTipType": "recommendedTip",
                    "deploySelf": [Function],
                    "deployer": Deployer {
                      "address": "0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125",
                      "entryPoint": "deploy_contract",
                    },
                    "getStateUpdate": [Function],
                    "paymaster": _PaymasterRpc {
                      "baseFetch": [Function],
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "nodeUrl": "https://sepolia.paymaster.avnu.fi",
                      "requestId": 0,
                    },
                    "responseParser": RPCResponseParser {
                      "resourceBoundsOverhead": undefined,
                    },
                    "signer": Signer {
                      "pk": "0x71d7bb07b9a64f6f78ac4c816aff4da9",
                    },
                    "transactionVersion": "0x3",
                  },
                  Account {
                    "address": "0x49dfb8ce986e21d354ac93ea65e6a11f639c1934ea253e5ff14ca62eca0f38e",
                    "cairoVersion": undefined,
                    "channel": RpcChannel2 {
                      "baseFetch": [Function],
                      "batchClient": undefined,
                      "blockIdentifier": "latest",
                      "chainId": undefined,
                      "channelSpecVersion": "0.9.0",
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "id": "RPC090",
                      "nodeUrl": "http://localhost:5050/rpc",
                      "requestId": 0,
                      "retries": 200,
                      "specVersion": undefined,
                      "transactionRetryIntervalFallback": undefined,
                      "waitMode": false,
                    },
                    "defaultTipType": "recommendedTip",
                    "deploySelf": [Function],
                    "deployer": Deployer {
                      "address": "0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125",
                      "entryPoint": "deploy_contract",
                    },
                    "getStateUpdate": [Function],
                    "paymaster": _PaymasterRpc {
                      "baseFetch": [Function],
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "nodeUrl": "https://sepolia.paymaster.avnu.fi",
                      "requestId": 0,
                    },
                    "responseParser": RPCResponseParser {
                      "resourceBoundsOverhead": undefined,
                    },
                    "signer": Signer {
                      "pk": "0xa20a02f0ac53692d144b20cb371a60d7",
                    },
                    "transactionVersion": "0x3",
                  },
                ],
                "sepolia": [
                  Account {
                    "address": "0x078662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1",
                    "cairoVersion": undefined,
                    "channel": RpcChannel2 {
                      "baseFetch": [Function],
                      "batchClient": undefined,
                      "blockIdentifier": "latest",
                      "chainId": undefined,
                      "channelSpecVersion": "0.9.0",
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "id": "RPC090",
                      "nodeUrl": "http://localhost:5050/rpc",
                      "requestId": 0,
                      "retries": 200,
                      "specVersion": undefined,
                      "transactionRetryIntervalFallback": undefined,
                      "waitMode": false,
                    },
                    "defaultTipType": "recommendedTip",
                    "deploySelf": [Function],
                    "deployer": Deployer {
                      "address": "0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125",
                      "entryPoint": "deploy_contract",
                    },
                    "getStateUpdate": [Function],
                    "paymaster": _PaymasterRpc {
                      "baseFetch": [Function],
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "nodeUrl": "https://sepolia.paymaster.avnu.fi",
                      "requestId": 0,
                    },
                    "responseParser": RPCResponseParser {
                      "resourceBoundsOverhead": undefined,
                    },
                    "signer": Signer {
                      "pk": "0xe1406455b7d66b1690803be066cbe5e",
                    },
                    "transactionVersion": "0x3",
                  },
                  Account {
                    "address": "0x4f348398f859a55a0c80b1446c5fdc37edb3a8478a32f10764659fc241027d3",
                    "cairoVersion": undefined,
                    "channel": RpcChannel2 {
                      "baseFetch": [Function],
                      "batchClient": undefined,
                      "blockIdentifier": "latest",
                      "chainId": undefined,
                      "channelSpecVersion": "0.9.0",
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "id": "RPC090",
                      "nodeUrl": "http://localhost:5050/rpc",
                      "requestId": 0,
                      "retries": 200,
                      "specVersion": undefined,
                      "transactionRetryIntervalFallback": undefined,
                      "waitMode": false,
                    },
                    "defaultTipType": "recommendedTip",
                    "deploySelf": [Function],
                    "deployer": Deployer {
                      "address": "0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125",
                      "entryPoint": "deploy_contract",
                    },
                    "getStateUpdate": [Function],
                    "paymaster": _PaymasterRpc {
                      "baseFetch": [Function],
                      "headers": {
                        "Content-Type": "application/json",
                      },
                      "nodeUrl": "https://sepolia.paymaster.avnu.fi",
                      "requestId": 0,
                    },
                    "responseParser": RPCResponseParser {
                      "resourceBoundsOverhead": undefined,
                    },
                    "signer": Signer {
                      "pk": "0xa641611c17d4d92bd0790074e34beeb7",
                    },
                    "transactionVersion": "0x3",
                  },
                ],
              },
              "_chainId": 393402133025997798000961n,
              "_connect": [Function],
              "_connected": true,
              "_disconnect": [Function],
              "_listeners": {
                "change": [
                  [Function],
                  [Function],
                  [Function],
                ],
              },
              "_on": [Function],
              "_options": {
                "available": true,
                "id": "mock",
                "name": "Mock Connector",
              },
              "_request": [Function],
              "icon": "data:image/svg+xml;base64,mock",
              "name": "Mock Connector",
              "version": "1.0.0",
            },
          },
          "address": "0x078662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1",
          "chainId": 393402133025997798000961n,
          "connector": undefined,
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isReconnecting": false,
          "status": "connected",
        }
      `);
    });
  });
});

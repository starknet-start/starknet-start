import { mainnet, sepolia } from "@starknet-start/chains";
import {
  useAccount,
  useContract,
  useNetwork,
  usePaymasterEstimateFees,
  usePaymasterSendTransaction,
} from "@starknet-start/react";
import { useMemo } from "react";
import stringify from "safe-stable-stringify";
import type { Abi, Call, FeeMode } from "starknet";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

const USDC_ADDRESS_PER_CHAIN: Record<string, string> = {
  [mainnet.name]:
    "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  [sepolia.name]:
    "0x053b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080",
};

export function SendGaslessTransaction() {
  return (
    <DemoContainer hasWallet>
      <SendGaslessTransactionInner />
    </DemoContainer>
  );
}

function SendGaslessTransactionInner() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { contract } = useContract({
    abi,
    address: chain.nativeCurrency.address,
  });

  const feeMode = useMemo<FeeMode>(
    () => ({
      mode: "default",
      gasToken: USDC_ADDRESS_PER_CHAIN[chain.name],
    }),
    [chain.name],
  );

  const calls = useMemo<Call[]>(
    () =>
      contract && address ? [contract.populate("transfer", [address, 1n])] : [],
    [contract, address],
  );

  const {
    data: estimateData,
    isPending: isPendingEstimate,
    error: errorEstimate,
  } = usePaymasterEstimateFees({
    calls,
    options: {
      feeMode,
    },
  });

  const {
    sendAsync: sendGasless,
    data: sendData,
    isPending: isPendingSend,
    error: errorSend,
  } = usePaymasterSendTransaction({
    calls,
    options: {
      feeMode,
    },
    maxFeeInGasToken: estimateData?.suggested_max_fee_in_gas_token,
  });

  return (
    <div className="flex flex-col gap-4">
      <p>Response</p>
      <pre>
        {stringify(
          {
            estimateData,
            sendData,
            isPendingSend,
            isPendingEstimate,
            errorSend: errorSend?.message,
            errorEstimate: errorEstimate?.message,
          },
          null,
          2,
        )}
      </pre>
      <Button onClick={() => sendGasless()}>Send Transaction</Button>
    </div>
  );
}

const abi = [
  {
    type: "function",
    name: "transfer",
    state_mutability: "external",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
  },
] as const satisfies Abi;

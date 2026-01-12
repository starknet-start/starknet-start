import {
  type Address,
  useAccount,
  useNetwork,
  useSendTransaction,
  useSwitchChain,
  useUniversalDeployerContract,
} from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { CallData, constants } from "starknet";
import { erc20ClassAbi } from "../../lib/erc20_class_abi";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

export function DeployContract() {
  return (
    <DemoContainer hasWallet>
      <DeployContractInner />
    </DemoContainer>
  );
}

function DeployContractInner() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { error: switchChainError, switchChainAsync } = useSwitchChain({
    params: {
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    },
  });
  const { udc } = useUniversalDeployerContract();

  const { isError, error, send, data, isPending } = useSendTransaction({
    calls:
      udc && address
        ? [
            udc.populate("deploy_contract", [
              classHash,
              23,
              false,
              getCallData(address),
            ]),
          ]
        : undefined,
  });

  return (
    <div className="flex flex-col gap-4">
      {chain.id === BigInt(constants.StarknetChainId.SN_SEPOLIA) ? (
        <>
          <p>Response</p>
          <pre>
            {stringify(
              {
                data,
                isPending,
                isError,
                error: error?.message,
              },
              null,
              2,
            )}
          </pre>
          <Button onClick={() => send()}>Deploy Contract</Button>
        </>
      ) : (
        <>
          <p>
            You need to switch to Sepolia to test this demo to deploy a contract
          </p>
          {switchChainError && (
            <p className="text-red-500">
              {switchChainError.message}, Try switching to Sepolia Manually!
            </p>
          )}
          <Button onClick={async () => await switchChainAsync()}>
            Switch to Sepolia
          </Button>
        </>
      )}
    </div>
  );
}

// https://sepolia.starkscan.co/class/0x07f3777c99f3700505ea966676aac4a0d692c2a9f5e667f4c606b51ca1dd3420
const classHash =
  "0x07f3777c99f3700505ea966676aac4a0d692c2a9f5e667f4c606b51ca1dd3420";

function getCallData(address: Address) {
  const calldata = new CallData(erc20ClassAbi).compile("constructor", {
    name: "STARKNET REACT DEMO",
    symbol: "SRD",
    decimals: 18n,
    initial_supply: { low: 10n ** 18n * 1000000n, high: 0n },
    recipient: address,
    permitted_minter: address,
    provisional_governance_admin: address,
    upgrade_delay: 0n,
  });
  return calldata;
}

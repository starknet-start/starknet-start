import type { Address } from "@starknet-start/chains";
import type { UseContractResult } from "@starknet-start/query";
import type { Abi } from "abi-wan-kanabi";
import type { ProviderInterface } from "starknet";
import { useContract } from "./use-contract";

export type UseUniversalDeployerContractProps = {
  /** UDC contract's address.
   *
   * @remarks
   * Overrides the default address of the Universal Deployer contract.
   *
   */
  address?: Address;
  /** The provider, by default it will be the current one. */
  provider?: ProviderInterface | null;
};

export type UseUniversalDeployerContractResult = {
  udc: UseContractResult<typeof abi>["contract"];
};

/**
 * Hook to bind a `Contract` instance for the Universal Deployer contract.
 *
 * @returns The `Contract` instance for the Universal Deployer contract.
 *
 * @remarks
 *
 * - The returned contract is a starknet.js `Contract` object.
 *
 */
export function useUniversalDeployerContract(
  props?: UseUniversalDeployerContractProps,
): UseUniversalDeployerContractResult {
  const { address, provider } = props || {};
  return {
    udc: useContract({
      abi,
      address:
        address ??
        "0x04a64cd09a853868621d94cae9952b106f2c36a3f81260f85de6696c6b050221",
      provider,
    }).contract,
  };
}

/**
 * https://docs.openzeppelin.com/contracts-cairo/0.20.0/udc
 * The Universal Deployer contract's ABI.
 */
const abi = [
  {
    name: "UniversalDeployerImpl",
    type: "impl",
    interface_name:
      "openzeppelin::utils::universal_deployer::interface::IUniversalDeployer",
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "core::array::Span::<core::felt252>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    name: "openzeppelin::utils::universal_deployer::interface::IUniversalDeployer",
    type: "interface",
    items: [
      {
        name: "deploy_contract",
        type: "function",
        inputs: [
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
          {
            name: "salt",
            type: "core::felt252",
          },
          {
            name: "from_zero",
            type: "core::bool",
          },
          {
            name: "calldata",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin::presets::universal_deployer::UniversalDeployer::ContractDeployed",
    type: "event",
    members: [
      {
        kind: "data",
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "deployer",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "from_zero",
        type: "core::bool",
      },
      {
        kind: "data",
        name: "class_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        kind: "data",
        name: "calldata",
        type: "core::array::Span::<core::felt252>",
      },
      {
        kind: "data",
        name: "salt",
        type: "core::felt252",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin::presets::universal_deployer::UniversalDeployer::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "ContractDeployed",
        type: "openzeppelin::presets::universal_deployer::UniversalDeployer::ContractDeployed",
      },
    ],
  },
] as const satisfies Abi;

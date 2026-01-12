import { useCallback } from "react";
import { useStarknetAccount } from "src/context/account";
import {
  type Abi,
  type CompiledContract,
  type CompiledSierraCasm,
  Contract,
  type RawArgs,
  type UniversalDetails,
} from "starknet";

/** Arguments for `useContractFactory`. */
export interface UseContractFactoryProps {
  /** The compiled contract (for declare and deploy). */
  compiledContract?: CompiledContract;
  /** The CASM contract (required when declaring). */
  casm?: CompiledSierraCasm;
  /** The class hash (for deploy-only mode). */
  classHash?: string;
  /** The contract abi. */
  abi?: Abi;
}

/** Options for deploying a contract. */
export interface DeployContractOptions {
  /** Constructor calldata. */
  constructorCalldata?: RawArgs;
  /** Salt for address generation. */
  salt?: string;
  /** Make the address unique. */
  unique?: boolean;
  /** Additional transaction details. */
  details?: UniversalDetails;
}

/** Value returned from `useContractFactory`. */
export interface UseContractFactoryResult {
  /** Function to deploy the contract. */
  deployContract?: (options?: DeployContractOptions) => Promise<Contract>;
}

/**
 * Hook to deploy contracts using the new Contract.factory() method.
 *
 * @remarks
 *
 * This hook provides a function to deploy contracts using starknet.js v8's
 * Contract.factory() static method.
 *
 * For declare and deploy, provide compiledContract and casm.
 * For deploy-only, provide classHash and optionally abi.
 */
export function useContractFactory({
  compiledContract,
  casm,
  classHash,
  abi,
}: UseContractFactoryProps): UseContractFactoryResult {
  const { account } = useStarknetAccount();

  const deployContract = useCallback(
    async (options?: DeployContractOptions) => {
      if (!account) {
        throw new Error("Account is required to deploy a contract");
      }

      const { constructorCalldata, salt, unique, details } = options || {};

      // Declare and deploy mode
      if (compiledContract && casm) {
        return await Contract.factory(
          {
            account,
            contract: compiledContract,
            casm,
            constructorCalldata,
            salt,
            unique,
          },
          details,
        );
      }

      // Deploy-only mode
      if (classHash) {
        return await Contract.factory(
          {
            account,
            classHash,
            abi,
            constructorCalldata,
            salt,
            unique,
          },
          details,
        );
      }

      throw new Error(
        "Either compiledContract + casm or classHash is required to deploy a contract",
      );
    },
    [account, compiledContract, casm, classHash, abi],
  );

  return {
    deployContract:
      account && ((compiledContract && casm) || classHash)
        ? deployContract
        : undefined,
  };
}

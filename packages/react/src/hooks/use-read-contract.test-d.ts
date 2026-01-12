import type { FunctionRet } from "abi-wan-kanabi/kanabi";
import { assertType, describe, it } from "vitest";
import { tokenAddress } from "../../test/devnet";
import { testAbi } from "../../test/test-abi";
import {
  type UseReadContractProps,
  useReadContract,
} from "./use-read-contract";

type TAbi = typeof testAbi;

const commonProps = {
  abi: testAbi,
  address: tokenAddress,
} as const;

describe("Types test for useReadContract.ts", () => {
  it("correct function name for given abi", () => {
    const props = {
      ...commonProps,
      functionName: "fn_felt",
      args: [1234],
    } as const;
    assertType<UseReadContractProps<TAbi, "fn_felt">>(props);
  });

  it("wrong function name for given abi", () => {
    const props = {
      ...commonProps,
      functionName: "some_random_function",
      args: [1234],
    } as const;

    // @ts-expect-error
    assertType<UseReadContractProps<TAbi, "fn_felt">>(props);
  });

  it("correct arguments of function for given abi", () => {
    const props = {
      ...commonProps,
      functionName: "fn_felt",
      args: ["some_bignumberish_value"],
    } as const;

    assertType<UseReadContractProps<TAbi, "fn_felt">>(props);
  });

  it("wrong arguments of function for given abi", () => {
    const props = {
      ...commonProps,
      functionName: "fn_felt",
      args: [false],
    } as const;

    // @ts-expect-error
    assertType<UseReadContractProps<TAbi, "fn_felt">>(props);
  });

  it("correct data with correct arguments & function for given abi", () => {
    const props = {
      ...commonProps,
      functionName: "fn_out_simple_array",
      args: [],
    } as const;

    const { data } = useReadContract(props);
    assertType<FunctionRet<TAbi, "fn_out_simple_array"> | undefined>(data);
  });
});

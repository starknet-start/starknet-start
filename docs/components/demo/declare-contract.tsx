import {
  type UseDeclareContractArgs,
  useDeclareContract,
} from "@starknet-start/react";
import stringify from "safe-stable-stringify";
import { DemoContainer } from "../starknet";
import { Button } from "../ui/button";

export function DeclareContract() {
  return (
    <DemoContainer hasWallet>
      <DeclareContractInner />
    </DemoContainer>
  );
}

function DeclareContractInner() {
  const { isError, isPending, data, error, declare } = useDeclareContract({
    params,
  });
  return (
    <div className="flex flex-col gap-4">
      <p>Params</p>
      <pre>{stringify(params, null, 2)}</pre>

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

      <Button className="button" onClick={() => declare()}>
        Declare
      </Button>
    </div>
  );
}

// TODO
const params: UseDeclareContractArgs = {
  compiled_class_hash: "",
  contract_class: {
    abi: "",
    contract_class_version: "",
    sierra_program: [""],
    entry_points_by_type: {
      CONSTRUCTOR: [
        {
          function_idx: 1,
          selector: "",
        },
      ],
      EXTERNAL: [
        {
          function_idx: 1,
          selector: "",
        },
      ],
      L1_HANDLER: [
        {
          function_idx: 1,
          selector: "",
        },
      ],
    },
  },
};

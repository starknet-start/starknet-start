import { StarknetProvider, type StarknetProviderProps } from "./starknet";

export { AccountProvider as OverrideAccount } from "./account";
export { starknetChainId } from "./starknet";

export type StarknetConfigProps = StarknetProviderProps;

export function StarknetConfig({ children, ...config }: StarknetConfigProps) {
  return <StarknetProvider {...config}>{children}</StarknetProvider>;
}

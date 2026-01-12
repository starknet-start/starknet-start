import { WalletBar } from "./bar";
import { StarknetProvider } from "./provider";

export function DemoContainer({
  defaultChainId,
  hasWallet,
  children,
}: {
  defaultChainId?: bigint;
  hasWallet?: boolean;
  children: React.ReactNode;
}) {
  return (
    <StarknetProvider defaultChainId={defaultChainId}>
      <div className="flex flex-col px-4 border border-primary rounded-xl demo-container [&_pre]:overflow-auto">
        {hasWallet ? <WalletBar /> : null}
        <div className="py-4">{children}</div>
        {hasWallet ? (
          <i className="text-xs my-2">* Wallet connection required</i>
        ) : null}
      </div>
    </StarknetProvider>
  );
}

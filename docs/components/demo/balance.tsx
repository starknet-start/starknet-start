import { useAccount, useBalance } from "@starknet-start/react";
import { DemoContainer } from "../starknet";

function AccountBalance({ account }: { account: `0x${string}` }) {
  const { data, error } = useBalance({
    address: account,
  });

  if (data) {
    return (
      <div className="flex flex-col space-y-2">
        <p>
          <span className="font-semibold">Address: </span>
          {account.slice(0, 6)}...{account.slice(-4)}
        </p>
        <p>
          <span className="font-semibold">Balance: </span>
          {`${data.formatted} ${data.symbol}`}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col space-y-2">
        <p>Error fetching balance</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <p>Loading balance...</p>
    </div>
  );
}

function BalanceInner() {
  const { address } = useAccount();

  return (
    <div className="">
      {address ? (
        <AccountBalance account={address} />
      ) : (
        <p>Connect wallet to display its balance.</p>
      )}
    </div>
  );
}

export function Balance() {
  return (
    <DemoContainer hasWallet>
      <BalanceInner />
    </DemoContainer>
  );
}

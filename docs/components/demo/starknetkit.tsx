// TODO: This Code has to be updated as per get-starknet standards.

// import { mainnet, sepolia } from "@starknet-start/chains";
// import { publicProvider } from "@starknet-start/providers";
// import {
//   type Connector,
//   StarknetConfig,
//   useAccount,
//   useConnect,
// } from "@starknet-start/react";
// import { useState } from "react";
// import {
//   type StarknetkitConnector,
//   useStarknetkitConnectModal,
// } from "starknetkit";
// import { availableConnectors } from "../starknetkit";
// import { Button } from "../ui/button";

// export function StarknetKit() {
//   return (
//     <StarknetProvider>
//       <StarknetKitInner />
//     </StarknetProvider>
//   );
// }

// /** This Demo is for experimental purpose only, will be removed later */
// function StarknetKitInner() {
//   const { connectAsync, connectors } = useConnect();
//   const { starknetkitConnectModal } = useStarknetkitConnectModal({
//     connectors: availableConnectors as StarknetkitConnector[],
//   });

//   const { address } = useAccount();

//   // function to connect to a wallet via starknetkit modal
//   async function connectWalletWithModal() {
//     const { connector } = await starknetkitConnectModal();
//     if (!connector) {
//       return;
//     }
//     await connectAsync({ connector: connector as Connector });
//   }

//   // function to connect to a wallet via starknetkit connector
//   async function connectWalletWithConnector(connector: Connector) {
//     await connectAsync({ connector });
//   }

//   return (
//     <div>
//       <div className="flex flex-col gap-4">
//         {address && (
//           <div className="h-full flex flex-col justify-center">
//             <p className="font-medium">Connected Address: </p>
//             <pre>{address}</pre>
//           </div>
//         )}

//         <p>Staknetkit Modal</p>
//         <Button onClick={connectWalletWithModal}>Starknetkit Modal</Button>

//         <p>Staknetkit Connectors</p>
//         {connectors.map((connector) => (
//           <Button
//             onClick={() => connectWalletWithConnector(connector)}
//             key={connector.id}
//           >
//             {connector.id}
//           </Button>
//         ))}

//         {/*
//         <p>Experimental (for internal testing only)</p>
//         {connectors.map((connector, index) => (
//           <WalletButton connector={connector} key={connector.id} />
//         ))} */}
//       </div>
//     </div>
//   );
// }

// /** @experimental ignore: this function is for internal testing purpose only (not part of demo) */
// function _WalletButton({ connector }: { connector: Connector }) {
//   const [res, setRes] = useState<string>("-- No res --");
//   const [res2, setRes2] = useState<string>("-- No res --");
//   const [res3, setRes3] = useState<string>("-- No res --");

//   const [time1, setTime1] = useState<number | undefined>(undefined);
//   const [time2, setTime2] = useState<number | undefined>(undefined);

//   async function connectWallet() {
//     const _res = await connector.connect({});
//     setRes(JSON.stringify(_res.account));
//   }

//   async function request() {
//     const start = performance.now();
//     const _res = await connector.request({
//       type: "wallet_getPermissions",
//     });
//     const end = performance.now();
//     setTime1(end - start);
//     setRes2(JSON.stringify(_res));
//   }

//   async function request2() {
//     const start = performance.now();
//     const _res = await connector.request({
//       type: "wallet_requestAccounts",
//       params: { silent_mode: true },
//     });
//     const end = performance.now();
//     setTime2(end - start);
//     setRes3(JSON.stringify(_res));
//   }

//   return (
//     <div className="my-4 flex flex-col gap-2">
//       <Button className="h-auto" onClick={() => connectWallet()}>
//         {connector.id} | connect()
//         <br />
//         {res}
//       </Button>
//       <div className="flex py-2 gap-4">
//         <Button
//           className="flex flex-col grow gap-2 h-auto"
//           onClick={() => request()}
//         >
//           Request Call
//           <br />
//           (wallet_getPermissions)
//           <br />
//           {res2}
//           <br />
//           {time1 && <div>Time: {Math.floor(time1)} ms</div>}
//         </Button>
//         <Button
//           className="flex flex-col grow gap-2 h-auto"
//           onClick={() => request2()}
//         >
//           Request Call
//           <br />
//           (wallet_requestAccounts with silent_mode)
//           <br />
//           {res3}
//           <br />
//           {time2 && <div>Time: {Math.floor(time2)} ms</div>}
//         </Button>
//       </div>
//     </div>
//   );
// }
// /** @experimental ignore: this function is for internal testing purpose only (not part of demo) */
// function StarknetProvider({ children }: { children: React.ReactNode }) {
//   const chains = [sepolia, mainnet];
//   const provider = publicProvider();

//   return (
//     <StarknetConfig
//       chains={chains}
//       provider={provider}
//       connectors={availableConnectors}
//     >
//       <div className="flex flex-col px-4 border border-primary rounded-xl">
//         <div className="py-4">{children}</div>
//       </div>
//     </StarknetConfig>
//   );
// }

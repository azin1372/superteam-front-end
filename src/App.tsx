import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/home/index";
import DocsPage from "@/pages/docs";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { UserButton, useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const AfterLogin = async (userContext: any) => {
	try {
		// if (userContext.user && !userHasWallet(userContext)) {
		// 	console.log("create a wallet ::::::")
		//   await userContext.createWallet();
		// }


		// if (userHasWallet(userContext)) {
		// 	const wallet = userContext.solana.wallet; // user has a wallet
		// 	console.log("user already has a wallet --------------------------------------- ::", wallet);
		// } else {
		// 	console.log("hopsss ::", {
		// 		userContext,
		// 	});
		// 	const a = await userContext.createWallet(); // user does not have a wallet
		// 	console.log("creatingggggggggggggggg new wallet ::", a);
		// }
	} catch (e) {
		console.log("---- after loging error : ----");
		console.log(e);
		console.log("---- after loging error : ----");
	}
};

function App() {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const userContext = useUser();

	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.

	const wallets = useMemo(
		() => [new UnsafeBurnerWalletAdapter()],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[network]
	);
	console.log({ endpoint });
	return (
		<div className="pattern">
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>
						<CivicAuthProvider
							onSignIn={() => {
								setTimeout(() => {
									console.log(" ---------------------------------- LOG -----------------------------------");
									AfterLogin(userContext);
								}, 15000);
							}}
							clientId="fd0959e0-b02a-4edd-9b32-40ff70112f6f"
						>
							<Routes>
								<Route element={<IndexPage />} path="/" />
								<Route element={<DocsPage />} path="/docs" />
							</Routes>
						</CivicAuthProvider>
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</div>
	);
}

export default App;

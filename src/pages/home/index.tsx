import DefaultLayout from "@/layouts/default";
import ResultLanding from "./result";
import { UserButton, UserContextType, useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useBalance } from "./useBalance";
// import { ConnectionProvider, WalletProvider, useWallet, useConnection } from "@solana/wallet-adapter-react";/
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import React, { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

type ExistingWeb3UserContext = UserContextType & {
	solana: {
		address: string; // the base58 public key of the embedded wallet
		wallet: Wallet; // a Solana Wallet object
	};
};

type NewWeb3UserContext = UserContextType & {
	createWallet: () => Promise<void>;
	walletCreationInProgress: boolean;
};

export default function IndexPage() {
	const userContext = useUser();

	const { balance, publicKey } = useBalance(userContext);

	//   (userContext as any)?.solana?.wallet?.connect();
	console.log("aniyyyyyyyyyyyyyyyy", {
		sol: (userContext as any)?.solana,
	});

	return (
		<DefaultLayout>
			<section className="">
				{userContext.user && <div className="">user is here</div>}
				{/* <UserButton className="btn" /> */}
				{/* <img alt="pattern"    /> */}
				<WalletMultiButton />
				{userContext.user && <>Hello : {userContext.user.name}</>}
				{publicKey && (
					<div>
						<p>Wallet address: {publicKey.toString()}</p>
						<p>Balance:: {balance !== undefined ? `${balance / 1e9} SOL` : "Loading..."}</p>
					</div>
				)}
				<ResultLanding />
				{/* <div className="flex gap-3">
					<Link
						isExternal
						className={buttonStyles({
							color: "primary",
							radius: "full",
							variant: "shadow",
						})}
						href={siteConfig.links.docs}
					>
						Documentation
					</Link>
					<Link isExternal className={buttonStyles({ variant: "bordered", radius: "full" })} href={siteConfig.links.github}>
						<GithubIcon size={20} />
						GitHub
					</Link>
				</div> */}
				{/* <div className="mt-8">
					<Snippet hideCopyButton hideSymbol variant="bordered">
						<span>
							Get started by editing <Code color="primary">pages/index.tsx</Code>
						</span>
					</Snippet>
				</div> */}
			</section>
		</DefaultLayout>
	);
}

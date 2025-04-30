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
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Alert, Divider, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useHistory } from "../hooks/useHistory";
import { Navbar } from "@/components/navbar";

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
	const { changeContract, histories, historyModal, onCloseHistoryModal, setHistoryModal, searchParams } = useHistory();

	console.log("aniyyyyyyyyyyyyyyyy", { sol: (userContext as any)?.solana });

	return (
		<DefaultLayout>
			<Navbar setHistoryModal={setHistoryModal} />
			<section className="">
				{userContext.user && <>Hello : {userContext.user.name}</>}
				{publicKey && (
					<div>
						<p>Wallet address: {publicKey.toString()}</p>
						<p>Balance:: {balance !== undefined ? `${balance / 1e9} SOL` : "Loading..."}</p>
					</div>
				)}
				<ResultLanding />

				<div className="mt-8">
					<Snippet hideCopyButton hideSymbol variant="bordered">
						<span>
							Get started by editing <Code color="primary">pages/index.tsx</Code>
						</span>
					</Snippet>
				</div>
			</section>

			{/* ---------------------------------------------- history modal  ---------------------------------------------- */}
			<Modal isOpen={historyModal} size={"3xl"} onClose={onCloseHistoryModal} backdrop="opaque">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">History Scan</ModalHeader>
							<ModalBody>
								{histories?.map((history: any, index: number) => (
									<div key={index}>
										<button
											disabled={!history || typeof history !== "string"}
											className={`mb-2 ${history === searchParams.get("contractAddress") ? "text-gray-500" : ""} ${history === searchParams.get("contractAddress") ? "pointer-events-none" : ""} `}
											style={{ textAlign: "left" }}
											onClick={() => changeContract(history)}
										>
											<h3 className="tex-lg">{history}</h3>
										</button>
										<Divider className="mb-3 mb-1" />
									</div>
								))}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>

			{/* ---------------------------------------------- history modal  ---------------------------------------------- */}
			<Modal isOpen size="3xl">
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">Unlock Full Access!</ModalHeader>
					<ModalBody className="pb-10">
						<p className="py-0 mb-3 ">Log in and connect your Web3 wallet to enjoy infinite scans.</p>

						<ul className="flex flex-wrap gap-2 pl-4" style={{ listStyleType: "numeric" }}>
							<li className="pl-1">
								<Alert
									variant="faded"
									color="success"
									title={
										<>
											<h3>You're Logged In!</h3>
											<p>Your account is verified, and you're ready to start scanning.</p>
										</>
									}
								/>
								<div className="mt-2">
									<UserButton className="!bg-transparent sign-in-button" style={{ borderRadius: 12, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }} />
								</div>
							</li>

							<li className="mt-5 pl-1">
								<Alert
									variant="faded"
									color="success"
									title={
										<>
											<h3>Wallet Connected!</h3>
											<p>Your Web3 wallet is linked, unlocking 100 scans per connection.</p>
										</>
									}
								/>
								<div className="mt-2">
									<WalletMultiButton className="bg-danger !text-warning" style={{ backgroundColor: "transparent", border: "1px solid #6b7280", borderRadius: 12 }} />
								</div>
							</li>
						</ul>
					</ModalBody>
				</ModalContent>
			</Modal>
		</DefaultLayout>
	);
}

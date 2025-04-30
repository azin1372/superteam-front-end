import DefaultLayout from "@/layouts/default";
import ResultLanding from "./result";
import { UserButton, UserContextType, useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useBalance } from "./useBalance";
// import { ConnectionProvider, WalletProvider, useWallet, useConnection } from "@solana/wallet-adapter-react";/
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import React, { FC, useEffect, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Alert, Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from "@heroui/react";
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

	const { publicKey } = useBalance(userContext);
	const { changeContract, histories, historyModal, onCloseHistoryModal, setHistoryModal, searchParams } = useHistory();
	const [subscribeModal, setSubscribeModal] = React.useState(false);
	const [isSubscribed, setIsSubscribed] = React.useState(false);

	// console.log("aniyyyyyyyyyyyyyyyy", { sol: (userContext as any)?.solana });

	useEffect(() => {
		if ((!userContext.isLoading && !userContext.user) || !publicKey) setIsSubscribed(false);
		else {
			setIsSubscribed(true);
			localStorage.setItem("is_subscribed", "yes");
		}
	}, [publicKey, userContext.isLoading, userContext.user]);

	return (
		<DefaultLayout>
			<Navbar setHistoryModal={setHistoryModal} isSubscribed={isSubscribed} />
			<section className="">
				<ResultLanding
					heroSlot={
						(!userContext.isLoading && !userContext.user) || !publicKey ? (
							<div className="mt-2 " style={{ textAlign: "center" }}>
								<span>
									Subscribe your account to unlock unlimited scans.
									<div>
										<Button variant="flat" className="mr-2 mt-2" color="primary" onPress={() => setSubscribeModal(true)}>
											Subscribe Now
										</Button>
									</div>
								</span>
							</div>
						) : (
							<></>
						)
					}
				/>
			</section>

			{/* {publicKey && (
				<div>
					<p>Wallet address: {publicKey.toString()}</p>
					<p>Balance:: {balance !== undefined ? `${balance / 1e9} SOL` : "Loading..."}</p>
				</div>
			)} */}

			{/* ---------------------------------------------- history modal  ---------------------------------------------- */}
			<Modal isOpen={historyModal} size={"3xl"} onClose={onCloseHistoryModal} backdrop="opaque">
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">History Scan</ModalHeader>
							<ModalBody>
								{histories?.map((history: { [key: string]: any }, index: number) => (
									<div key={index}>
										<button
											disabled={!history?.contract_address || typeof history?.contract_address !== "string"}
											className={`mb-2 ${history?.contract_address === searchParams.get("contractAddress") ? "text-gray-500" : ""} ${history?.contract_address === searchParams.get("contractAddress") ? "pointer-events-none" : ""} `}
											style={{ textAlign: "left" }}
											onClick={() => changeContract(history?.contract_address)}
										>
											<h3 className="tex-lg">{history?.contract_address}</h3>
											{/* <span>{Date(history?.date).toLocaleLowerCase("en-US")}</span> */}
										</button>
										<Divider className="mb-3 mb-1" />
									</div>
								))}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>

			{/* ---------------------------------------------- Subscription modal  ---------------------------------------------- */}
			<Modal size="3xl" isOpen={subscribeModal} onClose={() => setSubscribeModal(false)}>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">Unlock Full Access</ModalHeader>
					<ModalBody className="pb-16">
						<p className="py-0 mb-3 ">Log in and connect your Web3 wallet to enjoy infinite scans.</p>

						<ul className="flex flex-wrap gap-2 pl-4" style={{ listStyleType: "numeric" }}>
							<li className="pl-1 w-full">
								<h4 className="mb-3">Login</h4>
								{userContext.isLoading ? (
									<div className="flex gap-1 items-center">
										<Spinner classNames={{ label: "text-foreground" }} variant="spinner" />
										<div className="mb-2 ml-2">Verifying your account, please wait...</div>
									</div>
								) : (
									<>
										<Alert
											className="w-full"
											variant="faded"
											color={!userContext.isLoading && userContext.user ? "success" : "default"}
											title={
												<>
													<h3 className="font-bold text-[16px]">{userContext.user ? "You're Logged In!" : "Not Logged In!"}</h3>
													<p className="text-sm">{userContext.user ? "Your account is verified." : "Sign in to verify your account and start scanning."} </p>
												</>
											}
										/>
										<div className="mt-2">
											<UserButton className="!bg-transparent sign-in-button" style={{ borderRadius: 12, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }} />
										</div>
									</>
								)}
							</li>

							<li className="mt-5 pl-1 w-full">
								<h4 className="mb-3">Connect Wallet</h4>
								<Alert
									className="w-full"
									variant="faded"
									color={publicKey ? "success" : "default"}
									title={
										<>
											<h3 className="font-bold text-[16px]">{publicKey ? "Wallet Connected!" : "Wallet Not Connected!"}</h3>
											<p className="text-sm">{publicKey ? "Your Web3 wallet is linked." : "Link your Web3 wallet to unlock unlimited scans."}</p>
										</>
									}
								/>

								<div className="mt-2">
									<WalletMultiButton className="bg-danger !text-warning" style={{ backgroundColor: "transparent", border: "1px solid #6b7280", borderRadius: 12 }} />
								</div>
							</li>
						</ul>
						<div className="mt-12">
							<p>
								<b>Privacy Policy:</b>
								<br />
								Our Privacy Policy is simple, your data stays safe with us. We do not use, share, or sell your personal information for any purpose. Your account and wallet details are securely encrypted.
								Scan with confidence, knowing your privacy is our priority.
							</p>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</DefaultLayout>
	);
}

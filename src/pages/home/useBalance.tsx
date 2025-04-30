import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export const useBalance = (userContext: any) => {
	const [balance, setBalance] = useState<number>();

	// The Solana Wallet Adapter hooks
	const { connection } = useConnection();
	const { publicKey } = useWallet();

	const getBalance = async () => {
		try {
			console.log("get balance running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" );
			if (publicKey) {
				const d = await connection.getBalance(publicKey);
				setBalance(d);
			}
		} catch (e) {
			console.log("eE", e);
		}
	};

	useEffect(() => {
		getBalance();
	}, [userContext, publicKey]);

	return {
		balance,
		publicKey,
	};
};

import { userHasWallet  } from "@civic/auth-web3";
import { useUser  } from "@civic/auth-web3/react";
// import useConnection from "@solana/wallet-adapter-react";

// const connection = new Connection(/* your rpc endpoint */);  
// const { publicKey, sendTransaction } = user.sol.wallet;

// const transaction = new Transaction().add(
//   SystemProgram.transfer({
//     fromPubkey: publicKey,
//     toPubkey: new PublicKey(recipient),
//     lamports: 1000000,
//   })
// );


// const signature = await sendTransaction(transaction, connection);



export const useAfterLogin = async () => {
  const userContext = await useUser();

  if (userContext.user && !userHasWallet(userContext)) {
    await userContext.createWallet();
  }
};
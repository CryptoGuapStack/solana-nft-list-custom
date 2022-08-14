import React from "react";
import { useEffect, useState, useMemo } from "react";
import {
  getPhantomWallet,
  getSolflareWallet,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";


// const ENDPOINT = "https://api.devnet.solana.com";




export default function App({ children }) {

      //state
      const [walletAddress, setWalletAddress] = useState(null);

      // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
      const network = WalletAdapterNetwork.Mainnet;

   // This will fetch the users' public key (wallet address) from any wallet we support
   const { publicKey } = useWallet();

   // You can also provide a custom RPC endpoint.
   const endpoint = useMemo(() => clusterApiUrl(network), [network])


  const wallets = useMemo(() => [getPhantomWallet(), getSolflareWallet()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

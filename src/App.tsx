import React, { useCallback, useEffect, useState } from "react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import twitterLogo from './assets/twitter-logo.svg';


// Default styles that can be overridden by your app
require('./App.css');
//require('@solana/wallet-adapter-react-ui/styles.css');

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIF = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
	'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]




export default function App() {


//from gif-portal

// This will fetch the users' public key (wallet address) from any wallet we support



const renderNotConnectedContainer = () => (
  <div>
    <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" />

    <div className="button-container">

    <WalletDialogButton />

    </div>    
  </div>
);



const renderConnectedContainer = () => (
  <div className="connected-container">
    <div className="nft-grid">
    {(nfts || []).map((nft) => (
        <div key={nft.mint}>
          <img src={metadata?.[nft.mint]?.image} alt="nft" width="200" />
          <br />
          {nft.data.name}
        </div>
      ))}
    </div>
  </div>
)








// end from gif-portal


  const wallet = useWallet();
  const { connection } = useConnection();
  const { nfts } = useWalletNfts({
    publicAddress: wallet?.publicKey,
    connection,
  });
  const [metadata, setMetadata] = useState({});

  // we need to fetch the metadata seperately from the NFTs data.uri field
  const fetchMetadata = useCallback(async () => {
    for (const nft of nfts) {
      fetch(nft.data.uri)
        .then((response) => response.json())
        .then((meta) =>
          setMetadata((state) => ({ ...state, [nft.mint]: meta }))
        );
    }
  }, [nfts]);

  useEffect(() => {
    if (nfts?.length) fetchMetadata();
  }, [nfts, fetchMetadata]);

  return (
    <>
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 NFT Portal</p>
          <p className="sub-text">
            View your NFT collection in the metaverse ✨
          </p>
          <main>

          
            {/* We only render the connect button if public key doesn't exist */}
            {wallet?.publicKey ? 'Connected!' : renderNotConnectedContainer()}
            {wallet?.publicKey && renderConnectedContainer()}
          </main>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>



 
      
      <hr />

    </>
  );
}

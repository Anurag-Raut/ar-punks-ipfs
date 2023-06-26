import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Web3Modal from "web3modal";
import { Contract, providers, utils } from "ethers";
import { useEffect, useState,useRef } from 'react';
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const nftAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading,setLoading]=useState(false);
  const [noOfTokensMinted,setTokensminted]=useState('0');

  let tokenIdsMinted;
  async function mintNFT(){
    try{
      const signer= await getProviderOrSigner(true);
      const nftContract= new Contract(nftAddress,abi,signer);
      const tx=await nftContract.mint({value:utils.parseEther('0.05')});
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("Succecfully minted ARpunk NFT");

    }
    catch(error){
      console.error(error);
    }
   




  }

  const connectToWallet= async ()=>{

    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
        console.error(error);
    }

  }

  const getTokenIdsminted= async ()=>{
    try{
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenIds = await nftContract.totalSupply();
      console.log("tokenIds", _tokenIds.toString());
      setTokensminted(_tokenIds.toString());

    }catch(error){
      console.error(error);
    }
   
  }


  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Mumbai network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(()=>{

    if(!walletConnected){

      web3ModalRef.current=new Web3Modal({
        network:"mumbai",
        providerOptions:{},
        disableInjectedProvider:false,
      })
      connectToWallet();
      getTokenIdsminted()
    }

    setInterval(async function () {
      await getTokenIdsminted();
    }, 5 * 1000);

  },[walletConnected])
  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wallet
    if (!walletConnected) {
      return (
        <button onClick={connectToWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }

    // If we are currently waiting for something, return a loading button
    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }

    return (
      <button className={styles.button} onClick={()=>{mintNFT()}}>
        Public Mint 🚀
      </button>
    );
  };


  return (
    <div>
      <Head>
        <title>LW3Punks</title>
        <meta name="description" content="LW3Punks-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to LW3Punks!</h1>
          <div className={styles.description}>
            {/* Using HTML Entities for the apostrophe */}
            It&#39;s an NFT collection for LearnWeb3 students.
          </div>
          <div className={styles.description}>
            {noOfTokensMinted}/10 have been minted
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./LW3punks/1.png" />
        </div>
      </div>

      <footer className={styles.footer}>Made with &#10084; by LW3Punks</footer>
    </div>
  )
}

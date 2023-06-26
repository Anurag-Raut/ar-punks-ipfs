import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useEffect, useState,useRef } from 'react';
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import {useContractRead,useAccount, useContractWrite} from 'wagmi'
import Web3 from "web3";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MetaData from './../components/Metadata';
export default function Home() {
  const {address,isConnected}=useAccount();
  
  const [metadata,setMetadata]=useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading,setLoading]=useState(false);
  const [noOfTokensMinted,setTokensminted]=useState('0');
  const noOFTokens = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'totalSupply',
    watch: true,
  })
  useEffect(()=>{
    // console.log(noOFTokens?.data)
    setTokensminted(noOFTokens?.data?.toString());

  },[noOFTokens])
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'mint',
    value:ethers.parseEther('0.02')
  });

  let tokenIdsMinted;
   async function mintNFT(){
    console.log(ethers.parseEther);
    try{
  write()
    }
    catch(error){
      console.error(error);
    }
   




  }



 
const noOFTokensOfCurrentUser = useContractRead({
      address: NFT_CONTRACT_ADDRESS,
      abi: abi,
      functionName: 'balanceOf',
      args:[address],
      watch: true,
      
    })
 
    let val= parseInt(noOFTokensOfCurrentUser?.data?.toString());
   
  useEffect(()=>{

    if(isConnected){
      setWalletConnected(true)
    }
    else{
      setWalletConnected(false)

    }



  },[isConnected])
  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wallet
    if (!isConnected) {
      return (
        <ConnectButton />
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
  var indents = [];
for (var i = 0; i < val; i++) {
  

  indents.push(i);
}
console.log(indents)



  return (
    <div >
      <div style={{display:'flex' ,width:'95vw', justifyContent:'center'}}>
      <ConnectButton />
        </div>
     
      <Head>
        <title>LW3Punks</title>
        <meta name="description" content="LW3Punks-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to ARPunks!</h1>
          <div className={styles.description}>
            {/* Using HTML Entities for the apostrophe */}
            Buy exclusive ARPunk NFTs.
          </div>
          <div className={styles.description}>
            {noOfTokensMinted}/10 have been minted
          </div>
          {renderButton()}
        </div>
       
      </div>
      <h1 style={{marginBottom:'20px',marginLeft:'20px',fontSize:"40px"}}>Your Nfts -</h1>
      <div>
            {indents.map((data)=>{
              return <MetaData key={data} index={data} address={address} />;
            })}
        </div>

      <footer className={styles.footer}>Made with &#10084; by LW3Punks</footer>
    </div>
  )
}


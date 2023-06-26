import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Web3Modal from "web3modal";
import { Contract, providers, utils,ethers } from "ethers";
import { useEffect, useState,useRef } from 'react';
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import {useContractRead,useAccount} from 'wagmi'
import Web3 from "web3";
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import MetaData from './../components/metadata';




export default  function MetaData({index,address}){
        // console.log(address);
        const [obj,setObject]=useState({})
    const tokenId=useContractRead({
        address:NFT_CONTRACT_ADDRESS,
        abi:abi,
        functionName:'tokenOfOwnerByIndex',
        args:[address,index]
    })
    const metadata=useContractRead({
        address:NFT_CONTRACT_ADDRESS,
        abi:abi,
        functionName:'tokenURI',
        args:[parseInt(tokenId?.data?.toString())]
    })
    useEffect(()=>{
        async function getObj(){
            await fetch("https://ipfs.io/ipfs/Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5/1.json") .then(response => response.json())
            .then(data => {
              // Store the retrieved JSON object in a variable or object
              const a = data;
              console.log(a);
              setObject(a); // Access the stored object
              // You can now work with the 'obj' variable as needed
              // ...
            })
    
        } 
        
        try {
               
           getObj();
          } catch (error) {
            console.error("Error retrieving JSON:", error);
          }

    },[])
    
      console.log(obj?.image);
      const ind=parseInt(tokenId?.data?.toString())+1;
      

    // console.log(metadata?.data?.toString(),'meta')

    return (
        <div style={{display:'flex',margin:'20px',justifyContent:'space-around'}} >
            <h4 >NFT token Id: {ind}</h4>
            <img className='' style={{width:'50vw',height:'45vh'}} src={`https://ipfs.io/ipfs/QmQBHarz2WFczTjz5GnhjHrbUPDnB48W5BM2v2h6HbE1rZ/${ind}.png` } />

        </div>
    )



}
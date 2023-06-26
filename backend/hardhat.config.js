require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
const QUICKNODE_HTTP_URL=process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.18",
  networks:{
    mumbai: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  
};

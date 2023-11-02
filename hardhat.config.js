require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv-defaults").config();

require("./deploy/deploy-poc");
require("./tasks/withdraw-proxy-transfer");

const LATESTNET_RPC_URL = process.env.LATESTNET_RPC_URL;
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const PRIVATE_KEY_ADMIN = process.env.PRIVATE_KEY_ADMIN;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;
const LATESTNET_EXPLORER_URL = process.env.LATESTNET_EXPLORER_URL;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY_ADMIN],
      chainId: 5,
      gasPrice: 30000000000,
      gasMultiplier: 3,
    },
    latestnet: {
      url: LATESTNET_RPC_URL,
      accounts: [PRIVATE_KEY_ADMIN],
      chainId: 418,
      gasPrice: 10000000,
      gasMultiplier: 3,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY_ADMIN],
      chainId: 80001,
      gasPrice: 3000000000,
      gasMultiplier: 3,
    },
  },
  etherscan: {
    apiKey: {
      //ethereum
      mainnet: ETHERSCAN_KEY,
      goerli: ETHERSCAN_KEY,
      //polygon
      polygon: POLYGONSCAN_KEY,
      polygonMumbai: POLYGONSCAN_KEY,
      latestnet: ETHERSCAN_KEY,
    },
    customChains: [
      {
        network: "latestnet",
        chainId: 418,
        urls: {
          apiURL: "https://testexplorer.lachain.network/api",
          browserURL: LATESTNET_EXPLORER_URL,
        },
      },
    ],
  },
  gasReporter: {
    enabled: false,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.8",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};

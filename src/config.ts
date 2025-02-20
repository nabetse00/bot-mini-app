import { defineChain } from 'viem';
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, sonic } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors';

export const projectId = "f8a1c92a8299099a9362d29b2d57e091";
export const sonicBlazeTestnet = defineChain({
    id: 57054,
    sourceId: 11155111,
    name: 'Sonic Blaze Testnet',
    nativeCurrency: {
      name: 'Sonic',
      symbol: 'S',
      decimals: 18
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.blaze.soniclabs.com"]
      },
    },
    blockExplorers: {
      default: {
        name: 'SonicScan',
        url: 'https://blaze.soniclabs.com'
      },
    },
    contracts: {
      multicall3:{
        address: "0xcA11bde05977b3631167028862bE2a173976CA11", 
        blockCreated: 1100
      },
    },
    testnet: true,
  })




export const config = createConfig({
  connectors: [
    // Get projectId at https://cloud.walletconnect.com
    walletConnect({
      projectId: projectId,
    }),
  ],
  chains: [mainnet, sepolia, sonic, sonicBlazeTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [sonic.id]: http(),
    [sonicBlazeTestnet.id]: http("https://rpc.blaze.soniclabs.com"),
  },
})


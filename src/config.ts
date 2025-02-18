import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, sonic, sonicTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors';
const projectId = "f8a1c92a8299099a9362d29b2d57e091";

export const config = createConfig({
  connectors: [
    // Get projectId at https://cloud.walletconnect.com
    walletConnect({
      projectId: projectId,
    }),
  ],
  chains: [mainnet, sepolia, sonic, sonicTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [sonic.id]: http(),
    [sonicTestnet.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { projectId } from './config'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain, mainnet, sepolia, sonic, sonicTestnet } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'

const queryClient = new QueryClient();

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://nabetse00.github.io/bot-mini-app/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const networks = [mainnet, sepolia, sonic, sonicTestnet]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

const blazeTestnetNetwork = defineChain({
  id: 57054,
  caipNetworkId: 'eip155:57054',
  chainNamespace: 'eip155',
  name: 'Sonic Blaze Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.blaze.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Blaze explorer', url: 'https://blaze.soniclabs.com' },
  },
  contracts: {
    // Add the contracts here
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1100
    }
  }
})

createAppKit({
  adapters: [wagmiAdapter],
  networks:[mainnet, sepolia, sonic, blazeTestnetNetwork] ,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)

import { useEffect } from 'react';
import './App.css'

import { openLink, init } from '@telegram-apps/sdk';

import './mockEnvs'
import AccountData from './components/accountData';

declare const window: any;
try {
  
init();
} catch (error) {
console.error(`Init TMA error: ${error}`) 
}

export const isTelegramEnvironment = async () => {
  try {
    if (
      typeof window !== "undefined" &&
      window.Telegram &&
      window.Telegram.WebApp
    ) {
      return true;
    }

    if (
      "TelegramWebviewProxy" in window &&
      typeof window.TelegramWebviewProxy.postEvent === "function"
    ) {
      window.TelegramGameProxy = { receiveEvent() { } };
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error detecting Telegram environment", error);
    return false;
  }
};


function App() {

  // Override window.open in useEffect
  useEffect(() => {
    async function init() {
      const isTG = await isTelegramEnvironment();
      if (!isTG) {
        return;
      }
      // const utils = initUtils(); // Initialize the Telegram SDK utility class
      window.open = (url: any) => {
        console.log(`Try to openLink ${url}`);
        try {
          if (!url) {
            return null;
          }

          if (typeof url !== "string") {
            url = url.toString();
          }

          if (url.startsWith("metamask://")) {
            url = url.replace("metamask://", "https://metamask.app.link/"); // Replace the MetaMask-specific link with a compatible app link
          }

          console.log(`Opening ${url}`);
          openLink(url); // Use Telegram's SDK utility to open the link, suitable for the Telegram Mini App environment
        } catch (error) {
          console.error(`Failed to openLink ${url}`, error);
        }

        return null;
      };
    }
    init();
  }, []);



  return (
    <>
    <appkit-network-button />
      <appkit-button balance='show'/>
      
      ---
      <AccountData />
    </>
  )
}

export default App

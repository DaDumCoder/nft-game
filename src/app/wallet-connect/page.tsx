"use client";
import { ConnectButton } from "thirdweb/react";
import { useRouter } from 'next/navigation';
import { useActiveWallet } from "thirdweb/react";
import { client } from "@/client";
import { useEffect } from "react";
import { defineChain } from "thirdweb/chains";

// import { soneium } from "thirdweb/chains";

export default function WalletConnect() {
  const router = useRouter();
  const wallet = useActiveWallet();
  const chain = defineChain(1868);

  console.log("Chain:", chain);
  useEffect(() => {
    if (wallet) {
      console.log("Wallet already connected, redirecting...");
      router.replace('/mint');
    }
  }, [wallet, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative mx-auto bg-black rounded-[60px] h-[860px] w-[420px] shadow-xl overflow-hidden border-[14px] border-black">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-50"></div>
        
        <div className="absolute top-[120px] left-[-14px] h-[80px] w-[4px] bg-gray-700 rounded-l-lg"></div>
        <div className="absolute top-[220px] left-[-14px] h-[80px] w-[4px] bg-gray-700 rounded-l-lg"></div>
        <div className="absolute top-[180px] right-[-14px] h-[100px] w-[4px] bg-gray-700 rounded-r-lg"></div>

        <div className="h-full w-full bg-[#7B61FF] flex flex-col items-center justify-center p-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-normal">
              <span className="text-yellow-300">VIBE</span>
              <span className="text-white">HIT</span>
            </h1>
          </div>

          <div className="w-full max-w-[340px] space-y-4">
            <div className="text-center">
              <p className="text-white text-lg mb-4">CONNECT YOUR WALLET</p>
              <div className="w-full bg-[#6d5ceb]/20 hover:bg-[#6d5ceb]/30 backdrop-blur-sm text-white rounded-xl p-4" style={{ fontFamily: "Digitalt, sans-serif" }}>
                <ConnectButton  chain={chain}
                  key="connect-button"
                  client={client}
                  onConnect={() => {
                    console.log("Wallet connected, redirecting...");
                    router.replace('/mint');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
} 
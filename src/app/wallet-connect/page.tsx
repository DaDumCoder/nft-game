"use client";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { useRouter } from 'next/navigation';
import { client } from "@/client";

export default function WalletConnect() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Phone frame */}
      <div className="relative mx-auto bg-black rounded-[60px] h-[860px] w-[420px] shadow-xl overflow-hidden border-[14px] border-black">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-50"></div>
        
        {/* Side buttons */}
        <div className="absolute top-[120px] left-[-14px] h-[80px] w-[4px] bg-gray-700 rounded-l-lg"></div>
        <div className="absolute top-[220px] left-[-14px] h-[80px] w-[4px] bg-gray-700 rounded-l-lg"></div>
        <div className="absolute top-[180px] right-[-14px] h-[100px] w-[4px] bg-gray-700 rounded-r-lg"></div>

        {/* Main content */}
        <div className="h-full w-full bg-[#7B61FF] flex flex-col items-center justify-center p-6">
          {/* Logo */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold">
              <span className="text-yellow-300">VIBE</span>
              <span className="text-white">HIT</span>
            </h1>
          </div>

          {/* Connection options */}
          <div className="w-full max-w-[340px] space-y-4">
            <div className="text-center">
              <p className="text-white text-lg mb-4">CONNECT YOUR WALLET</p>
              <div className="w-full bg-[#6d5ceb]/20 hover:bg-[#6d5ceb]/30 backdrop-blur-sm text-white rounded-xl p-4">
                <ConnectButton client={client} />
              </div>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
} 
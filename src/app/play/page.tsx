"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useActiveAccount } from "thirdweb/react";
import { ethers } from "ethers";
import abi from "../mint/abi.json";
import { Suspense } from 'react';

function PlayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMinted = searchParams.get('minted') === 'true';

  const account = useActiveAccount();


  const handlePlayClick = () => {
    if (!isMinted) {
      toast.error('You have to mint before start playing', {
        style: {
          background: '#FF3B3B',
          color: '#fff',
          fontWeight: 'bold',
        },
        duration: 2000,
      });
      return;
    }
    window.location.href = 'https://play.metakraft.live/Build/';
  };

  const handleCheckNFT = async () => {
    console.log("check nft");

    const address = account?.address;

    console.log("address", address);

    if (!address) {
      toast.error('You have to connect your wallet before start playing', {
        style: {
          background: '#FF3B3B',
          color: '#fff',
          fontWeight: 'bold',
        },
        duration: 2000,
      });
      return;
    }

    if (address) {
      console.log("address", address);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractInstance = new ethers.Contract(
        "0xa52bfb7BbA6e40a2F0Bc1177787D58bA915bB5aA",
        abi,
        provider
      );

      const balance = await contractInstance.balanceOf(address);
      console.log("NFT balance:", balance.toString());

      if (balance > 0) {
        toast.success('You have NFT', {
          style: {
            background: '#A4D555',
            color: '#fff',
            fontWeight: 'bold',
          },
          duration: 2000,
        });
      } else {
        toast.error('You do not have NFT, Level Up to get it', {
          style: {
            background: '#FF3B3B',
            color: '#fff',
            fontWeight: 'bold',
          },
          duration: 2000,
        });
      }
    }

    // router.push('/mint');
  };

  const handleMintMore = () => {
    router.push('/mintmore');
  };

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

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-[40px] bg-[#5d4ed3] flex items-center justify-between px-8 z-10">
          <div className="text-white text-xs">9:41</div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/80 rounded-full"></div>
            <div className="w-4 h-3 bg-white/80 rounded-sm"></div>
            <div className="text-white text-xs">100%</div>
          </div>
        </div>

        {/* Main content area */}
        <div className="relative w-full h-full bg-[#6d5ceb] overflow-hidden flex flex-col">
          {/* Left sidebar icons - same as main page */}
          <div className="absolute left-4 top-16 z-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-[24px] py-2 flex flex-col gap-[2px]">
              <button className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10">
                <Image src="/settings_icon.svg" alt="Settings" width={24} height={24} className="w-6 h-6" />
              </button>
              <button className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10">
                <Image src="/mic_icon.svg" alt="Sound" width={24} height={24} className="w-6 h-6" />
              </button>
              <button className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10">
                <Image src="/info_btn.svg" alt="Info" width={24} height={24} className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Gems counter - same as main page */}
          <div className="absolute right-4 top-12 flex items-center">
            <div className="relative flex items-center">
              <div className="absolute -left-6">
                <Image src="/Group 105.svg" alt="Gem" width={44} height={44} className="w-11 h-11" />
              </div>
              <div className="bg-[#21272e] pl-6 pr-4 py-[3px] rounded-[12px] flex items-center">
                <span className="text-white text-2xl font-normal tracking-wider text-right min-w-[5px] justify-end flex"
                  style={{ textShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)" }}>
                  0010
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center pt-32 px-6">
            {/* VIBE title */}
            <h1 className="text-[#FFE17B] text-7xl font-medium mb-2" style={{
              textShadow: "4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}>
              VIBE
            </h1>

            {/* HIT title */}
            <h1 className="text-[#8662FF] text-8xl font-medium -mt-4 mb-8" style={{
              textShadow: "4px 4px 0px rgba(0, 0, 0, 0.25)"
            }}>
              HIT
            </h1>

            {/* Subtitle */}
            <p className="text-white text-2xl font-normal text-center mb-20" style={{
              textShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)"
            }}>
              CLAIM ALL MISSION NFT'S
              <br />
              TO UNLOCK ACS IN STEP 3
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-6 w-full max-w-[320px]">
              <button 
                onClick={handlePlayClick}
                className={`relative bg-[#A4D555] text-white text-2xl font-medium py-4 rounded-[30px] shadow-[0_4px_0px_#7BA140] hover:translate-y-[2px] hover:shadow-[0_3px_0px_#7BA140] active:translate-y-[3px] active:shadow-[0_1px_0px_#7BA140] transition-all duration-150 ${!isMinted ? 'opacity-80' : ''}`}
              >
                START GAME
                {!isMinted && (
                  <div className="absolute inset-0 bg-black/50 rounded-[30px] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17Z" fill="white"/>
                      <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z" fill="white"/>
                    </svg>
                  </div>
                )}
              </button>
              <button onClick={handleCheckNFT} className="bg-[#A4D555] text-white text-2xl font-medium py-4 rounded-[30px] shadow-[0_4px_0px_#7BA140] hover:translate-y-[2px] hover:shadow-[0_3px_0px_#7BA140] active:translate-y-[3px] active:shadow-[0_1px_0px_#7BA140] transition-all duration-150">
                CHECK NFT
              </button>
              <button onClick={handleMintMore} className="bg-[#A4D555] text-white text-2xl font-medium py-4 rounded-[30px] shadow-[0_4px_0px_#7BA140] hover:translate-y-[2px] hover:shadow-[0_3px_0px_#7BA140] active:translate-y-[3px] active:shadow-[0_1px_0px_#7BA140] transition-all duration-150">
                Mint More
              </button>
              <p className="text-[#a89bf3] text-3xl font-normal mt-auto mb-24 text-center">
                STEP 2...
              </p>
        

            </div>

         
          </div>

          {/* Bottom navigation */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-white pt-2 pb-6 rounded-t-3xl">
            <button 
              onClick={() => router.push('/')}
              className="w-14 h-14 bg-[#50a9bf] text-white font-normal rounded-2xl flex flex-col items-center justify-center"
            >
              <span className="text-sm">MINT</span>
            </button>

            <button className="w-16 h-16 bg-[#f182d1] text-[#c35bae] font-medium rounded-2xl flex flex-col items-center justify-center">
              <Image 
                src="/Group 1.svg"
                alt="Play"
                width={40}
                height={20}
                className="w-10 h-5"
              />
            </button>

            {/* CLAIM ACS with overlay and lock */}
            <div className="relative w-16 h-16">
              <button className="w-16 h-16 bg-[#b39ef6] text-white font-normal rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl mb-1">😀</span>
                <span className="text-[10px]">CLAIM</span>
                <span className="text-[10px]">ACS</span>
              </button>
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17Z" fill="white"/>
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z" fill="white"/>
                </svg>
              </div>
            </div>

            {/* SHVAN AI with overlay and lock */}
            <div className="relative w-16 h-16">
              <button className="w-16 h-16 bg-[#ffda69] text-white font-normal rounded-2xl flex flex-col items-center justify-center">
                <span className="text-xl mb-1">🤖</span>
                <span className="text-[10px]">SHVAN AI</span>
              </button>
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17Z" fill="white"/>
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z" fill="white"/>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 bg-[#e85e76] text-white text-[10px] font-normal px-2 py-1 rounded-full">
                SOON
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

export default function PlayScreen() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayContent />
    </Suspense>
  );
} 
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

export default function Home() {
  // State for sound toggle and settings/info modals
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [count, setCount] = useState(10);
  const MIN_COUNT = 1;
  const MAX_COUNT = 100;
  const [isMinted, setIsMinted] = useState(false);

  // Inside your Home component, add the router
  const router = useRouter();
  const address = useAddress();
  const disconnect = useDisconnect();

  // Redirect to wallet-connect if not connected
  useEffect(() => {
    if (!address) {
      router.replace('/wallet-connect');
    }
  }, [address, router]);

  const handlePlayClick = () => {
    if (!isMinted) {
      toast('You have to mint before start playing', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#FF3B3B',
          color: '#fff',
          fontWeight: 'bold',
        },
        duration: 2000,
      });
      return;
    }
    window.location.href = 'https://abdullahs17053.itch.io/vibehit';
  };

  // Sound toggle handler
  const handleSoundToggle = () => {
    setIsSoundOn(!isSoundOn);
  };

  const handleIncrement = () => {
    if (count < MAX_COUNT) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > MIN_COUNT) {
      setCount(count - 1);
    }
  };

  const handleMint = () => {
    setIsMinted(true);
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

        {/* Status bar with wallet status */}
        <div className="absolute top-0 left-0 right-0 h-[40px] bg-[#5d4ed3] flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${address ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <div className="text-white text-xs">
              {address ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          {address && (
            <button 
              onClick={() => disconnect()}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md transition-colors"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Actual app content */}
        <div
          className="relative w-full h-full bg-[#6d5ceb] overflow-hidden flex flex-col"
          style={{ fontFamily: "Digitalt, sans-serif" }}
        >
          {/* Left sidebar icons */}
          <div className="absolute left-4 top-16 z-10">
            {/* Container for all icons */}
            <div className="bg-white/20 backdrop-blur-sm rounded-[24px] py-2 flex flex-col gap-[2px]">
              {/* Settings icon with extra top padding */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors "
              >
                <Image
                  src="/settings_icon.svg"
                  alt="Settings"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>

              {/* Sound icon - shows when sound is on */}
              {isSoundOn && (
                <button
                  onClick={handleSoundToggle}
                  className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Image
                    src="/mic_icon.svg"
                    alt="Sound On"
                    width={24}
                    height={24}
                    className="w-6 h-6 opacity-90"
                  />
                </button>
              )}

              {/* Mute icon - shows when sound is off */}
              {!isSoundOn && (
                <button
                  onClick={handleSoundToggle}
                  className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Image
                    src="/mute_icon.svg"
                    alt="Sound Off"
                    width={24}
                    height={24}
                    className="w-6 h-6 opacity-90"
                  />
                </button>
              )}

              {/* Info icon */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Image
                  src="/info_btn.svg"
                  alt="Info"
                  width={24}
                  height={24}
                  className="w-6 h-6 opacity-90"
                />
              </button>
            </div>
          </div>

          {/* Gems counter at top right */}
          <div className="absolute right-4 top-12 flex items-center">
            {/* Number container with gem overlay */}
            <div className="relative flex items-center">
              {/* Gem icon positioned on top */}
              <div className="absolute -left-6">
                <Image
                  src="/Group 105.svg"
                  alt="Gem"
                  width={44}
                  height={44}
                  className="w-11 h-11"
                />
              </div>

              {/* Counter pill */}
              <div className="bg-[#21272e] pl-6 pr-4 py-[3px] rounded-[12px] flex items-center">
                <span
                  className="text-white text-2xl font-bold tracking-wider text-right min-w-[5px] justify-end flex"
                  style={{
                    textShadow: "2px 2px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  0000
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div
            className="flex flex-col items-center justify-center mt-32 px-6"
            style={{ fontFamily: "Digitalt, sans-serif" }}
          >
            {/* Background Vector */}
            <div
              className="absolute left-0 right-0 flex justify-center"
              style={{ top: "220px" }}
            >
              <Image
                src="/Vector 9.svg"
                alt="Background"
                width={400}
                height={400}
                className="opacity-30"
                priority
              />
            </div>

            {/* Main title */}
            {!isMinted && (
              <h1
                className="text-6xl font-extrabold text-white tracking-wide mb-1 relative z-10"
                style={{
                  textShadow: "3px 3px 0 #b64a8a, 6px 6px 0 #21272e",
                  fontFamily: "Digitalt, sans-serif",
                }}
              >
                GET ACS
              </h1>
            )}

            {/* Subtitle */}
            <p
              className="text-white text-xl font-bold text-center mb-3 relative z-10"
              style={{
                textShadow: "2px 2px 0 #b64a8a",
              }}
            >
              {isMinted ? (
                <>
                  YOU COMPLETED STEP 1,
                  <br />
                  NOW MOVE TO STEP 2
                </>
              ) : (
                <>
                  MINT YOUR GEMS TO
                  <br />
                  ACCESS GAME & EARN
                </>
              )}
            </p>

            {/* Gem graphics */}
            <div className="flex items-center justify-center gap-4 mb-6 z-20">
              <Image
                src="/Group 106.svg"
                alt="Gem"
                width={120}
                height={120}
                className="relative"
              />
            </div>

            {/* Main card with z-index to stay above background */}
            <div className="bg-white rounded-2xl w-full h-[250px] -top-2 max-w-[340px] p-6 pb-12 relative z-10">
              {/* Ribbon banner */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-72">
                <div className="relative">
                  <Image
                    src="/ribbon.svg"
                    alt="Ribbon"
                    width={288}
                    height={120}
                    className="w-72 mt-1"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center -mt-8">
                    {/* MINT STARS text with pink color and subtle shadow */}
                    <p
                      className="text-[#B20D78] text-2xl font-bold opacity-80 -mb-1"
                      style={{
                        textShadow: "0px 1px 2px rgba(0,0,0,0.15)",
                      }}
                    >
                      MINT STARS
                    </p>

                    {/* TO START with white 3D effect */}
                    <p
                      className="text-white text-2xl font-black leading-[0.9]"
                      style={{
                        textShadow: `
                        -1px -1px 0 #E35EAF,
                        1px -1px 0 #E35EAF,
                        -1px 1px 0 #E35EAF,
                        1px 1px 0 #E35EAF,
                        0 2px 2px rgba(0,0,0,0.3)
                      `,
                      }}
                    >
                      TO START
                    </p>

                    {/* GAME with white 3D effect */}
                    <p
                      className="text-white text-2xl font-black leading-[0.9]"
                      style={{
                        textShadow: `
                        -1px -1px 0 #E35EAF,
                        1px -1px 0 #E35EAF,
                        -1px 1px 0 #E35EAF,
                        1px 1px 0 #E35EAF,
                        0 2px 2px rgba(0,0,0,0.3)
                      `,
                      }}
                    >
                      GAME
                    </p>
                  </div>
                </div>
              </div>

              {!isMinted ? (
                <>
                  {/* Counter */}
                  <div className="mt-18 flex justify-center mb-8">
                    <div className="bg-[#06C3F6] rounded-[10px] h-[37px] flex items-center px-3 py-1 shadow-[0_4px_0px_#5199AD]">
                      {/* Minus button */}
                      <button
                        onClick={handleDecrement}
                        disabled={count <= MIN_COUNT}
                        className={`w-6 h-6 rounded-full bg-[#8662FF] flex items-center justify-center shadow-[inset_0px_-4px_0px_#6A47E2] ${
                          count <= MIN_COUNT
                            ? "opacity-50"
                            : "hover:bg-[#7452EF] active:shadow-[inset_0px_-2px_0px_#6A47E2]"
                        }`}
                      >
                        <Image
                          src="/minus.svg"
                          alt="Decrease"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </button>

                      {/* Number */}
                      <span
                        className="text-white text-4xl font-black mx-8 leading-none"
                        style={{
                          textShadow: "0px 2px 0px rgba(0,0,0,0.25)",
                        }}
                      >
                        {count}
                      </span>

                      {/* Plus button */}
                      <button
                        onClick={handleIncrement}
                        disabled={count >= MAX_COUNT}
                        className={`w-6 h-6 rounded-full bg-[#8662FF] flex items-center justify-center shadow-[inset_0px_-4px_0px_#6A47E2] ${
                          count >= MAX_COUNT
                            ? "opacity-50"
                            : "hover:bg-[#7452EF] active:shadow-[inset_0px_-2px_0px_#6A47E2]"
                        }`}
                      >
                        <Image
                          src="/plus.svg"
                          alt="Increase"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Mint button */}
                  <div className="flex justify-center">
                    <button 
                      onClick={handleMint}
                      className="bg-[#FFB946] text-white font-black text-2xl h-[37px] px-12 flex items-center justify-center rounded-[10px] shadow-[0_4px_0px_#C68C36] hover:translate-y-[2px] hover:shadow-[0_4px_0px_#C68C36] active:translate-y-[4px] active:shadow-[0_2px_0px_#C68C36] transition-all duration-150"
                    >
                      MINT
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Success message */}
                  <div className="mt-18 flex flex-col items-center justify-center gap-6">
                    <p className="text-[#A4D555] text-4xl font-black text-center" style={{
                      textShadow: '0px 2px 0px rgba(0,0,0,0.15)'
                    }}>
                      NFT MINTED
                      <br />
                      SUCCESSFULLY
                    </p>

                    {/* Step 2 button */}
                    <button 
                      onClick={() => router.push('/play?minted=true')}
                      className="bg-[#FFB946] text-white font-black text-2xl h-[37px] px-12 flex items-center justify-center rounded-[10px] shadow-[0_4px_0px_#C68C36] hover:translate-y-[2px] hover:shadow-[0_4px_0px_#C68C36] active:translate-y-[4px] active:shadow-[0_2px_0px_#C68C36] transition-all duration-150"
                    >
                      STEP 2
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Win text */}
            <p
              className="text-white font-bold text-3xl text-center mt-2 px-4"
              style={{
                textShadow: "2px 2px 0 #b64a8a",
              }}
            >
              {isMinted ? 'Some lucky players can win up to $1000' : 'You are enrolled for the airdrop'}
              <br />
            </p>

            {/* Step indicator */}
            <p className="text-[#a89bf3] text-3xl font-bold mt-2">
              {isMinted ? 'STEP 1...' : 'STEP 1...'}
            </p>
          </div>

          {/* Bottom navigation */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-white pt-2 pb-6 rounded-t-3xl">
            <button className="w-16 h-16 bg-[#50a9bf] text-white font-bold rounded-2xl flex flex-col items-center justify-center">
              <span className="text-sm">MINT</span>
            </button>

            {/* Play button with lock overlay */}
            <div className="relative w-16 h-16">
              <button 
                onClick={handlePlayClick}
                className="w-16 h-16 bg-[#f182d1] text-[#c35bae] font-bold rounded-2xl flex flex-col items-center justify-center"
              >
                <Image 
                  src="/Group 1.svg"
                  alt="Play"
                  width={40}
                  height={20}
                  className="w-10 h-5"
                />
              </button>
              {!isMinted && (
                <div 
                  onClick={handlePlayClick}
                  className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center cursor-pointer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17Z" fill="white"/>
                    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z" fill="white"/>
                  </svg>
                </div>
              )}
            </div>

            {/* CLAIM ACS with overlay and lock */}
            <div className="relative w-16 h-16">
              <button className="w-16 h-16 bg-[#b39ef6] text-white font-bold rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl mb-1">😀</span>
                <span className="text-[10px]">CLAIM</span>
                <span className="text-[10px]">ACS</span>
              </button>
              {/* Lock overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17Z" fill="white"/>
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z" fill="white"/>
                </svg>
              </div>
            </div>

            {/* SHVAN AI with overlay and lock */}
            <div className="relative w-16 h-16">
              <button className="w-16 h-16 bg-[#ffda69] text-white font-bold rounded-2xl flex flex-col items-center justify-center">
                <span className="text-xl mb-1">🤖</span>
                <span className="text-[10px]">SHVAN AI</span>
              </button>
              {/* Lock overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17Z" fill="white"/>
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z" fill="white"/>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 bg-[#e85e76] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                SOON
              </div>
            </div>
          </div>

          {/* Settings Modal */}
          {showSettings && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-[80%] max-w-[300px]">
                <h2 className="text-2xl font-bold text-black/60 mb-4">
                  Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="bg-[#6d5ceb] text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Info Modal */}
          {showInfo && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-[80%] max-w-[300px]">
                <h2 className="text-2xl font-bold mb-4">Information</h2>
                <button
                  onClick={() => setShowInfo(false)}
                  className="bg-[#6d5ceb] text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
}

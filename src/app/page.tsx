"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import iPhoneFrame from "@/components/iPhoneFrame";

const GEM_POSITIONS = [
  { x: 77, y: 115 },
  { x: 147, y: 541 },
  { x: 366, y: 583 },
  { x: 349, y: 331 },
  { x: 183, y: 284 },
  { x: 129, y: 727 }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [count, setCount] = useState(10);
  const MIN_COUNT = 1;
  const MAX_COUNT = 100;
  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.replace('/wallet-connect');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="relative mx-auto bg-black rounded-[60px] h-[860px] w-[420px] shadow-xl overflow-hidden border-[14px] border-black">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-50"></div>
          
          <div className="absolute top-[120px] left-[-14px] h-[80px] w-[4px] bg-gray-700 rounded-l-lg"></div>
          <div className="absolute top-[220px] left-[-14px] h-[80px] w-[4px] bg-gray-700 rounded-l-lg"></div>
          <div className="absolute top-[180px] right-[-14px] h-[100px] w-[4px] bg-gray-700 rounded-r-lg"></div>

          <div className="h-full w-full flex flex-col items-center justify-center bg-[#7B61FF] relative overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: GEM_POSITIONS[i].x,
                    y: GEM_POSITIONS[i].y,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    scale: [0, 1, 1, 0],
                    rotate: [0, 180, 360],
                    y: [GEM_POSITIONS[i].y, GEM_POSITIONS[i].y + 100]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src="/Group 106.svg"
                    alt="Floating Gem"
                    width={60}
                    height={60}
                    className="opacity-30"
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3
                }}
                className="mb-8"
              >
                <Image
                  src="/Group 106.svg"
                  alt="Main Gem"
                  width={120}
                  height={120}
                  className="animate-pulse"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center"
              >
                <h1 className="text-6xl font-bold">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-yellow-300"
                  >
                    VIBE
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="text-white"
                  >
                    HIT
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 bg-white rounded-full"
                />
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

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

  const statusBarContent = (
    <>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white/50"></div>
        <div className="text-white text-xs">VibeHit App</div>
      </div>
      
      <div className="text-white text-xs">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </>
  );

  const splashContent = (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-[#8662FF]/30 to-transparent opacity-70" />
      
      <div className="relative flex flex-col items-center z-10">
        <div className="mb-4">
          <Image
            src="/Group 106.svg" 
            alt="VibeHit Logo"
            width={150}
            height={150}
            className="animate-pulse"
          />
        </div>
        
        <h1 
          className="text-6xl font-extrabold text-white tracking-wide mb-4"
          style={{
            textShadow: "3px 3px 0 #b64a8a, 6px 6px 0 #21272e",
            fontFamily: "Digitalt, sans-serif",
          }}
        >
          VIBEHIT
        </h1>
        
        <p 
          className="text-white text-xl font-bold text-center mb-8"
          style={{
            textShadow: "2px 2px 0 #b64a8a",
          }}
        >
          PLAY & EARN WITH VIBES
        </p>
        
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        ) : (
          <button 
            onClick={() => router.push('/wallet-connect')}
            className="bg-[#FFB946] text-white font-black text-2xl h-[45px] px-10 flex items-center justify-center rounded-[12px] shadow-[0_4px_0px_#C68C36] hover:translate-y-[2px] hover:shadow-[0_4px_0px_#C68C36] active:translate-y-[4px] active:shadow-[0_2px_0px_#C68C36] transition-all duration-150"
          >
            GET STARTED
          </button>
        )}
      </div>
      
      <div className="absolute left-0 right-0 bottom-40 flex justify-center">
        <Image
          src="/Vector 9.svg"
          alt="Background"
          width={400}
          height={400}
          className="opacity-30"
          priority
        />
      </div>
    </div>
  );

  return (
    <iPhoneFrame
      statusBarContent={statusBarContent}
      backgroundClassName="bg-[#6d5ceb]"
    >
      {splashContent}
    </iPhoneFrame>
  );
}

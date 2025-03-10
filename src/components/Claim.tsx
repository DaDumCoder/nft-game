import React from 'react';
import Image from 'next/image';

interface ClaimProps {
  isMinted?: boolean;
  handlePlayClick?: () => void;
}

const Claim: React.FC<ClaimProps> = ({ isMinted = false, handlePlayClick }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-white pt-2 pb-6 rounded-t-3xl">
      <button className="w-16 h-16 bg-[#50a9bf] text-white font-bold rounded-2xl flex flex-col items-center justify-center">
        <span className="text-sm">MINT</span>
      </button>

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

      <div className="relative w-16 h-16">
        <button className="w-16 h-16 bg-[#b39ef6] text-white font-bold rounded-2xl flex flex-col items-center justify-center">
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

      <div className="relative w-16 h-16">
        <button className="w-16 h-16 bg-[#ffda69] text-white font-bold rounded-2xl flex flex-col items-center justify-center">
          <span className="text-xl mb-1">🤖</span>
          <span className="text-[10px]">SHVAN AI</span>
        </button>
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
  );
};

export default Claim;

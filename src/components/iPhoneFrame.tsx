import React, { ReactNode } from 'react';

interface iPhoneFrameProps {
  children: ReactNode;
  statusBarContent?: ReactNode;
  bottomNavContent?: ReactNode;
  backgroundClassName?: string;
}

export default function IPhoneFrame({ 
  children, 
  statusBarContent, 
  bottomNavContent,
  backgroundClassName = "bg-[#6d5ceb]" 
}: iPhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative mx-auto bg-black rounded-[60px] h-[860px] w-[420px] shadow-xl overflow-hidden border-[14px] border-black">
        <div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-50 flex items-center justify-center">
          <div className="absolute right-[24px] w-[8px] h-[8px] rounded-full bg-[#1a1a1a]"></div>
        </div>

        <div className="absolute top-[8px] left-0 right-0 h-[44px] bg-transparent flex items-center justify-between px-8 z-[45]">
          {statusBarContent}
        </div>

        <div className={`relative w-full h-full ${backgroundClassName} overflow-hidden`}>
          {children}
        </div>

        {bottomNavContent && (
          <div className="absolute bottom-0 left-0 right-0 bg-white pt-2 pb-6 rounded-t-3xl">
            {bottomNavContent}
          </div>
        )}

        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
} 
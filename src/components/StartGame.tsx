import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';

interface StartGameProps {
  isMinted: boolean;
  handleMint: () => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  count: number;
  txHash?: string;
  nftTokenId?: string;
  getOpenSeaURL: (tokenId: string) => string;
  MIN_COUNT: number;
  MAX_COUNT: number;
}

const StartGame = ({ isMinted, handleMint, handleIncrement, handleDecrement, count, txHash, nftTokenId, getOpenSeaURL, MIN_COUNT, MAX_COUNT }: StartGameProps) => {
    const router = useRouter();

  return (
    <div className="bg-white rounded-2xl w-full h-[250px] -top-2 max-w-[340px] p-6 pb-12 relative z-10">
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
          <p
            className="text-[#B20D78] text-2xl font-bold opacity-80 -mb-1"
            style={{
              textShadow: "0px 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            MINT STARS
          </p>

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
        <div className="mt-18 flex justify-center mb-8">
          <div className="bg-[#06C3F6] rounded-[10px] h-[37px] flex items-center px-3 py-1 shadow-[0_4px_0px_#5199AD]">
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

            <span
              className="text-white text-4xl font-black mx-8 leading-none"
              style={{
                textShadow: "0px 2px 0px rgba(0,0,0,0.25)",
              }}
            >
              {count}
            </span>

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
        <div className="mt-18 flex flex-col items-center justify-center gap-6">
          <p className="text-[#A4D555] text-4xl font-black text-center" style={{
            textShadow: '0px 2px 0px rgba(0,0,0,0.15)'
          }}>
            NFT MINTED
            <br />
            SUCCESSFULLY
          </p>

          {/* <div className="flex flex-col gap-2 w-full text-center">
            {txHash && (
              <a 
                href={`https://sepolia.basescan.org/tx/${txHash}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#8662FF] text-sm font-bold underline flex items-center justify-center hover:text-[#7452EF]"
              >
                <span>View Transaction</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {nftTokenId && (
              <a 
                href={getOpenSeaURL(nftTokenId)}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#06C3F6] text-sm font-bold underline flex items-center justify-center hover:text-[#05A3D0]"
              >
                <span>View on OpenSea</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div> */}

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
  )
}

export default StartGame
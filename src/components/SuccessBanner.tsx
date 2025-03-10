import { FC } from 'react';

interface SuccessBannerProps {
  txHash?: string;
  nftTokenId?: string;
}

const getOpenSeaURL = (tokenId: string) => {
  return `https://opensea.io/assets/ethereum/${tokenId}`;
};

const SuccessBanner: FC<SuccessBannerProps> = ({ txHash, nftTokenId }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-2 bg-green-500">
      <div className="flex items-center justify-between w-full max-w-md px-2">
        <div className="flex items-center">
          <span className="text-white font-bold mr-2">✅ NFT SUCCESSFULLY MINTED!</span>
        </div>
        <div className="flex gap-3">
          {txHash && (
            <a 
              href={`https://sepolia.basescanWallet account:.org/tx/${txHash}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-xs font-bold underline flex items-center hover:text-white/80"
            >
              <span>VIEW TX</span>
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
              className="text-white text-xs font-bold underline flex items-center hover:text-white/80"
            >
              <span>OPENSEA</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessBanner;

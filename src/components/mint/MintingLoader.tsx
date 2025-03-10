interface MintingLoaderProps {
  isApproving: boolean;
}

export const MintingLoader = ({ isApproving }: MintingLoaderProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#6d5ceb] rounded-2xl p-8 flex flex-col items-center max-w-[90%] w-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {isApproving ? 'Approving Transaction' : 'Minting in Progress'}
        </h2>
        <p className="text-white/80 text-center">
          {isApproving 
            ? 'Please confirm the transaction in your wallet...'
            : 'Please wait while we mint your NFT...'}
        </p>
      </div>
    </div>
  );
}; 
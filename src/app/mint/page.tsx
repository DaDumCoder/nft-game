declare global {
  interface Window {
    ethereum?: any;
  }
}

"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  useActiveWallet, 
  useActiveAccount,
  useReadContract,
  TransactionButton
} from "thirdweb/react";
import { client } from "@/client";
import { defineChain, getContract, toEther } from "thirdweb";
import { 
  claimTo, 
  getActiveClaimCondition, 
  getTotalClaimedSupply, 
  nextTokenIdToMint
} from "thirdweb/extensions/erc721";
import { useSendTransaction } from "thirdweb/react";
import { ethers } from "ethers";
import { getPrice } from "./utils";
import abi from "./abi.json";
import Loading from "@/components/Loading";
import SuccessBanner from "@/components/SuccessBanner";
import Claim from "@/components/Claim";
import StartGame from "@/components/StartGame";
import { MintingLoader } from "@/components/mint/MintingLoader";

export default function Home() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [count, setCount] = useState(10);
  const MIN_COUNT = 1;
  const MAX_COUNT = 100;
  const [isMinted, setIsMinted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [approvalInProgress, setApprovalInProgress] = useState(false);
  const [claimInProgress, setClaimInProgress] = useState(false);
  const [contractMetadata, setContractMetadata] = useState<any>(null);
  const [claimCondition, setClaimCondition] = useState<any>(null);
  const [claimedSupply, setClaimedSupply] = useState<bigint | null>(null);
  const [totalNFTSupply, setTotalNFTSupply] = useState<bigint | null>(null);
  const [txHistory, setTxHistory] = useState<Array<{type: string, status: string, timestamp: number, hash?: string}>>([]);
  const [nftTokenId, setNftTokenId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [contractError, setContractError] = useState<string | null>(null);
  const { mutate: sendTransaction } = useSendTransaction();
  // const [address, setAddress] = useState<any>(null);
  const router = useRouter();
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const chain = defineChain({
    id: 1868,
    name: "Soneium Network",
    rpc: "https://rpc.soneium.org",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    }
  });



  const contract = getContract({
    client: client,
    chain: chain, 
    address: "0x1D98101247FB761c9aDC4e2EaD6aA6b6a00c170e"
  });

  const contractDataFetched = useRef(false);
  const [verificationLink, setVerificationLink] = useState<string | null>(null);

  useEffect(() => {
    if (contractDataFetched.current) return;
    
    const fetchContractData = async () => {
      if (contract && !contractDataFetched.current) {
        contractDataFetched.current = true; 
        
        try {
          console.log("Fetching contract data, contract:", contract);
          console.log("Active account:", account);
          
          const defaultMetadata = { 
            name: "VIBEHIT NFT",
            description: "Exclusive NFT for the VIBEHIT Game", 
            image: "/Group 106.svg"
          };
          
          setContractMetadata(defaultMetadata);
          
          try {
            const claimCond = await getActiveClaimCondition({ contract });
            setClaimCondition(claimCond);
            console.log("Claim condition:", claimCond);
          } catch (error) {
            console.error("Error fetching claim condition:", error);
            setContractError("Failed to fetch claim condition");
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          try {
            const claimed = await getTotalClaimedSupply({ contract });
            setClaimedSupply(claimed);
            console.log("Claimed supply:", claimed);
          } catch (error) {
            console.error("Error fetching claimed supply:", error);
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          try {
            const total = await nextTokenIdToMint({ contract });
            setTotalNFTSupply(total);
            console.log("Total supply:", total);
          } catch (error) {
            console.error("Error fetching total supply:", error);
          }
          
        } catch (error) {
          console.error("Error fetching contract data:", error);
          setContractError("Failed to fetch NFT data. Using default values.");
          
          const defaultMetadata = { 
            name: "VIBEHIT NFT",
            description: "Exclusive NFT for the VIBEHIT Game", 
            image: "/Group 106.svg"
          };
          setContractMetadata(defaultMetadata);
        }
      }
    };

    const timer = setTimeout(() => {
      fetchContractData();
    }, 1500);


    
    return () => clearTimeout(timer);
  }, [contract, account]);



  useEffect(() => {
    console.log("=== WALLET EFFECT TRIGGERED ===");
    console.log("Wallet value:", wallet);
    if (wallet) {
      console.log("Wallet properties:");
      try {
        for (const key in wallet) {
          console.log(`${key}:`, wallet[key]);
        }
        
        if (wallet.getAccount) {
          const account = wallet.getAccount();
          console.log("Wallet account:", account);
        }
        
        console.log("Prototype chain:", Object.getPrototypeOf(wallet));
        
        setIsConnected(true);
        setIsLoading(false);
      } catch (e) {
        console.error("Error logging wallet properties:", e);
        setIsConnected(false);
        setIsLoading(false);
      }
    } else {
      console.log("No wallet found in effect");
      setIsConnected(false);
      setIsLoading(false);
    }
  }, [wallet]);

  const checkBalance = async (address: string) => {
    if (account && contract) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(
          "0x1D98101247FB761c9aDC4e2EaD6aA6b6a00c170e",
          abi,
          provider
        );
        
        const balance = await contractInstance.balanceOf(address);
        console.log("NFT balance:", balance.toString());
        
        if (Number(balance) > 0) {
          setIsMinted(true);
        }
      } catch (error) {
        console.error("Error checking balance:", error);
      }
    }
  };

  const handleDisconnect = async () => {
    console.log("=== DISCONNECT INITIATED ===");
    try {
      console.log("Wallet before disconnect:", wallet);
      console.log("Disconnecting wallet...");
      await wallet?.disconnect();
      console.log("Wallet after disconnect:", wallet);
      console.log("Setting isConnected to false");
      setIsConnected(false);
      
      console.log("Clearing localStorage items");
      Object.keys(localStorage).forEach(key => {
        if (key.includes('wallet') || key.includes('thirdweb')) {
          console.log(`Removing localStorage key: ${key}`);
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("=== DISCONNECT ERROR ===");
      console.error("Error details:", error);
      toast('Failed to disconnect wallet', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#FF3B3B',
          color: '#fff',
          fontWeight: 'bold',
        },
        duration: 2000,
      });
    }
  };

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




  const handleMint = async () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contractInstanceToken = new ethers.Contract(
        "0x2CAE934a1e84F693fbb78CA5ED3B0A6893259441",
        [
          {
            "constant": true,
            "inputs": [
              { "name": "_owner", "type": "address" },
              { "name": "_spender", "type": "address" }
            ],
            "name": "allowance",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              { "name": "_owner", "type": "address" }
            ],
            "name": "balanceOf",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              { "name": "_spender", "type": "address" },
              { "name": "_value", "type": "uint256" }
            ],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "stateMutability": "nonpayable", 
            "type": "function"
          }
        ],
        provider
      );

      // Check token balance
      const tokenBalance = await contractInstanceToken.balanceOf(account.address);
      console.log("Token balance:", tokenBalance.toString());

      if (tokenBalance.lt("34000000000000000000")) {
        toast.error("Insufficient token balance. You need at least 34 ASTR to mint.", {
          style: {
            borderRadius: '10px',
            background: '#ef4444',
            color: '#fff', 
            fontWeight: 'bold'
          }
        });
        return;
      }

      // Check current allowance
      const currentAllowance = await contractInstanceToken.allowance(
        account.address,
        "0x1D98101247FB761c9aDC4e2EaD6aA6b6a00c170e"
      );

      if (currentAllowance.lt("34000000000000000000")) {
        setApprovalInProgress(true);
        
        const contractWithSignerToken = contractInstanceToken.connect(signer);
        const approvalTx = await contractWithSignerToken.approve(
          "0x1D98101247FB761c9aDC4e2EaD6aA6b6a00c170e",
          "34000000000000000000"
        );

        console.log("Approval transaction:", approvalTx);
        await approvalTx.wait();
        
        toast.success("Token approval successful!", {
          icon: '✅',
          style: {
            borderRadius: '10px',
            background: '#22c55e',
            color: '#fff',
            fontWeight: 'bold'
          },
          duration: 3000
        });
      }

      setApprovalInProgress(false);
      setIsApproved(true);
      setClaimInProgress(true);

      // Continue with minting
      const contractInstance = new ethers.Contract(
        "0x1D98101247FB761c9aDC4e2EaD6aA6b6a00c170e",
        abi,
        provider
      );

      const contractWithSigner = contractInstance.connect(signer);
      
      const claimTx = await contractWithSigner.claim(
        account.address,
        1,
        "0x2CAE934a1e84F693fbb78CA5ED3B0A6893259441",
        BigInt("34000000000000000000"),
        [
          [],
          "0",
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "0x0000000000000000000000000000000000000000"
        ],
        "0x",
        { gasLimit: 300000 }
      );

      console.log("Claim transaction:", claimTx);
      const receipt = await claimTx.wait();
      console.log("Transaction receipt:", receipt);

      setIsMinted(true);
      setClaimInProgress(false);

      toast.success("NFT minted successfully! 🎉", {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#22c55e',
          color: '#fff',
          fontWeight: 'bold'
        },
        duration: 3000
      });

    } catch (error) {
      console.error("Transaction error:", error);
      setApprovalInProgress(false);
      setClaimInProgress(false);
      
      toast.error("Transaction failed", {
        style: {
          borderRadius: '10px',
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold'
        }
      });
    }
  };

  const getWalletAddress = () => {
    if (!wallet) return null;
    
    console.log("Getting wallet address, wallet:", wallet);
    
    if (wallet.getAccount) {
      try {
        const account = wallet.getAccount();
        console.log("Wallet account:", account);

        console.log("address", account?.address);
    
        // checkBalance(account?.address || "");
    
        // setAddress(account?.address);

        checkBalance(account?.address || "");
        return account?.address;
      } catch (e) {
        console.error("Error getting account:", e);
      }
    }
    
    if (typeof wallet.address === 'string') {
      return wallet.address;
    }
    
    if (wallet.account?.address) {
      return wallet.account.address;
    }
    
    console.log("Could not get wallet address");
    return null;
  }



  if (isLoading) {
    return (
    <Loading />
    );
  }

  const txHistorySection = txHistory.length > 0 && (
    <div className="w-full max-w-[280px] mt-6">
      <h3 className="text-white font-medium mb-2 text-left">Transaction History:</h3>
      <div className="bg-white/10 rounded-xl p-3">
        {txHistory.map((tx, index) => (
          <div key={index} className="mb-2 last:mb-0 flex justify-between items-center">
            <div>
              <span className="text-white/90 text-sm">{tx.type}</span>
              <span className="text-white/60 text-xs ml-2">
                {new Date(tx.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                tx.status === 'COMPLETED' ? 'bg-green-500/20 text-green-300' : 
                tx.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {tx.status}
              </span>
              {tx.hash && (
                <a 
                  href={`https://sepolia.basescan.org/tx/${tx.hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getOpenSeaURL = (tokenId: string | null) => {
    if (!tokenId) return "https://testnets.opensea.io/collection/base-sepolia";
    const cleanTokenId = tokenId.replace('#', '');
    return `https://testnets.opensea.io/assets/base-sepolia/0xCb835bD252923114a87fac1fC8034692CEe867e3/${cleanTokenId}`;
  };

  const mintContent = (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col items-center my-4 p-4">
        {contractError && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-[280px]">
            <p className="text-sm">{contractError}</p>
            <p className="text-xs mt-1">Using fallback values. Mint functionality will still work.</p>
          </div>
        )}
        
        {contractMetadata && contractMetadata.image && (
          <Image
            src={contractMetadata.image}
            alt={contractMetadata.name || "NFT Image"}
            width={128}
            height={128}
            className="rounded-xl mb-3"
          />
        )}
        
        <h2 className="text-xl font-bold text-white">
          {contractMetadata?.name || "VIBE NFT"}
        </h2>
        
        <p className="text-sm text-white/80 text-center mt-1 mb-3">
          {contractMetadata?.description || "Mint your exclusive VibeHit NFT"}
        </p>

        {claimedSupply !== null && totalNFTSupply !== null ? (
          <p className="text-sm font-medium text-white/90">
            {claimedSupply.toString()}/{totalNFTSupply.toString()} Minted
          </p>
        ) : (
          <p className="text-sm font-medium text-white/90">
            ??/?? Minted
          </p>
        )}
        
        <div className="flex items-center justify-center mt-3">
          <button 
            className="bg-white/10 hover:bg-white/15 text-white p-2 rounded-l-lg w-10 h-10 flex items-center justify-center"
            onClick={handleDecrement}
          >
            -
          </button>
          <div className="bg-white/20 text-white p-2 w-12 h-10 flex items-center justify-center text-center">
            {count}
          </div>
          <button 
            className="bg-white/10 hover:bg-white/15 text-white p-2 rounded-r-lg w-10 h-10 flex items-center justify-center"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        
        <div className="mt-4 w-full max-w-[280px]">
          {isMinted ? (
            <>
              <div className="bg-green-100 p-3 rounded-xl mb-4 border border-green-300">
                <div className="flex items-center text-green-700 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>NFT Successfully Minted!</span>
                </div>
                {nftTokenId && (
                  <div className="text-sm text-green-600 mt-1">
                    Token ID: {nftTokenId}
                  </div>
                )}
                {txHash && (
                  <div className="text-xs text-blue-600 mt-2">
                    <a 
                      href={verificationLink || `https://sepolia.basescan.org/tx/${txHash}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      <span>View on Soneium Scan</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
                
                <div className="text-xs text-blue-600 mt-2">
                  <a 
                    href={getOpenSeaURL(nftTokenId)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline"
                  >
                    <span>View on OpenSea</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              <button
                className="w-full h-[52px] bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                onClick={handlePlayClick}
              >
                <Image src="/play.svg" width={20} height={20} alt="Play" />
                Play Game
              </button>
            </>
          ) : isApproved ? (
            <TransactionButton
              transaction={() => claimTo({
                contract: contract,
                to: account?.address as `0x${string}`,
                quantity: BigInt(count),
              })}
              className="w-full h-[52px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl flex items-center justify-center disabled:opacity-70"
              onTransactionConfirmed={async (result) => {
                console.log("Transaction confirmed:", result);
                setTxHash(result.transactionHash);
                setIsMinted(true);
                setClaimInProgress(false);
                
                const claimTx = {
                  type: 'CLAIM', 
                  status: 'COMPLETED', 
                  timestamp: Date.now(),
                  hash: result.transactionHash
                };
                setTxHistory(prev => [...prev, claimTx]);
                
                if (claimedSupply !== null) {
                  const tokenId = (claimedSupply + BigInt(1)).toString();
                  setNftTokenId(tokenId);
                }
                
                toast.success("NFT successfully minted! 🎉", {
                  icon: '✅',
                  style: {
                    borderRadius: '10px',
                    background: '#22c55e',
                    color: '#fff',
                    fontWeight: 'bold',
                  },
                  duration: 5000,
                });
                
              }}
              onError={(error) => {
                console.error("Claim error:", error);
                setClaimInProgress(false);
                toast.error(`Failed to claim NFT: ${error.message || "Unknown error"}`);
              }}
            >
              {claimInProgress ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Claiming...
                </>
              ) : (
                <>Claim NFT (${getPrice(count, claimCondition)} ETH)</>
              )}
            </TransactionButton>
          ) : (
            <button
              className="w-full h-[52px] bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl flex items-center justify-center disabled:opacity-70"
              onClick={() => {
                setApprovalInProgress(true);
                setTimeout(() => {
                  setIsApproved(true);
                  setApprovalInProgress(false);
                  
                  const mockHash = `0x${Array.from({length: 64}, () => 
                    Math.floor(Math.random() * 16).toString(16)).join('')}`;
                  
                  const approvalTx = {
                    type: 'APPROVE', 
                    status: 'COMPLETED', 
                    timestamp: Date.now(),
                    hash: mockHash
                  };
                  setTxHistory(prev => [...prev, approvalTx]);
                  
                  toast.success("Transaction approved! You can now claim your NFT", {
                    icon: '✅',
                    style: {
                      borderRadius: '10px',
                      background: '#3b82f6',
                      color: '#fff',
                      fontWeight: 'bold',
                    },
                    duration: 3000,
                  });
                }, 2000);
              }}
              disabled={approvalInProgress}
            >
              {approvalInProgress ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Approving...
                </>
              ) : (
                <>Approve Transaction</>
              )}
            </button>
          )}
        </div>
        
        {txHistorySection}

        {isMinted && (
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              NFT Minted ✓
            </div>
          </div>
        )}
      </div>

    </div>
  );

  const successBanner = isMinted && (
 <SuccessBanner txHash={txHash || "" } nftTokenId={nftTokenId || ""} />
  );

  return (
    <>
      {(approvalInProgress || claimInProgress) && (
        <MintingLoader isApproving={approvalInProgress} />
      )}
      
      {successBanner}
      
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="relative mx-auto bg-black rounded-[60px] h-[860px] w-[420px] shadow-xl overflow-hidden border-[14px] border-black">
          <div className="absolute top-[12px] left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-50 flex items-center justify-center">
            <div className="absolute right-[24px] w-[8px] h-[8px] rounded-full bg-[#1a1a1a]"></div>
          </div>

          <div className="absolute top-[8px] left-0 right-0 h-[44px] bg-transparent flex items-center justify-between px-8 z-[45]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <div className="text-white text-xs truncate max-w-[150px]">
                {(() => {
                  const address = getWalletAddress();
                  if (address) {
                    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
                  }
                  return "Not Connected";
                })()}
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (isConnected) {
                  handleDisconnect();
                } else {
                  window.location.href = '/wallet-connect';
                }
              }}
              className={`${
                isConnected 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-[#4CAF50] hover:bg-[#45a049]'
              } text-white text-xs px-3 py-1 rounded-md transition-colors`}
            >
              {isConnected ? 'Disconnect' : 'Connect Wallet'}
            </button>
          </div>

          <div
            className="relative w-full h-full bg-[#6d5ceb] overflow-hidden flex flex-col"
            style={{ fontFamily: "Digitalt, sans-serif" }}
          >
            <div className="absolute left-4 top-16 z-10">
              <div className="bg-white/20 backdrop-blur-sm rounded-[24px] py-2 flex flex-col gap-[2px]">
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

            <div className="absolute right-4 top-12 flex items-center">
              <div className="relative flex items-center mt-5">
                <div className="absolute -left-6">
                  <Image
                    src="/Group 105.svg"
                    alt="Gem"
                    width={44}
                    height={44}
                    className="w-11 h-11"
                  />
                </div>

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

            <div
              className="flex flex-col items-center justify-center mt-32 px-6"
              style={{ fontFamily: "Digitalt, sans-serif" }}
            >
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

              <div className="flex items-center justify-center gap-4 mb-6 z-20">
                <Image
                  src="/Group 106.svg"
                  alt="Gem"
                  width={120}
                  height={120}
                  className="relative"
                />
              </div>

        <StartGame isMinted={isMinted} handleMint={handleMint} handleIncrement={handleIncrement} handleDecrement={handleDecrement} count={count} txHash={txHash} nftTokenId={nftTokenId} getOpenSeaURL={getOpenSeaURL} MIN_COUNT={MIN_COUNT} MAX_COUNT={MAX_COUNT} />

              <p
                className="text-white font-bold text-3xl text-center mt-2 px-4"
                style={{
                  textShadow: "2px 2px 0 #b64a8a",
                }}
              >
                {isMinted ? 'Some lucky players can win up to $1000' : 'You are enrolled for the airdrop'}
                <br />
              </p>

              <p className="text-[#a89bf3] text-3xl font-bold mt-2">
                {isMinted ? 'STEP 1...' : 'STEP 1...'}
              </p>
            </div>

      {
        isMinted && (
          <Claim isMinted={isMinted} handlePlayClick={handlePlayClick} />
        )
      }

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

          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white rounded-full"></div>
        </div>
      </div>
    </>
  );
}

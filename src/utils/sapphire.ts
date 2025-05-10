
import { ethers } from "ethers";
import { toast } from "sonner";

// Sapphire Network Configuration
const SAPPHIRE_RPC_URL = "https://testnet.sapphire.oasis.io";
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with your actual contract address

// ABI for the WalletSubmit contract (minimal version with just the function we need)
const CONTRACT_ABI = [
  "event WalletSubmitted(bytes encryptedWallet)",
  "function submitWallet(bytes calldata encryptedWallet) external"
];

/**
 * Creates a provider for the Sapphire Network
 */
export const getSapphireProvider = () => {
  return new ethers.JsonRpcProvider(SAPPHIRE_RPC_URL);
};

/**
 * Creates a contract instance for interaction
 * @param signer The connected wallet signer
 * @returns Contract instance
 */
export const getWalletSubmitContract = (signer: ethers.Signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

/**
 * Submits an encrypted wallet address to the Sapphire Network contract
 * @param encryptedWallet The encrypted wallet data
 * @param walletAddress The wallet address to connect with
 * @returns Transaction result
 */
export const submitWalletToContract = async (encryptedWallet: string, walletAddress: string) => {
  try {
    // Show a notification that we're requesting signature
    toast.info("Please sign the message in MetaMask to continue...");
    
    // Request provider
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }
    
    // Get the Ethereum provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Request the signer (this will prompt MetaMask)
    const signer = await provider.getSigner();
    
    // Verify the account matches
    if (signer.address.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new Error("Connected account doesn't match the wallet address");
    }
    
    const contract = getWalletSubmitContract(signer);
    
    // Convert string to bytes
    const encryptedBytes = ethers.toUtf8Bytes(encryptedWallet);
    
    // Submit transaction - this will trigger the MetaMask popup
    const tx = await contract.submitWallet(encryptedBytes);
    
    // Show pending notification
    toast.info("Transaction submitted, waiting for confirmation...");
    
    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: receipt.hash,
    };
  } catch (error: any) {
    console.error("Error submitting wallet to contract:", error);
    
    // Show error toast
    toast.error("Transaction failed: " + (error.message || "Unknown error"));
    
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

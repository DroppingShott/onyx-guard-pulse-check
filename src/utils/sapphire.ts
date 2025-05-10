
import { ethers } from "ethers";

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
 * @param signer The connected wallet signer
 * @returns Transaction result
 */
export const submitWalletToContract = async (encryptedWallet: string, signer: ethers.Signer) => {
  try {
    const contract = getWalletSubmitContract(signer);
    
    // Convert string to bytes
    const encryptedBytes = ethers.toUtf8Bytes(encryptedWallet);
    
    // Submit transaction
    const tx = await contract.submitWallet(encryptedBytes);
    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: receipt.hash,
    };
  } catch (error: any) {
    console.error("Error submitting wallet to contract:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};


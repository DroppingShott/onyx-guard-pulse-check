
/**
 * Shortens an Ethereum address to a more user-friendly format
 * @param address The full address to shorten
 * @param startLength Number of characters to keep at the start
 * @param endLength Number of characters to keep at the end
 * @returns Shortened address in format 0x1234...5678
 */
export function shortenAddress(address: string, startLength: number = 6, endLength: number = 4): string {
  if (!address) return '';
  
  const start = address.substring(0, startLength);
  const end = address.substring(address.length - endLength);
  
  return `${start}...${end}`;
}

/**
 * Simple encryption function for wallet addresses
 * This is a basic implementation - in production, use a proper encryption library
 * @param walletAddress The wallet address to encrypt
 * @returns Encrypted wallet address
 */
export function encryptWalletAddress(walletAddress: string): string {
  if (!walletAddress) return '';
  
  // This is a placeholder encryption - in a real app, use actual encryption library
  // For demonstration purposes, we're using a simple Base64 encoding
  try {
    const encoded = btoa(walletAddress);
    return encoded;
  } catch (error) {
    console.error("Error encrypting wallet address:", error);
    return '';
  }
}


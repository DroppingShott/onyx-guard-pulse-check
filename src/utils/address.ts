
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

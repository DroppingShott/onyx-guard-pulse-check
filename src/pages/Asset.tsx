import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layouts/Header';

interface AssetProps {
  walletAddress?: string | null;
  disconnectWallet?: () => void;
}

const Asset = ({ walletAddress, disconnectWallet }: AssetProps) => {
  const { symbol } = useParams<{ symbol: string }>();
  
  return (
    <>
      <Header walletAddress={walletAddress} disconnectWallet={disconnectWallet} />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Asset: {symbol}</h1>
          {/* Asset details here */}
        </div>
      </div>
    </>
  );
};

export default Asset;

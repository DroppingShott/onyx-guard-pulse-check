
import React from 'react';
import { Header } from '@/components/layouts/Header';

interface AlertsProps {
  walletAddress?: string | null;
  disconnectWallet?: () => void;
}

const Alerts = ({ walletAddress, disconnectWallet }: AlertsProps) => {
  return (
    <>
      <Header walletAddress={walletAddress} disconnectWallet={disconnectWallet} />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          {/* Alerts content here */}
          <h1 className="text-3xl font-bold mb-6">Alerts</h1>
          <p>Your risk alerts will appear here.</p>
        </div>
      </div>
    </>
  );
};

export default Alerts;

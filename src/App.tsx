
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Asset from "./pages/Asset";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [encryptedWallet, setEncryptedWallet] = useState<string | null>(null);
  
  // Check for existing connection on app load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
          
          // Listen for account changes
          const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
              setWalletAddress(null);
              setEncryptedWallet(null);
            } else {
              setWalletAddress(accounts[0]);
            }
          };
          
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          
          return () => {
            window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
          };
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkConnection();
  }, []);

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWalletAddress(null);
    setEncryptedWallet(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index walletAddress={walletAddress} setWalletAddress={setWalletAddress} encryptedWallet={encryptedWallet} setEncryptedWallet={setEncryptedWallet} />} />
            <Route path="/dashboard" element={<Dashboard walletAddress={walletAddress} disconnectWallet={disconnectWallet} />} />
            <Route path="/alerts" element={<Alerts walletAddress={walletAddress} disconnectWallet={disconnectWallet} />} />
            <Route path="/asset/:symbol" element={<Asset walletAddress={walletAddress} disconnectWallet={disconnectWallet} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Shield, TrendingUp, Bell, Wallet, Activity, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layouts/Header";
import { toast } from "sonner";
import { shortenAddress, encryptWalletAddress } from "@/utils/address";
import { submitWalletToContract } from "@/utils/sapphire";

interface IndexProps {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  encryptedWallet: string | null;
  setEncryptedWallet: (encrypted: string | null) => void;
}

const Index = ({ walletAddress, setWalletAddress, encryptedWallet, setEncryptedWallet }: IndexProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const navigate = useNavigate();
  
  // Handle wallet connection
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        setWalletAddress(accounts[0]);
        
        // Encrypt the wallet address
        const encrypted = encryptWalletAddress(accounts[0]);
        setEncryptedWallet(encrypted);
        
        toast.success("Wallet connected successfully!");
        setIsConnecting(false);
        
      } catch (error: any) {
        console.error("Error connecting to MetaMask:", error);
        toast.error("Failed to connect wallet: " + (error.message || "Unknown error"));
        setIsConnecting(false);
      }
    } else {
      toast.error("MetaMask is not installed. Please install MetaMask to continue.");
      setIsConnecting(false);
    }
  };
  
  // Handle encryption and analysis
  const handleAnalyze = async () => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsEncrypting(true);
    
    try {
      // Encrypt the wallet address
      const encrypted = encryptWalletAddress(walletAddress);
      setEncryptedWallet(encrypted);
      
      toast.info("Submitting encrypted wallet to Sapphire Network...");
      
      // Submit to smart contract with signature request
      const result = await submitWalletToContract(encrypted, walletAddress);
      
      if (result.success) {
        toast.success("Analysis request submitted! Transaction: " + shortenAddress(result.transactionHash || ""));
        
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setIsEncrypting(false);
      }
    } catch (error: any) {
      console.error("Error analyzing wallet:", error);
      toast.error("Failed to analyze wallet: " + (error.message || "Unknown error"));
      setIsEncrypting(false);
    }
  };

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-onyx-accent" />,
      title: "Real-Time Protection",
      description: "Monitor your assets for suspicious activities and potential threats"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-onyx-accent" />,
      title: "Risk Assessment",
      description: "Get detailed risk scores for each asset in your portfolio"
    },
    {
      icon: <Bell className="w-12 h-12 text-onyx-accent" />,
      title: "Instant Alerts",
      description: "Receive notifications when high-risk activities are detected"
    }
  ];

  return (
    <>
      <Header walletAddress={walletAddress} />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col">
          {/* Hero Section */}
          <section className="container mx-auto pt-32 pb-16 px-4 flex flex-col items-center">
            <div className="animate-fade-in flex justify-center mb-8">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-onyx-accent to-onyx-accent-dark rounded-full opacity-20 animate-pulse-glow"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-onyx-dark to-onyx-darker rounded-full"></div>
                <Shield className="absolute inset-0 w-full h-full text-onyx-accent p-5" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-slide-up">
              <span className="bg-gradient-to-r from-onyx-accent to-onyx-light bg-clip-text text-transparent">
                Onyx Guard
              </span>
            </h1>
            
            <p className="text-xl text-center text-muted-foreground max-w-xl mb-8 animate-slide-up animate-delay-100">
              Advanced crypto risk monitoring system that protects your assets from threats and vulnerabilities
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 animate-slide-up animate-delay-200">
              {!walletAddress ? (
                <Button 
                  size="lg" 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="button-glow bg-gradient-to-r from-onyx-accent to-onyx-accent-dark hover:from-onyx-accent-dark hover:to-onyx-accent transition-all duration-300 shadow-lg group relative overflow-hidden"
                >
                  {isConnecting ? (
                    <>
                      <Wallet className="mr-2 h-5 w-5 animate-spin-slow" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-5 w-5 group-hover:animate-pulse-glow" />
                      <span>Connect Wallet</span>
                    </>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-r from-onyx-accent/20 to-transparent w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                </Button>
              ) : (
                <>
                  <div className="flex items-center justify-center bg-onyx-dark/60 backdrop-blur-sm rounded-full px-5 py-3 border border-onyx-accent/20 gap-2">
                    <Wallet className="h-5 w-5 text-onyx-accent" />
                    <span className="text-onyx-light">{shortenAddress(walletAddress)}</span>
                    <Lock className="h-4 w-4 text-green-500 ml-1" />
                  </div>

                  <Button 
                    size="lg" 
                    onClick={handleAnalyze}
                    disabled={isEncrypting}
                    className="button-glow bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg group relative overflow-hidden"
                  >
                    {isEncrypting ? (
                      <>
                        <Activity className="mr-2 h-5 w-5 animate-spin-slow" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="mr-2 h-5 w-5 group-hover:animate-pulse-glow" />
                        <span>Analyze Wallet</span>
                      </>
                    )}
                    <span className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent w-[200%] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                  </Button>
                </>
              )}
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-16 bg-gradient-to-b from-transparent to-onyx-dark/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="glass-panel p-6 rounded-xl flex flex-col items-center text-center animate-slide-up"
                    style={{ animationDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div className="mb-4 p-3 bg-onyx-dark rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-16 container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 animate-slide-up">
              <span className="bg-gradient-to-r from-onyx-accent to-onyx-light bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-onyx-dark"></div>
                
                {[
                  {
                    step: "Connect",
                    description: "Link your wallet securely to Onyx Guard",
                    icon: <Wallet className="w-6 h-6" />
                  },
                  {
                    step: "Analyze",
                    description: "Our system scans your portfolio for vulnerabilities",
                    icon: <Activity className="w-6 h-6" />
                  },
                  {
                    step: "Monitor",
                    description: "Get real-time alerts about potential risks",
                    icon: <Bell className="w-6 h-6" />
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex mb-12 last:mb-0 animate-slide-up"
                    style={{ animationDelay: `${(index + 6) * 100}ms` }}
                  >
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-16 h-16 rounded-full bg-onyx-dark border-2 border-onyx-accent flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <div className="ml-6 mt-3">
                      <h3 className="text-xl font-semibold text-onyx-accent">{item.step}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Onyx Guard. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Index;

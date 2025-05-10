
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layouts/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, ArrowRight, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { shortenAddress } from '@/utils/address';

interface UserAssetsProps {
  walletAddress?: string | null;
  disconnectWallet?: () => void;
}

// Mock data for demonstration - in a real app, this would come from an API
const mockAssets = [
  { symbol: 'ETH', name: 'Ethereum', balance: '1.24', value: '$2,480.00', risk: 'Low' },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.05', value: '$3,250.00', risk: 'Low' },
  { symbol: 'LINK', name: 'Chainlink', balance: '150', value: '$1,875.00', risk: 'Medium' },
  { symbol: 'UNI', name: 'Uniswap', balance: '75', value: '$525.00', risk: 'Medium' },
  { symbol: 'SHIB', name: 'Shiba Inu', balance: '5,000,000', value: '$250.00', risk: 'High' }
];

const UserAssets = ({ walletAddress, disconnectWallet }: UserAssetsProps) => {
  const [assets, setAssets] = useState<typeof mockAssets>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if wallet is not connected
    if (!walletAddress) {
      toast.error("Wallet not connected");
      navigate('/');
      return;
    }
    
    // Simulate API call to fetch user assets
    const fetchAssets = async () => {
      try {
        // In a real application, you would fetch actual data here
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        setAssets(mockAssets);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching assets:', error);
        toast.error('Failed to load assets');
        setIsLoading(false);
      }
    };
    
    fetchAssets();
  }, [walletAddress, navigate]);
  
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'text-green-500 bg-green-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'high':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };
  
  return (
    <>
      <Header walletAddress={walletAddress} disconnectWallet={disconnectWallet} />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Your Assets
              </h1>
              {walletAddress && (
                <div className="flex items-center gap-2 mb-4">
                  <Wallet size={16} className="text-onyx-accent" />
                  <span className="text-muted-foreground">{walletAddress}</span>
                </div>
              )}
            </div>
            
            <Button variant="outline" className="gap-2 mt-4 md:mt-0" onClick={() => navigate('/dashboard')}>
              <span>View Dashboard</span>
              <ArrowRight size={16} />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(5)].map((_, index) => (
                <Card key={index} className="border border-onyx-dark bg-onyx-darker/30">
                  <CardHeader className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.map((asset, index) => (
                <Card key={index} className="border border-onyx-dark bg-onyx-darker/30 hover:border-onyx-accent/50 transition-all duration-300">
                  <CardHeader>
                    <CardDescription>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(asset.risk)}`}>
                        {asset.risk} Risk
                      </span>
                    </CardDescription>
                    <CardTitle className="flex items-center justify-between">
                      <span>{asset.name}</span>
                      <span className="text-onyx-accent">{asset.symbol}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Balance:</span>
                      <span className="font-medium">{asset.balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value:</span>
                      <span className="font-medium">{asset.value}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full gap-2" onClick={() => navigate(`/asset/${asset.symbol}`)}>
                      <Eye size={16} />
                      <span>View Details</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserAssets;

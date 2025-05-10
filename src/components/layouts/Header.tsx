
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, BarChart2, Home, Wallet, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { shortenAddress } from '@/utils/address';

interface HeaderProps {
  walletAddress?: string | null;
  disconnectWallet?: () => void;
}

export const Header = ({ walletAddress, disconnectWallet }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleWalletClick = () => {
    if (walletAddress) {
      navigate('/user-assets');
    }
  };
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-onyx-darker/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-8 h-8 bg-onyx-accent rounded-full flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-bold text-lg">OG</span>
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-onyx-accent to-onyx-light bg-clip-text text-transparent">
            Onyx Guard
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {location.pathname !== '/' && (
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/dashboard">
                <Button 
                  variant={isActive('/dashboard') ? "secondary" : "ghost"} 
                  className="gap-2"
                >
                  <BarChart2 size={18} />
                  <span>Portfolio</span>
                </Button>
              </Link>
              <Link to="/alerts">
                <Button 
                  variant={isActive('/alerts') ? "secondary" : "ghost"} 
                  className="gap-2"
                >
                  <Bell size={18} />
                  <span>Alerts</span>
                </Button>
              </Link>
            </nav>
          )}
          
          {walletAddress && (
            <div className="flex items-center gap-2">
              <div 
                className="bg-onyx-dark/60 backdrop-blur-sm rounded-full px-3 py-1 text-sm border border-onyx-accent/20 flex items-center gap-2 animate-fade-in cursor-pointer hover:bg-onyx-dark/80 transition-colors"
                onClick={handleWalletClick}
              >
                <Wallet size={14} className="text-onyx-accent" />
                <span className="text-onyx-light">{shortenAddress(walletAddress)}</span>
              </div>
              
              {disconnectWallet && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={disconnectWallet}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <LogOut size={14} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

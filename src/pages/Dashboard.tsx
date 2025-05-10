
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import { Header } from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [sortBy, setSortBy] = useState("balance");
  const navigate = useNavigate();
  
  // Sample data
  const portfolioData = [
    { name: "BTC", balance: 0.45, value: 27250.12, risk: "low", riskScore: 32 },
    { name: "ETH", balance: 4.2, value: 9820.35, risk: "medium", riskScore: 52 },
    { name: "XRP", balance: 2450, value: 2940.55, risk: "high", riskScore: 78 },
    { name: "LINK", balance: 125, value: 1875.25, risk: "medium", riskScore: 61 },
    { name: "SOL", balance: 35, value: 3605.15, risk: "low", riskScore: 28 },
    { name: "AVAX", balance: 62, value: 2170.45, risk: "high", riskScore: 82 },
  ];
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-risk-low";
      case "medium": return "bg-risk-medium";
      case "high": return "bg-risk-high";
      default: return "bg-muted";
    }
  };
  
  const getRiskTextColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-risk-low";
      case "medium": return "text-risk-medium";
      case "high": return "text-risk-high";
      default: return "text-muted";
    }
  };
  
  // Filter and sort assets
  const filteredAssets = portfolioData
    .filter(asset => portfolioFilter === "all" ? true : asset.risk === portfolioFilter)
    .sort((a, b) => {
      if (sortBy === "risk") {
        return b.riskScore - a.riskScore;
      } else {
        return b.value - a.value;
      }
    });
  
  // Calculate total value and risk stats
  const totalValue = portfolioData.reduce((sum, asset) => sum + asset.value, 0);
  const highRiskAssets = portfolioData.filter(asset => asset.risk === "high").length;
  const mediumRiskAssets = portfolioData.filter(asset => asset.risk === "medium").length;
  const lowRiskAssets = portfolioData.filter(asset => asset.risk === "low").length;
  
  // Calculate average risk score
  const averageRiskScore = portfolioData.reduce((sum, asset) => sum + asset.riskScore, 0) / portfolioData.length;
  
  // Data for pie chart
  const riskDistribution = [
    { name: "High Risk", value: highRiskAssets, color: "#FF5555" },
    { name: "Medium Risk", value: mediumRiskAssets, color: "#FFAA55" },
    { name: "Low Risk", value: lowRiskAssets, color: "#55AA55" },
  ];
  
  // Data for area chart
  const valueOverTime = [
    { date: "Jan", value: 32500 },
    { date: "Feb", value: 36200 },
    { date: "Mar", value: 33800 },
    { date: "Apr", value: 42100 },
    { date: "May", value: 47200 },
    { date: "Jun", value: 45600 },
    { date: "Jul", value: totalValue * 100 }, // Current value for demonstration
  ];
  
  const handleAssetClick = (asset: string) => {
    navigate(`/asset/${asset}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-10 px-4">
        <main className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 animate-slide-up">
            Portfolio Overview
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-panel animate-slide-up">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Balance</CardTitle>
                <CardDescription>All assets combined</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">Last updated: Today</div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel animate-slide-up animate-delay-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Risk Assessment</CardTitle>
                <CardDescription>Your current risk level</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <div className="mr-4">
                  <div className="text-3xl font-bold">
                    {averageRiskScore < 40 ? "Low" : averageRiskScore < 60 ? "Medium" : "High"}
                  </div>
                  <div className={`text-sm font-medium ${getRiskTextColor(averageRiskScore < 40 ? "low" : averageRiskScore < 60 ? "medium" : "high")}`}>
                    {averageRiskScore.toFixed(0)}/100
                  </div>
                </div>
                <div className="w-16 h-16 relative">
                  {averageRiskScore < 40 ? (
                    <TrendingDown className="w-full h-full text-risk-low" />
                  ) : averageRiskScore < 60 ? (
                    <BarChart2 className="w-full h-full text-risk-medium" />
                  ) : (
                    <TrendingUp className="w-full h-full text-risk-high" />
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel animate-slide-up animate-delay-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Asset Distribution</CardTitle>
                <CardDescription>By risk level</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[90px]">
                <PieChart width={100} height={100}>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="pl-4 flex flex-col gap-1">
                  <div className="flex items-center text-xs">
                    <span className="w-3 h-3 bg-risk-high rounded-full mr-2"></span>
                    <span>{highRiskAssets} High</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-3 h-3 bg-risk-medium rounded-full mr-2"></span>
                    <span>{mediumRiskAssets} Medium</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-3 h-3 bg-risk-low rounded-full mr-2"></span>
                    <span>{lowRiskAssets} Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Value Chart */}
          <Card className="glass-panel mb-8 animate-slide-up animate-delay-300">
            <CardHeader>
              <CardTitle>Portfolio Value Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={valueOverTime}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <CartesianGrid vertical={false} stroke="#333333" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "rgba(26, 31, 44, 0.9)",
                        border: "1px solid rgba(155, 135, 245, 0.2)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#9b87f5"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Assets Table */}
          <div className="mb-8 animate-slide-up animate-delay-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <h2 className="text-2xl font-bold">Your Assets</h2>
              <div className="flex gap-4 w-full md:w-auto">
                <Select value={portfolioFilter} onValueChange={setPortfolioFilter}>
                  <SelectTrigger className="w-full md:w-[180px] bg-onyx-dark border-onyx-muted">
                    <SelectValue placeholder="Filter by risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risks</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px] bg-onyx-dark border-onyx-muted">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balance">Sort by Value</SelectItem>
                    <SelectItem value="risk">Sort by Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredAssets.map((asset, index) => (
                <Card 
                  key={asset.name}
                  className={`glass-panel hover:bg-onyx-dark/50 transition-colors cursor-pointer animate-slide-up`}
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                  onClick={() => handleAssetClick(asset.name)}
                >
                  <CardContent className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-onyx-dark flex items-center justify-center mr-4">
                        <span className="font-bold">{asset.name.substring(0, 1)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {asset.balance} tokens
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-start md:items-center">
                      <div className="md:text-right">
                        <div className="font-medium">${asset.value.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          ${(asset.value / asset.balance).toFixed(2)} per token
                        </div>
                      </div>
                      
                      <div className="md:w-24 flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(asset.risk)} mr-2`}></div>
                        <span className={`capitalize font-medium ${getRiskTextColor(asset.risk)}`}>
                          {asset.risk}
                        </span>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="ml-auto md:ml-0">
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

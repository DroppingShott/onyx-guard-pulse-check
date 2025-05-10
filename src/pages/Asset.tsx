
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Link as LinkIcon, ExternalLink, Shield, AlertTriangle, Info } from "lucide-react";
import { Header } from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Asset = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would be fetched based on the symbol
  const assetData = {
    symbol: symbol || "???",
    name: symbol === "BTC" ? "Bitcoin" :
          symbol === "ETH" ? "Ethereum" :
          symbol === "XRP" ? "XRP" :
          symbol === "LINK" ? "Chainlink" :
          symbol === "SOL" ? "Solana" :
          symbol === "AVAX" ? "Avalanche" :
          "Unknown Asset",
    balance: symbol === "BTC" ? 0.45 :
             symbol === "ETH" ? 4.2 :
             symbol === "XRP" ? 2450 :
             symbol === "LINK" ? 125 :
             symbol === "SOL" ? 35 :
             symbol === "AVAX" ? 62 : 0,
    value: symbol === "BTC" ? 27250.12 :
           symbol === "ETH" ? 9820.35 :
           symbol === "XRP" ? 2940.55 :
           symbol === "LINK" ? 1875.25 :
           symbol === "SOL" ? 3605.15 :
           symbol === "AVAX" ? 2170.45 : 0,
    price: symbol === "BTC" ? 60555.82 :
           symbol === "ETH" ? 2338.18 :
           symbol === "XRP" ? 1.2 :
           symbol === "LINK" ? 15.00 :
           symbol === "SOL" ? 103.00 :
           symbol === "AVAX" ? 35.00 : 0,
    riskScore: symbol === "BTC" ? 32 :
               symbol === "ETH" ? 52 :
               symbol === "XRP" ? 78 :
               symbol === "LINK" ? 61 :
               symbol === "SOL" ? 28 :
               symbol === "AVAX" ? 82 : 50,
    riskLevel: symbol === "BTC" ? "low" :
               symbol === "ETH" ? "medium" :
               symbol === "XRP" ? "high" :
               symbol === "LINK" ? "medium" :
               symbol === "SOL" ? "low" :
               symbol === "AVAX" ? "high" : "medium",
  };
  
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
  
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return <Info className="w-5 h-5" />;
      case "medium": return <AlertTriangle className="w-5 h-5" />;
      case "high": return <Shield className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };
  
  // Sample price history data
  const priceHistory = [
    { date: "May 3", price: assetData.price * 0.94 },
    { date: "May 4", price: assetData.price * 0.97 },
    { date: "May 5", price: assetData.price * 0.95 },
    { date: "May 6", price: assetData.price * 1.02 },
    { date: "May 7", price: assetData.price * 1.03 },
    { date: "May 8", price: assetData.price * 0.99 },
    { date: "May 9", price: assetData.price * 0.98 },
    { date: "May 10", price: assetData.price },
  ];

  // Sample risk factors
  const riskFactors = [
    {
      factor: "Price Volatility",
      score: assetData.symbol === "BTC" ? 35 :
             assetData.symbol === "ETH" ? 42 :
             assetData.symbol === "XRP" ? 82 :
             assetData.symbol === "LINK" ? 65 :
             assetData.symbol === "SOL" ? 51 :
             assetData.symbol === "AVAX" ? 78 : 50,
    },
    {
      factor: "Liquidity Risk",
      score: assetData.symbol === "BTC" ? 20 :
             assetData.symbol === "ETH" ? 28 :
             assetData.symbol === "XRP" ? 65 :
             assetData.symbol === "LINK" ? 58 :
             assetData.symbol === "SOL" ? 42 :
             assetData.symbol === "AVAX" ? 70 : 45,
    },
    {
      factor: "Market Sentiment",
      score: assetData.symbol === "BTC" ? 25 :
             assetData.symbol === "ETH" ? 35 :
             assetData.symbol === "XRP" ? 80 :
             assetData.symbol === "LINK" ? 45 :
             assetData.symbol === "SOL" ? 30 :
             assetData.symbol === "AVAX" ? 75 : 40,
    },
    {
      factor: "Smart Contract Risk",
      score: assetData.symbol === "BTC" ? 10 :
             assetData.symbol === "ETH" ? 65 :
             assetData.symbol === "XRP" ? 40 :
             assetData.symbol === "LINK" ? 72 :
             assetData.symbol === "SOL" ? 48 :
             assetData.symbol === "AVAX" ? 68 : 50,
    },
  ];
  
  // Sample news data
  const news = [
    {
      id: 1,
      title: `${assetData.name} ${assetData.riskLevel === "high" ? "Facing Regulatory Scrutiny" : "Gains Momentum in DeFi Space"}`,
      source: "Crypto News Today",
      date: "10 May 2025",
      sentiment: assetData.riskLevel === "high" ? "negative" : 
                 assetData.riskLevel === "medium" ? "neutral" : "positive",
      url: "#"
    },
    {
      id: 2,
      title: `New ${assetData.name} ${assetData.riskLevel === "high" ? "Vulnerability Discovered" : "Partnership Announced"}`,
      source: "Blockchain Report",
      date: "9 May 2025",
      sentiment: assetData.riskLevel === "high" ? "negative" : 
                assetData.riskLevel === "medium" ? "neutral" : "positive",
      url: "#"
    },
    {
      id: 3,
      title: `${assetData.name} ${assetData.riskLevel === "high" ? "Whales Moving Tokens to Exchanges" : "Development Activity at All-Time High"}`,
      source: "CoinInsights",
      date: "8 May 2025",
      sentiment: assetData.riskLevel === "high" ? "negative" : 
                assetData.riskLevel === "medium" ? "neutral" : "positive",
      url: "#"
    },
  ];
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-risk-low/20 text-risk-low border-risk-low/30";
      case "neutral": return "bg-risk-medium/20 text-risk-medium border-risk-medium/30";
      case "negative": return "bg-risk-high/20 text-risk-high border-risk-high/30";
      default: return "bg-muted";
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score < 40) return "text-risk-low";
    if (score < 70) return "text-risk-medium";
    return "text-risk-high";
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-10 px-4">
        <main className="container mx-auto">
          <Button
            variant="ghost"
            className="mb-6 pl-0 flex items-center gap-2 hover:bg-transparent hover:text-onyx-accent animate-slide-up"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </Button>
          
          {/* Asset Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-onyx-dark flex items-center justify-center">
                <span className="font-bold text-xl">{assetData.symbol}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{assetData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`${getRiskTextColor(assetData.riskLevel)} border-${assetData.riskLevel}`}>
                    <div className="flex items-center gap-1">
                      {getRiskIcon(assetData.riskLevel)}
                      <span className="capitalize">{assetData.riskLevel} Risk</span>
                    </div>
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Risk Score: <span className={`font-medium ${getRiskTextColor(assetData.riskLevel)}`}>{assetData.riskScore}</span>/100
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 bg-onyx-dark/50 rounded-lg p-4 border border-white/5">
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="text-2xl font-bold">${assetData.price.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-panel animate-slide-up">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assetData.balance.toLocaleString()} {assetData.symbol}</div>
                <div className="text-sm text-muted-foreground mt-1">${assetData.value.toLocaleString()}</div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel col-span-2 animate-slide-up animate-delay-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Price History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <XAxis dataKey="date" stroke="#888888" fontSize={12} />
                      <YAxis 
                        stroke="#888888" 
                        fontSize={12}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <CartesianGrid vertical={false} stroke="#333333" />
                      <Tooltip 
                        formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Price"]}
                        contentStyle={{
                          backgroundColor: "rgba(26, 31, 44, 0.9)",
                          border: "1px solid rgba(155, 135, 245, 0.2)",
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#9b87f5" 
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#9b87f5" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="risk" className="animate-slide-up animate-delay-200">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              <TabsTrigger value="news">Related News</TabsTrigger>
            </TabsList>
            
            <TabsContent value="risk" className="space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Risk Breakdown</CardTitle>
                  <CardDescription>
                    Factors contributing to the current risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-6">
                    {riskFactors.map((factor, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{factor.factor}</span>
                          <span className={`text-sm font-medium ${getScoreColor(factor.score)}`}>
                            {factor.score}/100
                          </span>
                        </div>
                        <div className="h-2 bg-onyx-dark rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${factor.score < 40 ? 'bg-risk-low' : factor.score < 70 ? 'bg-risk-medium' : 'bg-risk-high'}`}
                            style={{ width: `${factor.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Risk Mitigation</CardTitle>
                  <CardDescription>
                    Recommendations to reduce your exposure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetData.riskLevel === "high" && (
                      <>
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-risk-high/20 flex items-center justify-center flex-shrink-0">
                            <TrendingDown className="w-5 h-5 text-risk-high" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Consider Reducing Position</h4>
                            <p className="text-sm text-muted-foreground">
                              This asset represents a significant risk in your portfolio. Consider reducing your exposure.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-risk-high/20 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="w-5 h-5 text-risk-high" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Move to Secure Storage</h4>
                            <p className="text-sm text-muted-foreground">
                              If you're holding this asset, consider moving it to cold storage to minimize smart contract risk.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {assetData.riskLevel === "medium" && (
                      <>
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-risk-medium/20 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-5 h-5 text-risk-medium" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Monitor Closely</h4>
                            <p className="text-sm text-muted-foreground">
                              This asset shows moderate risk indicators. Continue to monitor its performance and news.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {assetData.riskLevel === "low" && (
                      <>
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-risk-low/20 flex items-center justify-center flex-shrink-0">
                            <Info className="w-5 h-5 text-risk-low" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Low Risk Profile</h4>
                            <p className="text-sm text-muted-foreground">
                              This asset currently presents minimal risk. Continue with your investment strategy.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news" className="space-y-6">
              {news.map((item) => (
                <Card key={item.id} className="glass-panel">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Source: {item.source}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                    <Button variant="ghost" size="sm" className="gap-1 mt-2 px-0 hover:bg-transparent hover:text-onyx-accent">
                      <span className="text-xs">Read Full Article</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Asset;

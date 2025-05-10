
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Shield, Info, ExternalLink, Calendar } from "lucide-react";
import { Header } from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Alerts = () => {
  const [alertFilter, setAlertFilter] = useState("all");
  
  // Sample data
  const alerts = [
    {
      id: 1,
      asset: "ETH",
      title: "Suspicious Contract Interaction",
      description: "Your wallet has interacted with a contract that has been flagged as potentially malicious.",
      risk: "high",
      source: "Smart Contract Analysis",
      date: "2025-05-10T08:35:00Z",
      link: "#"
    },
    {
      id: 2,
      asset: "XRP",
      title: "Unusual Price Movement",
      description: "XRP has experienced a 15% price drop in the last 24 hours.",
      risk: "medium",
      source: "Market Data",
      date: "2025-05-10T06:12:00Z",
      link: "#"
    },
    {
      id: 3,
      asset: "AVAX",
      title: "Governance Attack Warning",
      description: "Recent governance proposal may centralize token distribution.",
      risk: "high",
      source: "News Analysis",
      date: "2025-05-09T22:45:00Z",
      link: "#"
    },
    {
      id: 4,
      asset: "BTC",
      title: "Exchange Liquidity Change",
      description: "Major exchange reduced BTC withdrawal limits.",
      risk: "low",
      source: "Exchange API",
      date: "2025-05-09T15:30:00Z",
      link: "#"
    },
    {
      id: 5,
      asset: "LINK",
      title: "Smart Contract Vulnerability",
      description: "A vulnerability was discovered in a DeFi protocol using LINK.",
      risk: "medium",
      source: "Security Feed",
      date: "2025-05-08T20:15:00Z",
      link: "#"
    },
  ];
  
  // Filter alerts based on selection
  const filteredAlerts = alertFilter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.risk === alertFilter);
    
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
  
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low": return "bg-risk-low/20 text-risk-low border-risk-low/30";
      case "medium": return "bg-risk-medium/20 text-risk-medium border-risk-medium/30";
      case "high": return "bg-risk-high/20 text-risk-high border-risk-high/30";
      default: return "bg-muted";
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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Count alerts by risk level
  const highAlerts = alerts.filter(a => a.risk === "high").length;
  const mediumAlerts = alerts.filter(a => a.risk === "medium").length;
  const lowAlerts = alerts.filter(a => a.risk === "low").length;

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-10 px-4">
        <main className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Bell className="w-8 h-8 text-onyx-accent" />
                Risk Alerts
              </h1>
              <p className="text-muted-foreground mt-1">
                Real-time notifications about threats to your assets
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Select value={alertFilter} onValueChange={setAlertFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-onyx-dark border-onyx-muted">
                  <SelectValue placeholder="Filter alerts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Alert Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-panel animate-slide-up">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-risk-high/20 flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-risk-high" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">High Risk Alerts</div>
                  <div className="text-2xl font-bold">{highAlerts}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel animate-slide-up animate-delay-100">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-risk-medium/20 flex items-center justify-center mr-4">
                  <AlertTriangle className="w-6 h-6 text-risk-medium" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Medium Risk Alerts</div>
                  <div className="text-2xl font-bold">{mediumAlerts}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel animate-slide-up animate-delay-200">
              <CardContent className="p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-risk-low/20 flex items-center justify-center mr-4">
                  <Info className="w-6 h-6 text-risk-low" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Low Risk Alerts</div>
                  <div className="text-2xl font-bold">{lowAlerts}</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Alerts List */}
          <div className="space-y-4 animate-slide-up animate-delay-200">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert, index) => (
                <Card 
                  key={alert.id} 
                  className="glass-panel overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className={`h-1 ${getRiskColor(alert.risk)}`}></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div className="flex items-center gap-2 mb-2 md:mb-0">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-onyx-dark flex items-center justify-center mr-2">
                            <span className="font-bold text-sm">{alert.asset}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getRiskBadge(alert.risk)}`}>
                          <div className="flex items-center gap-1">
                            {getRiskIcon(alert.risk)}
                            <span className="capitalize">{alert.risk} Risk</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(alert.date)}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-1">{alert.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {alert.description}
                    </p>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div className="text-xs bg-onyx-dark px-2 py-1 rounded">
                        Source: {alert.source}
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span className="text-xs">View Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-panel p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Bell className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No Alerts Found</h3>
                <p className="text-muted-foreground text-sm">
                  There are no alerts matching your current filter.
                </p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Alerts;

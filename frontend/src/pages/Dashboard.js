import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Bot, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  MoreHorizontal,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { mockAgents, mockExecutionLogs } from "../data/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "bg-green-100 text-green-700 border-green-200",
      paused: "bg-yellow-100 text-yellow-700 border-yellow-200",
      error: "bg-red-100 text-red-700 border-red-200"
    };
    return variants[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const categories = [
    { id: "all", name: "All", count: mockAgents.length },
    { id: "productivity", name: "Productivity", count: mockAgents.filter(a => a.category === "productivity").length },
    { id: "development", name: "Development", count: mockAgents.filter(a => a.category === "development").length },
    { id: "sales", name: "Sales", count: mockAgents.filter(a => a.category === "sales").length },
    { id: "marketing", name: "Marketing", count: mockAgents.filter(a => a.category === "marketing").length }
  ];

  const stats = [
    { title: "Total Agents", value: mockAgents.length, icon: Bot, color: "text-blue-500" },
    { title: "Active Agents", value: mockAgents.filter(a => a.status === "active").length, icon: CheckCircle, color: "text-green-500" },
    { title: "Total Runs", value: mockAgents.reduce((sum, agent) => sum + agent.runs, 0).toLocaleString(), icon: Activity, color: "text-purple-500" },
    { title: "Success Rate", value: "98.5%", icon: CheckCircle, color: "text-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Pipedream
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/templates')}>
                Templates
              </Button>
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => navigate('/agent-builder')}>
                <Plus className="w-4 h-4 mr-2" />
                New Agent
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Dashboard</h1>
            <p className="text-gray-600 text-lg">Manage your AI agents and workflows</p>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/agent-builder')}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Agent
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="agents" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="agents" className="flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <span>Agents</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Execution Logs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search agents..."
                  className="pl-10 bg-white/80 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getStatusBadge(agent.status)} border`}>
                        {getStatusIcon(agent.status)}
                        <span className="ml-1 capitalize">{agent.status}</span>
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {agent.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-2">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{agent.lastRun}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4" />
                        <span>{agent.runs} runs</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        onClick={() => navigate(`/agent/${agent.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-200 hover:bg-purple-50"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or create a new agent.</p>
                <Button onClick={() => navigate('/agent-builder')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Agent
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <div className="space-y-4">
              {mockExecutionLogs.map((log) => (
                <Card key={log.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <CardTitle className="text-lg font-semibold">
                          {mockAgents.find(a => a.id === log.agentId)?.name || 'Unknown Agent'}
                        </CardTitle>
                      </div>
                      <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                        {log.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                      <span>Duration: {log.duration}ms</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700">Input:</p>
                        <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded">{log.input}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Output:</p>
                        <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded">{log.output}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Steps:</p>
                        <div className="space-y-2 mt-2">
                          {log.stepLogs.map((step, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <div className={`w-2 h-2 rounded-full ${step.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                              <span className="font-medium">{step.step}:</span>
                              <span className="text-gray-600">{step.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
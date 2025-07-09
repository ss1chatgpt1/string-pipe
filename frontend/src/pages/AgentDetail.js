import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Bot, 
  ArrowLeft, 
  Play, 
  Pause, 
  Edit,
  Settings,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Download,
  Share2,
  Trash2
} from "lucide-react";
import { mockAgents, mockExecutionLogs } from "../data/mockData";
import { toast } from "sonner";

const AgentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [agent, setAgent] = useState(mockAgents.find(a => a.id === parseInt(id)));
  const [isLoading, setIsLoading] = useState(false);

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Agent Not Found</h1>
          <p className="text-gray-600 mb-4">The agent you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const agentLogs = mockExecutionLogs.filter(log => log.agentId === agent.id);

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

  const handleToggleStatus = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newStatus = agent.status === "active" ? "paused" : "active";
      setAgent({ ...agent, status: newStatus });
      setIsLoading(false);
      toast.success(`Agent ${newStatus === "active" ? "activated" : "paused"} successfully`);
    }, 1000);
  };

  const handleRunAgent = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Agent executed successfully");
    }, 2000);
  };

  const handleCopyWebhook = () => {
    const webhookUrl = `https://api.pipedream.com/webhook/agent-${agent.id}`;
    navigator.clipboard.writeText(webhookUrl);
    toast.success("Webhook URL copied to clipboard");
  };

  const handleDeleteAgent = () => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      toast.success("Agent deleted successfully");
      navigate('/dashboard');
    }
  };

  const stats = [
    { title: "Total Runs", value: agent.runs.toLocaleString(), icon: Activity, color: "text-blue-500" },
    { title: "Success Rate", value: "98.2%", icon: CheckCircle, color: "text-green-500" },
    { title: "Avg. Duration", value: "1.2s", icon: Clock, color: "text-purple-500" },
    { title: "Last Run", value: agent.lastRun, icon: Clock, color: "text-gray-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{agent.name}</h1>
                  <p className="text-sm text-gray-500">Agent Details</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyWebhook}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Webhook
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate(`/agent-builder?edit=${agent.id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteAgent}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Agent Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                        <span>{agent.name}</span>
                        <Badge className={`${getStatusBadge(agent.status)} border ml-2`}>
                          {getStatusIcon(agent.status)}
                          <span className="ml-1 capitalize">{agent.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {agent.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {agent.category}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-600">
                      {agent.template}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Agent Prompt</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">{agent.prompt}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Controls */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleToggleStatus}
                    disabled={isLoading}
                    className={`w-full ${agent.status === "active" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"} text-white`}
                  >
                    {isLoading ? (
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                    ) : agent.status === "active" ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {agent.status === "active" ? "Pause Agent" : "Activate Agent"}
                  </Button>
                  
                  <Button 
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full border-purple-200 hover:bg-purple-50"
                  >
                    {isLoading ? (
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    Run Now
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-50"
                    onClick={() => navigate(`/agent-builder?edit=${agent.id}`)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <stat.icon className={`w-4 h-4 ${stat.color}`} />
                          <span className="text-sm text-gray-600">{stat.title}</span>
                        </div>
                        <span className="font-medium text-gray-900">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="logs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="logs">Execution Logs</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="space-y-4">
              {agentLogs.length > 0 ? (
                agentLogs.map((log) => (
                  <Card key={log.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(log.timestamp).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">Duration: {log.duration}ms</p>
                          </div>
                        </div>
                        <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                          {log.status}
                        </Badge>
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
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No execution logs available</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="config" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Agent Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Model</label>
                      <p className="text-gray-900">DeepSeek R1 (Free)</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Max Tokens</label>
                      <p className="text-gray-900">4000</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Temperature</label>
                      <p className="text-gray-900">0.7</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Timeout</label>
                      <p className="text-gray-900">30 seconds</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Webhook URL</label>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          https://api.pipedream.com/webhook/agent-{agent.id}
                        </code>
                        <Button size="sm" variant="outline" onClick={handleCopyWebhook}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
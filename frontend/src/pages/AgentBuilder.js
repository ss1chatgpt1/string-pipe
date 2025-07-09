import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { 
  Bot, 
  ArrowLeft, 
  Play, 
  Save, 
  Settings, 
  Zap,
  Code,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { toast } from "../hooks/use-toast";

const AgentBuilder = () => {
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("");
  const [agentDescription, setAgentDescription] = useState("");
  const [agentPrompt, setAgentPrompt] = useState("");
  const [agentCategory, setAgentCategory] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");

  const categories = [
    { value: "productivity", label: "Productivity", icon: "⚡" },
    { value: "development", label: "Development", icon: "💻" },
    { value: "sales", label: "Sales", icon: "💰" },
    { value: "marketing", label: "Marketing", icon: "📊" },
    { value: "content", label: "Content", icon: "✍️" },
    { value: "analytics", label: "Analytics", icon: "📈" },
    { value: "ai", label: "AI", icon: "🤖" }
  ];

  const promptTemplates = [
    {
      name: "Data Processor",
      description: "Process and analyze structured data",
      prompt: "You are a data processing agent. Extract key information from the provided data and format it in a structured way. Focus on: 1) Data validation, 2) Key metrics extraction, 3) Structured output formatting."
    },
    {
      name: "Content Creator",
      description: "Generate creative content",
      prompt: "You are a content creation agent. Generate engaging, high-quality content based on the input. Consider: 1) Target audience, 2) Content style and tone, 3) SEO optimization, 4) Engagement factors."
    },
    {
      name: "Customer Service",
      description: "Handle customer inquiries",
      prompt: "You are a customer service agent. Respond to customer inquiries professionally and helpfully. Always: 1) Acknowledge the customer's concern, 2) Provide clear solutions, 3) Maintain a friendly tone, 4) Escalate when necessary."
    },
    {
      name: "Code Assistant",
      description: "Help with programming tasks",
      prompt: "You are a programming assistant. Help with code-related tasks including: 1) Code review and optimization, 2) Bug fixing, 3) Feature implementation, 4) Best practices recommendations."
    }
  ];

  const handleTestRun = async () => {
    if (!agentPrompt.trim()) {
      toast.error("Please enter a prompt to test");
      return;
    }

    setIsRunning(true);
    setTestResult(null);

    // Simulate API call
    setTimeout(() => {
      setTestResult({
        status: "success",
        message: "Test completed successfully!",
        output: "Agent processed the test input and generated the following response: This is a simulated response from your AI agent. The agent would use the DeepSeek model to process your input and provide intelligent responses based on your prompt configuration.",
        executionTime: 1247,
        tokensUsed: 156
      });
      setIsRunning(false);
      toast.success("Test run completed successfully!");
    }, 3000);
  };

  const handleSaveAgent = () => {
    if (!agentName.trim() || !agentPrompt.trim()) {
      toast.error("Please fill in the agent name and prompt");
      return;
    }

    // Simulate saving
    toast.success("Agent saved successfully!");
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleDeployAgent = () => {
    if (!agentName.trim() || !agentPrompt.trim()) {
      toast.error("Please fill in the agent name and prompt");
      return;
    }

    // Simulate deployment
    toast.success("Agent deployed successfully!");
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Agent Builder
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={handleSaveAgent}
                disabled={!agentName.trim() || !agentPrompt.trim()}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={handleDeployAgent}
                disabled={!agentName.trim() || !agentPrompt.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Zap className="w-4 h-4 mr-2" />
                Deploy Agent
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Create AI Agent</h1>
            <p className="text-gray-600 text-lg">Build and deploy your AI agent in minutes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Configuration */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                  <TabsTrigger value="basic" className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <span>Basic Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="prompt" className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Prompt</span>
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Advanced</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-purple-600" />
                        <span>Agent Information</span>
                      </CardTitle>
                      <CardDescription>
                        Basic configuration for your AI agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="agent-name" className="text-sm font-medium">Agent Name</Label>
                        <Input
                          id="agent-name"
                          placeholder="Enter agent name..."
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                          className="bg-white/80 backdrop-blur-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agent-description" className="text-sm font-medium">Description</Label>
                        <Textarea
                          id="agent-description"
                          placeholder="Describe what your agent does..."
                          value={agentDescription}
                          onChange={(e) => setAgentDescription(e.target.value)}
                          className="bg-white/80 backdrop-blur-sm min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agent-category" className="text-sm font-medium">Category</Label>
                        <Select value={agentCategory} onValueChange={setAgentCategory}>
                          <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <div className="flex items-center space-x-2">
                                  <span>{category.icon}</span>
                                  <span>{category.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="prompt" className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                        <span>AI Prompt Configuration</span>
                      </CardTitle>
                      <CardDescription>
                        Define how your AI agent should behave and respond
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">Quick Templates</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {promptTemplates.map((template, index) => (
                            <Card 
                              key={index} 
                              className="p-3 cursor-pointer hover:bg-purple-50 transition-colors border-purple-200"
                              onClick={() => setAgentPrompt(template.prompt)}
                            >
                              <div className="space-y-1">
                                <p className="font-medium text-sm">{template.name}</p>
                                <p className="text-xs text-gray-600">{template.description}</p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agent-prompt" className="text-sm font-medium">System Prompt</Label>
                        <Textarea
                          id="agent-prompt"
                          placeholder="Enter your system prompt here..."
                          value={agentPrompt}
                          onChange={(e) => setAgentPrompt(e.target.value)}
                          className="bg-white/80 backdrop-blur-sm min-h-[200px]"
                        />
                        <p className="text-xs text-gray-500">
                          This prompt defines how your AI agent will behave and respond to inputs.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-purple-600" />
                        <span>Advanced Settings</span>
                      </CardTitle>
                      <CardDescription>
                        Configure advanced parameters for your AI agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">AI Model</Label>
                          <Select defaultValue="deepseek-r1">
                            <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="deepseek-r1">DeepSeek R1 (Free)</SelectItem>
                              <SelectItem value="gpt-4o">GPT-4o (Premium)</SelectItem>
                              <SelectItem value="claude-3">Claude 3 (Premium)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Max Tokens</Label>
                          <Input
                            type="number"
                            defaultValue="4000"
                            className="bg-white/80 backdrop-blur-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Temperature</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="2"
                            defaultValue="0.7"
                            className="bg-white/80 backdrop-blur-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Timeout (seconds)</Label>
                          <Input
                            type="number"
                            defaultValue="30"
                            className="bg-white/80 backdrop-blur-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Test Panel */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-green-600" />
                    <span>Test Agent</span>
                  </CardTitle>
                  <CardDescription>
                    Test your agent before deployment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-input" className="text-sm font-medium">Test Input</Label>
                    <Textarea
                      id="test-input"
                      placeholder="Enter test input..."
                      className="bg-white/80 backdrop-blur-sm min-h-[100px]"
                    />
                  </div>
                  <Button 
                    onClick={handleTestRun}
                    disabled={isRunning || !agentPrompt.trim()}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                  >
                    {isRunning ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Running Test...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Test
                      </>
                    )}
                  </Button>

                  {testResult && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">Test Successful</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{testResult.output}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Execution: {testResult.executionTime}ms</span>
                        <span>Tokens: {testResult.tokensUsed}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    <span>Agent Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Configuration</span>
                      <Badge variant={agentName && agentPrompt ? "default" : "secondary"}>
                        {agentName && agentPrompt ? "Complete" : "Incomplete"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Test Status</span>
                      <Badge variant={testResult ? "default" : "secondary"}>
                        {testResult ? "Tested" : "Not Tested"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ready to Deploy</span>
                      <Badge variant={agentName && agentPrompt ? "default" : "secondary"}>
                        {agentName && agentPrompt ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilder;
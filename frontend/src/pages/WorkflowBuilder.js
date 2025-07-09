import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { 
  Bot, 
  ArrowLeft, 
  Plus, 
  Play, 
  Save, 
  Settings,
  Workflow,
  Zap,
  ArrowRight,
  Trash2,
  Edit,
  Copy
} from "lucide-react";
import { mockWorkflowSteps } from "../data/mockData";
import { toast } from "sonner";

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [steps, setSteps] = useState([mockWorkflowSteps[0]]);
  const [selectedStep, setSelectedStep] = useState(null);

  const availableSteps = [
    { type: "trigger", title: "Webhook", description: "Receive HTTP requests", icon: "🔗" },
    { type: "trigger", title: "Schedule", description: "Run on a schedule", icon: "⏰" },
    { type: "trigger", title: "Form Submit", description: "When form is submitted", icon: "📝" },
    { type: "action", title: "AI Processing", description: "Process with AI", icon: "🤖" },
    { type: "action", title: "Send Email", description: "Send email notification", icon: "📧" },
    { type: "action", title: "Google Sheets", description: "Add to spreadsheet", icon: "📊" },
    { type: "action", title: "Slack Message", description: "Send to Slack", icon: "💬" },
    { type: "action", title: "HTTP Request", description: "Make API call", icon: "🌐" },
    { type: "action", title: "Database", description: "Store in database", icon: "🗄️" },
    { type: "condition", title: "Filter", description: "Conditional logic", icon: "🔍" },
    { type: "condition", title: "Branch", description: "Split workflow", icon: "🔀" }
  ];

  const getStepColor = (type) => {
    switch (type) {
      case "trigger":
        return "bg-green-100 text-green-700 border-green-200";
      case "action":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "condition":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const addStep = (stepTemplate) => {
    const newStep = {
      id: Date.now(),
      type: stepTemplate.type,
      title: stepTemplate.title,
      description: stepTemplate.description,
      icon: stepTemplate.icon,
      config: {}
    };
    setSteps([...steps, newStep]);
    setSelectedStep(newStep);
  };

  const removeStep = (stepId) => {
    setSteps(steps.filter(step => step.id !== stepId));
    if (selectedStep?.id === stepId) {
      setSelectedStep(null);
    }
  };

  const duplicateStep = (step) => {
    const newStep = {
      ...step,
      id: Date.now(),
      title: `${step.title} (Copy)`
    };
    setSteps([...steps, newStep]);
  };

  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }
    toast.success("Workflow saved successfully!");
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const handleTestWorkflow = () => {
    if (steps.length === 0) {
      toast.error("Please add at least one step");
      return;
    }
    toast.success("Workflow test started!");
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
                  <Workflow className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Workflow Builder
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleSaveWorkflow}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleTestWorkflow} className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Test
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                Deploy
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Step Library */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Step Library</CardTitle>
                  <CardDescription>Drag or click to add steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availableSteps.map((step, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-purple-50 hover:border-purple-200 transition-colors"
                        onClick={() => addStep(step)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{step.icon}</div>
                          <div>
                            <p className="font-medium text-sm">{step.title}</p>
                            <p className="text-xs text-gray-500">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Workflow Canvas */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Workflow Header */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Workflow Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Workflow Name
                      </label>
                      <Input
                        placeholder="Enter workflow name..."
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Description
                      </label>
                      <Textarea
                        placeholder="Describe your workflow..."
                        value={workflowDescription}
                        onChange={(e) => setWorkflowDescription(e.target.value)}
                        className="bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Workflow Steps */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Workflow Steps</CardTitle>
                    <CardDescription>Build your workflow by adding and configuring steps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {steps.length === 0 ? (
                        <div className="text-center py-8">
                          <Workflow className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No steps added yet</p>
                          <p className="text-sm text-gray-500">Add steps from the library to get started</p>
                        </div>
                      ) : (
                        steps.map((step, index) => (
                          <div key={step.id} className="space-y-2">
                            <div
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                selectedStep?.id === step.id ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedStep(step)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="text-lg">{step.icon}</div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <p className="font-medium">{step.title}</p>
                                      <Badge className={`${getStepColor(step.type)} border text-xs`}>
                                        {step.type}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">{step.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      duplicateStep(step);
                                    }}
                                  >
                                    <Copy className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedStep(step);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeStep(step.id);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {index < steps.length - 1 && (
                              <div className="flex justify-center">
                                <ArrowRight className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step Configuration */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Step Configuration</CardTitle>
                  <CardDescription>
                    {selectedStep ? `Configure ${selectedStep.title}` : "Select a step to configure"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedStep ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-2xl">{selectedStep.icon}</div>
                        <div>
                          <p className="font-medium">{selectedStep.title}</p>
                          <Badge className={`${getStepColor(selectedStep.type)} border text-xs`}>
                            {selectedStep.type}
                          </Badge>
                        </div>
                      </div>

                      {selectedStep.type === "trigger" && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Trigger Name
                            </label>
                            <Input placeholder="Enter trigger name..." className="bg-white/80 backdrop-blur-sm" />
                          </div>
                          {selectedStep.title === "Webhook" && (
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Webhook URL
                              </label>
                              <Input 
                                value="https://api.pipedream.com/webhook/abc123"
                                readOnly
                                className="bg-gray-50"
                              />
                            </div>
                          )}
                          {selectedStep.title === "Schedule" && (
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Schedule
                              </label>
                              <Select>
                                <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                                  <SelectValue placeholder="Select schedule" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hourly">Every Hour</SelectItem>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedStep.type === "action" && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Action Name
                            </label>
                            <Input placeholder="Enter action name..." className="bg-white/80 backdrop-blur-sm" />
                          </div>
                          {selectedStep.title === "AI Processing" && (
                            <>
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                  AI Model
                                </label>
                                <Select>
                                  <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                                    <SelectValue placeholder="Select model" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="deepseek-r1">DeepSeek R1</SelectItem>
                                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                                    <SelectItem value="claude-3">Claude 3</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                  Prompt
                                </label>
                                <Textarea 
                                  placeholder="Enter AI prompt..."
                                  className="bg-white/80 backdrop-blur-sm"
                                />
                              </div>
                            </>
                          )}
                          {selectedStep.title === "Send Email" && (
                            <>
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                  To
                                </label>
                                <Input placeholder="recipient@example.com" className="bg-white/80 backdrop-blur-sm" />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                  Subject
                                </label>
                                <Input placeholder="Email subject..." className="bg-white/80 backdrop-blur-sm" />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                  Message
                                </label>
                                <Textarea 
                                  placeholder="Email message..."
                                  className="bg-white/80 backdrop-blur-sm"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {selectedStep.type === "condition" && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Condition Type
                            </label>
                            <Select>
                              <SelectTrigger className="bg-white/80 backdrop-blur-sm">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="contains">Contains</SelectItem>
                                <SelectItem value="greater">Greater Than</SelectItem>
                                <SelectItem value="less">Less Than</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Value
                            </label>
                            <Input placeholder="Enter value..." className="bg-white/80 backdrop-blur-sm" />
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t">
                        <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                          <Save className="w-4 h-4 mr-2" />
                          Save Configuration
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Select a step to configure</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
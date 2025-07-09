import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight, Bot, Workflow, Shield, Zap, Code, Users } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Bot className="w-8 h-8 text-purple-500" />,
      title: "AI Agent Builder",
      description: "Prompt, run, edit, and deploy AI agents in seconds with natural language.",
      highlight: "New"
    },
    {
      icon: <Workflow className="w-8 h-8 text-blue-500" />,
      title: "Workflow Automation",
      description: "Automate any process that connects APIs with visual workflow builder.",
      highlight: ""
    },
    {
      icon: <Code className="w-8 h-8 text-green-500" />,
      title: "Code-Level Control",
      description: "Full JavaScript/Python support when you need custom logic.",
      highlight: ""
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Enterprise Security",
      description: "SOC 2 Type II, ISO 27001, and HIPAA compliant infrastructure.",
      highlight: ""
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Instant Deployment",
      description: "Deploy and scale your automations instantly without infrastructure.",
      highlight: ""
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      title: "Team Collaboration",
      description: "Share workflows and collaborate with your team in real-time.",
      highlight: ""
    }
  ];

  const templates = [
    { name: "Google Sheets Auto-Updater", category: "Productivity", icon: "📊" },
    { name: "GitHub Issue Tracker", category: "Development", icon: "🔗" },
    { name: "Brand Monitor", category: "Marketing", icon: "🔍" },
    { name: "Email Categorizer", category: "Productivity", icon: "📧" },
    { name: "Webhook Proxy", category: "Development", icon: "🔗" },
    { name: "Daily Calendar Summary", category: "Productivity", icon: "📅" }
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
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button onClick={() => navigate('/agent-builder')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
            <Zap className="w-4 h-4 mr-1" />
            AI-Powered Automation
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Build Powerful<br />
            AI Agents in<br />
            <span className="text-6xl md:text-8xl">Seconds</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The fastest way to build powerful applications that connect all the services in your stack, 
            with code-level control when you need it and no code when you don't.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/agent-builder')}
            >
              Build Your First Agent
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
              onClick={() => navigate('/templates')}
            >
              Browse Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Everything you need to automate
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From simple automations to complex AI-powered workflows, we've got you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 group-hover:from-purple-50 group-hover:to-blue-50 transition-all duration-300">
                    {feature.icon}
                  </div>
                  {feature.highlight && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      {feature.highlight}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Templates */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Popular Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started quickly with pre-built templates for common use cases.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{template.icon}</div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {template.name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 mt-1">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
            onClick={() => navigate('/templates')}
          >
            View All Templates
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to automate your workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers and teams who use Pipedream to build powerful automations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/agent-builder')}
            >
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => navigate('/templates')}
            >
              Explore Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Pipedream</span>
            </div>
            <p className="text-gray-400">© 2024 Pipedream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
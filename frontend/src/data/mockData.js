// Mock data for Pipedream clone
export const mockAgents = [
  {
    id: 1,
    name: "Google Sheets Auto-Updater",
    description: "Automatically add new form submissions to Google Sheets",
    status: "active",
    lastRun: "2 hours ago",
    category: "productivity",
    template: "google-sheets",
    runs: 1247,
    prompt: "Create an agent that monitors form submissions and adds them to a Google Sheet with proper formatting and validation."
  },
  {
    id: 2,
    name: "GitHub Issue Tracker",
    description: "Create Linear issues from GitHub issues automatically",
    status: "active",
    lastRun: "5 minutes ago",
    category: "development",
    template: "github-linear",
    runs: 856,
    prompt: "Monitor GitHub issues and automatically create corresponding Linear issues with proper labeling and assignment."
  },
  {
    id: 3,
    name: "Stripe Customer Manager",
    description: "Add new Stripe customers to HubSpot CRM",
    status: "paused",
    lastRun: "1 day ago",
    category: "sales",
    template: "stripe-hubspot",
    runs: 432,
    prompt: "When a new customer is added to Stripe, automatically create a contact in HubSpot with relevant customer data."
  },
  {
    id: 4,
    name: "Brand Monitor",
    description: "Monitor brand mentions across social media",
    status: "active",
    lastRun: "10 minutes ago",
    category: "marketing",
    template: "brand-monitoring",
    runs: 2341,
    prompt: "Track brand mentions on Twitter, Reddit, and news sites, then send notifications for significant mentions."
  },
  {
    id: 5,
    name: "Email Categorizer",
    description: "Automatically categorize and prioritize emails",
    status: "active",
    lastRun: "1 hour ago",
    category: "productivity",
    template: "email-categorization",
    runs: 1876,
    prompt: "Analyze incoming emails and categorize them by priority and type, then route to appropriate team members."
  }
];

export const mockTemplates = [
  {
    id: 1,
    name: "Google Sheets Integration",
    description: "Add rows to Google Sheets from various data sources",
    category: "productivity",
    icon: "📊",
    difficulty: "Easy",
    estimatedTime: "2 minutes",
    tags: ["google-sheets", "automation", "data"],
    defaultPrompt: "Create an agent that adds new data to a Google Sheet whenever a specific event occurs."
  },
  {
    id: 2,
    name: "GitHub to Linear",
    description: "Create Linear issues from GitHub issues",
    category: "development",
    icon: "🔗",
    difficulty: "Medium",
    estimatedTime: "5 minutes",
    tags: ["github", "linear", "project-management"],
    defaultPrompt: "Monitor GitHub issues and automatically create corresponding Linear issues with proper formatting."
  },
  {
    id: 3,
    name: "Stripe to HubSpot",
    description: "Sync Stripe customers with HubSpot CRM",
    category: "sales",
    icon: "💰",
    difficulty: "Medium",
    estimatedTime: "4 minutes",
    tags: ["stripe", "hubspot", "crm"],
    defaultPrompt: "When a new customer is added to Stripe, create a contact in HubSpot with all relevant information."
  },
  {
    id: 4,
    name: "Webhook Proxy",
    description: "Receive and process webhook data",
    category: "development",
    icon: "🔗",
    difficulty: "Easy",
    estimatedTime: "1 minute",
    tags: ["webhook", "api", "integration"],
    defaultPrompt: "Create a webhook endpoint that receives data and processes it according to custom rules."
  },
  {
    id: 5,
    name: "Daily Calendar Summary",
    description: "Get daily calendar summaries via email",
    category: "productivity",
    icon: "📅",
    difficulty: "Easy",
    estimatedTime: "3 minutes",
    tags: ["calendar", "email", "daily-summary"],
    defaultPrompt: "Send a daily email summary of calendar events with key details and preparation notes."
  },
  {
    id: 6,
    name: "Brand Monitoring",
    description: "Monitor brand mentions across platforms",
    category: "marketing",
    icon: "🔍",
    difficulty: "Hard",
    estimatedTime: "10 minutes",
    tags: ["monitoring", "social-media", "alerts"],
    defaultPrompt: "Track brand mentions on social media and news sites, then send alerts for important mentions."
  },
  {
    id: 7,
    name: "Email Categorization",
    description: "Automatically categorize and prioritize emails",
    category: "productivity",
    icon: "📧",
    difficulty: "Medium",
    estimatedTime: "6 minutes",
    tags: ["email", "ai", "automation"],
    defaultPrompt: "Analyze incoming emails and categorize them by priority and type using AI."
  },
  {
    id: 8,
    name: "Tweetstorm Generator",
    description: "Generate Twitter thread content",
    category: "content",
    icon: "🐦",
    difficulty: "Medium",
    estimatedTime: "5 minutes",
    tags: ["twitter", "content", "ai"],
    defaultPrompt: "Generate engaging Twitter threads on specific topics with proper formatting and hashtags."
  },
  {
    id: 9,
    name: "Earnings Call Summaries",
    description: "Summarize earnings call transcripts",
    category: "finance",
    icon: "📈",
    difficulty: "Hard",
    estimatedTime: "8 minutes",
    tags: ["finance", "ai", "analysis"],
    defaultPrompt: "Analyze earnings call transcripts and generate concise summaries with key insights."
  },
  {
    id: 10,
    name: "User Signup Analytics",
    description: "Track and analyze new user signups",
    category: "analytics",
    icon: "👥",
    difficulty: "Medium",
    estimatedTime: "4 minutes",
    tags: ["analytics", "users", "tracking"],
    defaultPrompt: "Monitor new user signups and generate analytics reports with insights and trends."
  },
  {
    id: 11,
    name: "AI Model Monitoring",
    description: "Monitor AI model performance",
    category: "ai",
    icon: "🤖",
    difficulty: "Hard",
    estimatedTime: "12 minutes",
    tags: ["ai", "monitoring", "performance"],
    defaultPrompt: "Track AI model performance metrics and send alerts when performance degrades."
  },
  {
    id: 12,
    name: "Product Drop Alerts",
    description: "Get notified about new product releases",
    category: "ecommerce",
    icon: "👟",
    difficulty: "Medium",
    estimatedTime: "7 minutes",
    tags: ["ecommerce", "alerts", "products"],
    defaultPrompt: "Monitor specific product pages and send notifications when new items are released."
  }
];

export const mockWorkflowSteps = [
  {
    id: 1,
    type: "trigger",
    title: "Form Submission",
    description: "When a form is submitted",
    icon: "📝",
    config: {
      source: "web-form",
      url: "https://example.com/contact"
    }
  },
  {
    id: 2,
    type: "action",
    title: "AI Processing",
    description: "Process data with AI",
    icon: "🤖",
    config: {
      model: "deepseek-r1",
      prompt: "Extract key information from form data"
    }
  },
  {
    id: 3,
    type: "action",
    title: "Add to Google Sheets",
    description: "Add row to spreadsheet",
    icon: "📊",
    config: {
      spreadsheetId: "1ABC...",
      worksheet: "Contacts"
    }
  }
];

export const mockCategories = [
  { id: 1, name: "All", count: 60 },
  { id: 2, name: "Productivity", count: 18 },
  { id: 3, name: "Development", count: 12 },
  { id: 4, name: "Sales", count: 8 },
  { id: 5, name: "Marketing", count: 9 },
  { id: 6, name: "Content", count: 5 },
  { id: 7, name: "Finance", count: 3 },
  { id: 8, name: "Analytics", count: 3 },
  { id: 9, name: "AI", count: 2 }
];

export const mockExecutionLogs = [
  {
    id: 1,
    agentId: 1,
    timestamp: "2024-01-15T10:30:00Z",
    status: "success",
    duration: 1200,
    input: "New form submission from John Doe",
    output: "Successfully added to Google Sheets",
    stepLogs: [
      { step: "trigger", status: "success", message: "Form submission received" },
      { step: "ai-processing", status: "success", message: "Data processed successfully" },
      { step: "sheets-add", status: "success", message: "Row added to spreadsheet" }
    ]
  },
  {
    id: 2,
    agentId: 2,
    timestamp: "2024-01-15T10:25:00Z",
    status: "error",
    duration: 800,
    input: "GitHub issue #123 created",
    output: "Failed to create Linear issue",
    stepLogs: [
      { step: "trigger", status: "success", message: "GitHub issue detected" },
      { step: "ai-processing", status: "success", message: "Issue analyzed" },
      { step: "linear-create", status: "error", message: "Linear API authentication failed" }
    ]
  }
];
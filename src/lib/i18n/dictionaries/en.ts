const en = {
  common: {
    brand: "Axirova",
    brandFull: "Axirova Prompt Architect AI",
    loading: "Loading...",
    save: "Save",
    saved: "Saved",
    cancel: "Cancel",
    delete: "Delete",
    copy: "Copy",
    copied: "Copied to clipboard",
    edit: "Edit",
    close: "Close",
    back: "Back",
    getStarted: "Get Started",
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    comingSoon: "Coming Soon",
    language: "Language",
    arabic: "Arabic",
    english: "English",
  },
  nav: {
    features: "Features",
    howItWorks: "How It Works",
    pricing: "Pricing",
    dashboard: "Dashboard",
    newPrompt: "New Prompt",
    history: "History",
    saved: "Saved",
    categories: "Categories",
    settings: "Settings",
  },
  landing: {
    hero: {
      badge: "Arabic-first AI prompt engineering",
      title: "Turn simple ideas into professional AI prompts",
      subtitle:
        "Axirova analyzes your goal, industry, and audience — in Arabic or English — and generates ready-to-use prompts optimized for the world's best AI tools, tuned for Gulf business context.",
      ctaPrimary: "Start Building Prompts",
      ctaSecondary: "See How It Works",
      exampleLabel: "Try an example",
      exampleInput: "I need a marketing plan for my villa maintenance company in Dubai",
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "From a rough idea to a production-ready prompt in three steps.",
      steps: [
        {
          title: "Describe your goal",
          description:
            "Write your request naturally, in Arabic or English — no prompt-engineering experience needed.",
        },
        {
          title: "Axirova analyzes it",
          description:
            "We detect your industry, audience, platform, and required output — and flag what's missing.",
        },
        {
          title: "Get ready-to-use prompts",
          description:
            "Receive Professional, Advanced, and Short prompt variants plus the recommended AI tool.",
        },
      ],
    },
    features: {
      title: "Everything you need to prompt like a pro",
      subtitle: "Built for Arabic creators, marketers, and business owners across the Gulf.",
      items: [
        {
          title: "Arabic Intelligence Layer",
          description:
            "Understands Arabic business requests natively — no literal translation, culturally adapted for Gulf markets.",
        },
        {
          title: "Three Prompt Variants",
          description:
            "Professional, Advanced, and Short versions of every prompt, tailored to how you'll use it.",
        },
        {
          title: "Smart Tool Recommendation",
          description: "We recommend the best AI tool for your specific goal and output type.",
        },
        {
          title: "9 Prompt Categories",
          description:
            "Marketing, Business, Coding, Design, Image & Video Generation, Writing, Research, Automation.",
        },
        {
          title: "Prompt Workspace",
          description:
            "A focused workspace to write your request, watch the analysis, and refine your results.",
        },
        {
          title: "History & Library",
          description: "Every prompt is saved automatically — revisit, reuse, or export anytime.",
        },
      ],
    },
    aiTools: {
      title: "Optimized for the AI tools you already use",
      subtitle: "Axirova recommends and formats prompts for the right tool, every time.",
      tools: [
        "ChatGPT",
        "Claude",
        "Gemini",
        "Midjourney",
        "DALL·E",
        "Runway",
        "GitHub Copilot",
        "Perplexity",
      ],
    },
    pricing: {
      title: "Pricing",
      subtitle: "Simple plans for individuals and growing teams. Billing launches soon.",
      plans: [
        {
          name: "Free",
          price: "$0",
          description: "For getting started with prompt engineering.",
          features: ["10 prompts / month", "Rule-based engine", "3 prompt variants", "Prompt history"],
        },
        {
          name: "Pro",
          price: "$19",
          description: "For creators and marketers who prompt daily.",
          features: [
            "Unlimited prompts",
            "OpenAI & Claude integration",
            "All 9 categories",
            "Priority support",
          ],
          highlighted: true,
        },
        {
          name: "Business",
          price: "Custom",
          description: "For agencies and teams across the Gulf.",
          features: ["Team workspaces", "Brand-tuned prompts", "Dedicated support", "Custom onboarding"],
        },
      ],
      badge: "Coming soon",
    },
    cta: {
      title: "Ready to build better prompts?",
      subtitle: "Join Arabic creators and businesses already prompting smarter with Axirova.",
      button: "Create Your First Prompt",
    },
    footer: {
      tagline: "Arabic-first AI prompt engineering for the Gulf and beyond.",
      rights: "All rights reserved.",
    },
  },
  auth: {
    continueWithGoogle: "Continue with Google",
    orContinueWithEmail: "Or continue with email",
    login: {
      title: "Welcome back",
      subtitle: "Sign in to continue building prompts.",
      submit: "Sign In",
      noAccount: "Don't have an account?",
      createOne: "Create one",
    },
    signup: {
      title: "Create your account",
      subtitle: "Start turning ideas into professional prompts in minutes.",
      submit: "Create Account",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
    },
    errors: {
      generic: "Something went wrong. Please try again.",
    },
  },
  dashboard: {
    title: "Dashboard",
    welcome: "Welcome back",
    subtitle: "Here's what's happening with your prompts.",
    statTotal: "Total Prompts",
    statSaved: "Saved Prompts",
    statThisWeek: "This Week",
    newPrompt: "New Prompt",
    recentPrompts: "Recent Prompts",
    viewAll: "View all",
    browseCategories: "Browse Categories",
    empty: "No prompts yet. Create your first one to get started.",
  },
  workspace: {
    title: "Prompt Workspace",
    requestPanel: {
      title: "Your Request",
      placeholder:
        "e.g. I need a marketing plan for my villa maintenance company in Dubai",
      category: "Category",
      categoryPlaceholder: "Select a category (optional)",
      generate: "Generate Prompt",
      generating: "Analyzing...",
      attachImage: "Attach image",
      removeImage: "Remove image",
      imageModeLabel: "How should the image be used?",
      imageModeDescribe: "Describe this image",
      imageModeSimilar: "Generate similar",
      imageCaptionPlaceholder: "Optional caption or extra detail about the image",
    },
    analysisPanel: {
      title: "AI Analysis",
      empty: "Your analysis will appear here once you generate a prompt.",
      goal: "Goal",
      industry: "Industry",
      audience: "Audience",
      platform: "Platform",
      requiredOutput: "Required Output",
      missingInfo: "Missing Information",
    },
    resultPanel: {
      title: "Generated Prompts",
      empty: "Your generated prompts will appear here.",
      professional: "Professional",
      advanced: "Advanced",
      short: "Short",
      recommendedTool: "Recommended AI Tool",
      explanation: "Explanation",
      suggestions: "Improvement Suggestions",
      savePrompt: "Save Prompt",
    },
  },
  history: {
    title: "Prompt History",
    subtitle: "All the prompts you've generated.",
    empty: "No prompts in your history yet.",
    filterCategory: "All Categories",
    search: "Search prompts...",
    openInWorkspace: "Open",
  },
  saved: {
    title: "Saved Prompts",
    subtitle: "Your bookmarked prompts, ready to reuse.",
    empty: "You haven't saved any prompts yet.",
  },
  categories: {
    title: "Categories",
    subtitle: "Browse prompts by category or start a new one.",
    promptCount: "prompts",
    names: {
      MARKETING: "Marketing",
      BUSINESS: "Business",
      CODING: "Coding",
      DESIGN: "Design",
      IMAGE_GENERATION: "Image Generation",
      VIDEO_GENERATION: "Video Generation",
      WRITING: "Writing",
      RESEARCH: "Research",
      AUTOMATION: "Automation",
    },
  },
  settings: {
    title: "Settings",
    subtitle: "Manage your profile, language, and AI provider preferences.",
    profile: {
      title: "Profile",
      fullName: "Full Name",
      email: "Email",
      save: "Save Changes",
    },
    language: {
      title: "Language Preference",
      description: "Choose the language for the Axirova interface.",
    },
    aiProvider: {
      title: "AI Model Selection",
      description: "Choose which engine generates your prompts.",
      requiresKey: "Requires API key",
      active: "Active",
    },
  },
} as const;

type DeepWiden<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepWiden<U>[]
    : T extends object
      ? { -readonly [K in keyof T]: DeepWiden<T[K]> }
      : T;

export default en;
export type Dictionary = DeepWiden<typeof en>;

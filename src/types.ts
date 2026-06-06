export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin';
  topic: string;
  caption: string;
  hashtags: string[];
  visualPrompt: string;
  status: 'draft' | 'scheduled' | 'posted';
  scheduledTime?: string;
  engagement?: {
    likes: number;
    shares: number;
    commentsCount: number;
  };
}

export interface WebPageCopy {
  title: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
}

export interface GeneratedWebsite {
  businessType: string;
  brandName: string;
  slogan: string;
  sitemap: string[];
  copy: {
    hero: {
      title: string;
      subtitle: string;
    };
    about: {
      title: string;
      content: string;
    };
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  pricingTier: {
    tier: 'Basic' | 'Standard' | 'Advanced';
    price: string;
    justification: string;
  };
}

export interface GrowthStrategy {
  campaignName: string;
  targetAudience: string[];
  goals: string;
  steps: string[];
  estimatedBudget: string;
  performanceMetrics: string[];
  viralHooks: string[];
  optimizationTips: string;
}

export interface SimulatedActivity {
  id: string;
  type: 'post' | 'engagement' | 'simulation' | 'system';
  timestamp: string;
  message: string;
  details?: string;
}

export interface SimulatedComment {
  id: string;
  author: string;
  avatar: string;
  platform: 'facebook' | 'instagram' | 'linkedin';
  content: string;
  timestamp: string;
  aiSuggestedReply?: string;
  isReplied: boolean;
  replyContent?: string;
  isProcessingReply?: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Layers,
  Shield,
  Zap,
  Globe,
  MessageSquare,
  Flame,
  TrendingUp,
  Clock,
  Send,
  Plus,
  Compass,
  ArrowRight,
  Database,
  BarChart3,
  Calendar,
  Layers3,
  Monitor,
  CheckCircle2,
  Lock,
  Smartphone,
  Sliders,
  AlertTriangle,
  Play,
  RotateCw,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  ThumbsUp,
  User,
  Cpu,
  Tv,
  Check,
  ChevronDown
} from 'lucide-react';
import ThreeScene from './components/ThreeScene';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  SocialPost,
  GeneratedWebsite,
  GrowthStrategy,
  SimulatedActivity,
  SimulatedComment
} from './types';

export default function App() {
  // Navigation / Shell View state
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');
  const [activeDashboardTab, setActiveDashboardTab] = useState<'overview' | 'social' | 'websites' | 'strategy' | 'settings'>('overview');

  // Business context inputs (global defaults)
  const [brandName, setBrandName] = useState('CyberBrew Coffee');
  const [businessType, setBusinessType] = useState('E-commerce');
  const [businessDesc, setBusinessDesc] = useState('An artisanal dark-roast coffee brand delivering nitro cold brew canisters with biological tech-focused design branding.');

  // Live Simulation state
  const [simulationActive, setSimulationActive] = useState(true);
  const [postsManagedCount, setPostsManagedCount] = useState(1248);
  const [liveEngagementRate, setLiveEngagementRate] = useState(5.82);
  const [followerCount, setFollowerCount] = useState(48290);
  const [liveActivities, setLiveActivities] = useState<SimulatedActivity[]>([
    { id: '1', type: 'system', timestamp: '18:05:00', message: 'OMNIVA Autonomous Engine Initialized.', details: 'All platform cron scheduler links active' },
    { id: '2', type: 'post', timestamp: '18:05:15', message: 'Instagram Post Automatically Published', details: 'Caption: Fuel your biological nodes with CyberBrew Nitro.' },
    { id: '3', type: 'engagement', timestamp: '18:05:19', message: 'Incoming inquiry on LinkedIn auto-analyzed', details: '"Do you ship globally?"' },
    { id: '4', type: 'post', timestamp: '18:05:30', message: 'Scheduled draft optimized for Facebook', details: 'Added hooks for peak weekend crowd CTR' },
  ]);

  // Comment queue for human-in-the-loop auto reply approval
  const [comments, setComments] = useState<SimulatedComment[]>([
    {
      id: 'c1',
      author: 'Alex River',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop',
      platform: 'instagram',
      content: 'I love the packaging! Are the nitrocans fully craft-recyclable organic material?',
      timestamp: '2 mins ago',
      aiSuggestedReply: 'Absolutely! Our nitro cold brew cans are 100% infinitely recyclable aluminum, and our organic labels use soy-based ink. ☕✨ Let us know where we can send your first trial pack!',
      isReplied: false,
      sentiment: 'positive'
    },
    {
      id: 'c4',
      author: 'Marcus Drake',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop',
      platform: 'facebook',
      content: 'My cold brew shipment arrived 4 days late and the nitrogen canister was leaking. Terribly disappointed with the shipper.',
      timestamp: '4 mins ago',
      aiSuggestedReply: 'Marcus, we are incredibly sorry to hear this! Shipping damage is unacceptable. We are dispatching a fresh, triple-sealed replacement package today free of charge, and updating your courier handler immediately. 🚨 Check your DMs so we can grab your order details!',
      isReplied: false,
      sentiment: 'negative'
    },
    {
      id: 'c2',
      author: 'TechLead_Z',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop',
      platform: 'linkedin',
      content: 'Interesting strategy presentation. Could this scale to handle automated multi-lingual support logs for B2B contracts?',
      timestamp: '5 mins ago',
      aiSuggestedReply: 'Indeed! OMNIVA Core automatically translates and adapts localized jargon to maintain enterprise voice consistency. We can schedule a deeper B2B integration demo anytime!',
      isReplied: false,
      sentiment: 'neutral'
    },
    {
      id: 'c3',
      author: 'Maria S.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop',
      platform: 'facebook',
      content: 'Do you offer a discount for bulk orders on corporate workspaces?',
      timestamp: '15 mins ago',
      aiSuggestedReply: 'We certainly do! We offer tailored corporate office discounts starting at 20% off for monthly subscription drops. DMing you our premium options now.',
      isReplied: false,
      sentiment: 'positive'
    }
  ]);

  // Sentiment Prioritization & Comments filter states
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [platformFilter, setPlatformFilter] = useState<'all' | 'facebook' | 'instagram' | 'linkedin'>('all');
  const [sortByUrgency, setSortByUrgency] = useState<boolean>(true);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentPlatform, setNewCommentPlatform] = useState<'facebook' | 'instagram' | 'linkedin'>('instagram');
  const [analyzingNewComment, setAnalyzingNewComment] = useState(false);

  // 7-day Sentiment trend tracking
  const [sentimentHistory, setSentimentHistory] = useState([
    { date: '31 May', positive: 5, neutral: 3, negative: 1 },
    { date: '01 Jun', positive: 7, neutral: 4, negative: 2 },
    { date: '02 Jun', positive: 6, neutral: 5, negative: 1 },
    { date: '03 Jun', positive: 8, neutral: 6, negative: 3 },
    { date: '04 Jun', positive: 11, neutral: 4, negative: 2 },
    { date: '05 Jun', positive: 9, neutral: 8, negative: 4 },
    { date: '06 Jun', positive: 12, neutral: 5, negative: 2 },
  ]);

  // Campaign launch annotations
  const [campaigns, setCampaigns] = useState([
    { id: 'c1', date: '01 Jun', name: 'Summer Blitz Campaign', cost: '$350', reach: '12.4k' },
    { id: 'c2', date: '04 Jun', name: 'Flash Sale: 20% Off Promo', cost: '$600', reach: '24.1k' },
    { id: 'c3', date: '06 Jun', name: 'Premium Loyalty Program Launch', cost: '$1,100', reach: '48.9k' }
  ]);

  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignDate, setNewCampaignDate] = useState('06 Jun');
  const [newCampaignCost, setNewCampaignCost] = useState('$200');
  const [newCampaignReach, setNewCampaignReach] = useState('10k');

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;
    const newCamp = {
      id: `c-${Date.now()}`,
      date: newCampaignDate,
      name: newCampaignName,
      cost: newCampaignCost,
      reach: newCampaignReach
    };
    setCampaigns(prev => [...prev, newCamp]);
    setNewCampaignName('');
  };

  const handleAddSimulatedComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim() || !newCommentAuthor.trim()) return;

    setAnalyzingNewComment(true);
    try {
      const res = await fetch('/api/analyze-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentContent: newCommentContent,
          platform: newCommentPlatform,
          brandIdentity: businessDesc
        })
      });
      const data = await res.json();
      
      const newCommentId = 'c-' + Date.now();
      const newCom: SimulatedComment = {
        id: newCommentId,
        author: newCommentAuthor,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=80&fit=crop`,
        platform: newCommentPlatform,
        content: newCommentContent,
        timestamp: 'Just now',
        aiSuggestedReply: data.reply,
        isReplied: false,
        sentiment: data.sentiment || 'neutral'
      };

      setComments(prev => [newCom, ...prev]);

      // Dynamically increment the current day's counts in sentiment trend visualization
      setSentimentHistory(prev => {
        const copy = [...prev];
        const lastIndex = copy.length - 1;
        if (lastIndex >= 0) {
          const s = data.sentiment || 'neutral';
          if (s === 'positive') copy[lastIndex] = { ...copy[lastIndex], positive: copy[lastIndex].positive + 1 };
          else if (s === 'negative') copy[lastIndex] = { ...copy[lastIndex], negative: copy[lastIndex].negative + 1 };
          else copy[lastIndex] = { ...copy[lastIndex], neutral: copy[lastIndex].neutral + 1 };
        }
        return copy;
      });
      
      // Add a simulation log for this event
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLiveActivities(prev => [
        {
          id: String(Date.now()),
          type: 'engagement',
          timestamp: timeStr,
          message: `Inbound ${newCommentPlatform} comment by ${newCommentAuthor} analyzed: ${(data.sentiment || 'neutral').toUpperCase()}`,
          details: `Suggested response loaded. Priority: ${(data.sentiment || 'neutral') === 'negative' ? 'CRITICAL - IMMEDIATE ACTION REQUIRED' : 'NORMAL'}`
        },
        ...prev
      ]);

      // Reset inputs
      setNewCommentAuthor('');
      setNewCommentContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzingNewComment(false);
    }
  };

  // Filter & sort comments helper
  const getFilteredAndSortedComments = () => {
    return comments
      .filter(com => {
        if (sentimentFilter !== 'all' && com.sentiment !== sentimentFilter) return false;
        if (platformFilter !== 'all' && com.platform !== platformFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (!sortByUrgency) return 0;
        const priorityScore = { negative: 3, neutral: 2, positive: 1 };
        const scoreA = a.sentiment ? priorityScore[a.sentiment] : 2;
        const scoreB = b.sentiment ? priorityScore[b.sentiment] : 2;
        return scoreB - scoreA; // High priority (negative) comments first
      });
  };

  // Social generator states
  const [socialTopic, setSocialTopic] = useState('Unveiling our ultra-caffeine hybrid roast designed for high-stress sprints');
  const [socialPlatform, setSocialPlatform] = useState<'instagram' | 'facebook' | 'linkedin'>('instagram');
  const [socialBrandVoice, setSocialBrandVoice] = useState('Futuristic, highly professional, direct and witty');
  const [socialPostDrafts, setSocialPostDrafts] = useState<SocialPost[]>([
    {
      id: 'p1',
      platform: 'instagram',
      topic: 'Launch Event',
      caption: 'The future of cognitive energy has landed. 🌌 Pre-sales have opened for our Nitro cold brew, formulated for maximum synaptic output without the midday energy tax. Fuel your system with intent.',
      hashtags: ['TechFuel', 'OmnivaActive', 'BioHacking', 'PremiumRoast'],
      visualPrompt: 'A glowing glass canister with neon blue light emitting from within. Standing on a futuristic minimalist workstation.',
      status: 'posted',
      engagement: { likes: 312, shares: 48, commentsCount: 15 }
    },
    {
      id: 'p2',
      platform: 'linkedin',
      topic: 'B2B Office Wellness',
      caption: 'Productivity is not just about raw labor hours—it is about high-fidelity mental focus. We design custom workplace cold brew drops optimized for agile developers and corporate leaders alike.',
      hashtags: ['WorkplacePerformance', 'Leadership', 'B2BCoffee', 'SaaSWorkday'],
      visualPrompt: 'Clean monochrome aesthetic of a software engineer workstation overlooking an administrative skylit city center.',
      status: 'scheduled',
      scheduledTime: 'Tomorrow at 09:00 AM'
    }
  ]);
  const [generatingPost, setGeneratingPost] = useState(false);

  // Website preview states
  const [selectedWebType, setSelectedWebType] = useState('SaaS Landing Page');
  const [customWebBrand, setCustomWebBrand] = useState('NeonGrow SaaS');
  const [extraWebInfo, setExtraWebInfo] = useState('An automated dashboard helping solar farmers forecast grid battery reserves using lightweight IoT algorithms.');
  const [generatedWebsite, setGeneratedWebsite] = useState<GeneratedWebsite | null>({
    businessType: 'SaaS',
    brandName: 'NeonGrow SaaS',
    slogan: 'Scale your grid battery intelligence output at lightspeed.',
    sitemap: ['Dashboard', 'Core Grid API', 'Revenue Modeler', 'Setup Credentials'],
    copy: {
      hero: {
        title: 'Compute Battery Performance and Predict Grid Demand Automatically',
        subtitle: 'Unify solar telemetry into a sleek, real-time control cockpit that secures high arbitrage values.'
      },
      about: {
        title: 'Architecting Clean Grid Horizons',
        content: 'NeonGrow integrates deep telemetry with serverless forecasting models. Our autonomous systems ensure no battery cycle is wasted, giving grid managers persistent power security.'
      },
      features: [
        { title: 'IoT Arbitrage Core', description: 'Automatically charges during peak solar yield and releases to grid.', icon: 'Zap' },
        { title: 'Zero Trust Sovereignty', description: 'Every node operates inside isolated micro-kernels to guarantee grid protection.', icon: 'Shield' },
        { title: 'Predictive Load Curves', description: 'Neural models predict localized cloud blankets 4 hours before they hit.', icon: 'Sparkles' }
      ]
    },
    palette: {
      primary: '#10b981',
      secondary: '#6366f1',
      accent: '#ec4899',
      background: '#090d16'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Inter'
    },
    pricingTier: {
      tier: 'Standard',
      price: '$199/month',
      justification: 'Appropriate standard tier due to real-time integration loops, secure API webhooks, and IoT telemetry storage.'
    }
  });
  const [generatingWebsite, setGeneratingWebsite] = useState(false);

  // Strategy Generator states
  const [strategyMarketGoals, setStrategyMarketGoals] = useState('Gain 5k high-quality organic leads and increase website newsletter signups by 40%');
  const [strategyBudget, setStrategyBudget] = useState('Mid Tier ($500-$1000/mo advertising balance + organic AI scheduling)');
  const [generatedStrategy, setGeneratedStrategy] = useState<GrowthStrategy | null>({
    campaignName: 'Cognitive Synapse Velocity Drive',
    targetAudience: ['Biohackers & high-octane developers', 'Remote product managers', 'B2B technology departments'],
    goals: 'Establish brand authority & convert visual engagement to high-volume recurring subscription crates.',
    steps: [
      'Deploy 10 high-concept 3D dynamic reels demonstrating canister cooling technology with cybernetic backdrops.',
      'Coordinate OMNIVA AI Comment Engine to trace premium fitness and tech sub-reddits, automatically generating personalized witty invitations.',
      'A/B test premium conversion landing pages offering exclusive early access crates with distinct CTA hooks.',
      'Launch targeted LinkedIn leadership thought logs detailing workplace fatigue costs and caffeine bioavailability.'
    ],
    estimatedBudget: '40% targeted Instagram visual reels distribution, 35% productivity newsletter placements, 25% organic AI scaling.',
    performanceMetrics: ['Cost per lead < $4.20', 'Mailing list click-through rate exceeding 6.2%', 'Instagram brand page follower gain +1,500/week'],
    viralHooks: [
      'The morning routine that gives engineers 4 hours of pure uninterrupted focus.',
      'Why standard sugary energy shots are sabotaging your code delivery pipelines.'
    ],
    optimizationTips: 'Inject quick direct-message coupons for every user who remarks with custom words like "ENERGY" on your live posts.'
  });
  const [generatingStrategy, setGeneratingStrategy] = useState(false);

  // Chat section states
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    {
      role: 'model',
      content: "Hello, Commander. I am **OMNIVA AI**, your autonomous brand growth intelligence system. I oversee automated visual post scheduling, client engagement moderation queues, and real-time conversion page construction.\n\n*What would you like me to analyze or execute for your brand today?*"
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Simulated live event triggers for growth simulator (Section 3)
  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      // Periodic counters ticking high-tech
      setPostsManagedCount(prev => prev + 1);
      setFollowerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setLiveEngagementRate(prev => {
        const delta = (Math.random() - 0.48) * 0.04;
        return parseFloat(Math.max(2.5, Math.min(12.0, prev + delta)).toFixed(2));
      });

      // Generate a new simulated automated growth action
      const messages = [
        'Comment auto-moderation replied to @GamerTag99 on Instagram.',
        'Viral opportunity detected: Spiked search for "no-crash caffeine".',
        'Auto-drafted new LinkedIn graphic prompt for next week.',
        'Website structural SEO crawl optimized layout response time with 99.8 score.',
        'Autonomous post scheduled on Facebook for maximum Sunday morning click rates.',
      ];
      const types: Array<'post' | 'engagement' | 'simulation' | 'system'> = ['engagement', 'simulation', 'post', 'system', 'post'];
      const index = Math.floor(Math.random() * messages.length);
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setLiveActivities(prev => [
        {
          id: String(Date.now()),
          type: types[index],
          timestamp: timeStr,
          message: messages[index],
          details: 'Omniva AI auto-pipeline success'
        },
        ...prev.slice(0, 4)
      ]);

    }, 6000);

    return () => clearInterval(interval);
  }, [simulationActive]);

  // Handle human-mediated quick comment replies
  const handleCommentReplySubmit = async (commentId: string, replyValue: string) => {
    // Optimistic state
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, isProcessingReply: true } : c));

    try {
      const response = await fetch('/api/auto-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentContent: comments.find(c => c.id === commentId)?.content,
          platform: comments.find(c => c.id === commentId)?.platform,
          brandIdentity: `${brandName} - ${businessDesc}`
        })
      });
      const data = await response.json();

      setComments(prev => prev.map(c => c.id === commentId ? {
        ...c,
        isReplied: true,
        replyContent: replyValue || data.reply,
        isProcessingReply: false
      } : c));

      // Append log
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      setLiveActivities(prev => [
        {
          id: String(Date.now()),
          type: 'engagement',
          timestamp: timeStr,
          message: `Comment by ${comments.find(c => c.id === commentId)?.author} replied to successfully`,
          details: `Content: "${replyValue || data.reply}"`
        },
        ...prev
      ]);
    } catch (e) {
      console.error(e);
      setComments(prev => prev.map(c => c.id === commentId ? { ...c, isProcessingReply: false } : c));
    }
  };

  // Generate Social Post via API
  const handleGenerateSocialPost = async () => {
    if (!socialTopic) return;
    setGeneratingPost(true);

    try {
      const response = await fetch('/api/generate-social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: socialPlatform,
          topic: socialTopic,
          brandVoice: socialBrandVoice,
          guidelines: `Create amazing engagement, highly localized to our core product: ${brandName} is a ${businessType} described as: ${businessDesc}`
        })
      });

      const data = await response.json();

      const newDraft: SocialPost = {
        id: String(Date.now()),
        platform: socialPlatform,
        topic: socialTopic,
        caption: data.caption,
        hashtags: data.hashtags || [],
        visualPrompt: data.visualPrompt || 'Cyberpunk design template',
        status: 'draft'
      };

      setSocialPostDrafts(prev => [newDraft, ...prev]);

      // Scroll slightly or notify system logs
      const now = new Date();
      setLiveActivities(prev => [
        {
          id: String(Date.now()),
          type: 'post',
          timestamp: now.toLocaleTimeString('en-US', { hour12: false }),
          message: `AI generated custom draft for ${socialPlatform.toUpperCase()}`,
          details: `Topic focus: "${socialTopic}"`
        },
        ...prev
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingPost(false);
    }
  };

  // Generate Website Page Strategy via API
  const handleGenerateWebsite = async () => {
    setGeneratingWebsite(true);
    try {
      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: selectedWebType,
          brandName: customWebBrand,
          extraInfo: extraWebInfo
        })
      });
      const data = await response.json();
      setGeneratedWebsite(data);

      const now = new Date();
      setLiveActivities(prev => [
        {
          id: String(Date.now()),
          type: 'system',
          timestamp: now.toLocaleTimeString('en-US', { hour12: false }),
          message: `Generated custom sitemap mock: ${customWebBrand}`,
          details: `Palette style chosen: ${data?.palette?.primary || '#6366f1'}`
        },
        ...prev
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingWebsite(false);
    }
  };

  // Generate tactical Growth campaign via API
  const handleGenerateStrategy = async () => {
    setGeneratingStrategy(true);
    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessDesc: `${brandName} (${businessType}) - ${businessDesc}`,
          marketGoals: strategyMarketGoals,
          budget: strategyBudget
        })
      });
      const data = await response.json();
      setGeneratedStrategy(data);

      const now = new Date();
      setLiveActivities(prev => [
        {
          id: String(Date.now()),
          type: 'simulation',
          timestamp: now.toLocaleTimeString('en-US', { hour12: false }),
          message: `Growth campaign formulated: ${data.campaignName}`,
          details: `Hooks: "${data.viralHooks?.[0]}"`
        },
        ...prev
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingStrategy(false);
    }
  };

  // Send message on terminal/hud chat
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatMessage;
    if (!textToSend.trim()) return;

    const userEntry = { role: 'user' as const, content: textToSend };
    setChatHistory(prev => [...prev, userEntry]);
    if (!customText) setChatMessage('');
    setChatLoading(true);

    try {
      // Only keep last few messages to handle tokens cleanly
      const sliceHistory = chatHistory.slice(-6);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: sliceHistory
        })
      });

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'model', content: data.text }]);
    } catch (error: any) {
      setChatHistory(prev => [...prev, {
        role: 'model',
        content: `Error connecting to OMNIVA cognitive nodes: ${error.message || 'Server connection timed out'}.`
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* BACKGROUND GRAPHIC INTERFACE (WebGL / Canvas Simulation with inertia) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Abstract futuristic grid system overlays */}
        <div className="absolute inset-0 cyber-grid opacity-[0.25]" />
        
        {/* Vignette ambient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050c] via-transparent to-[#040916]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.12),transparent_70%)]" />

        {/* Dynamic Canvas Core Positioned dynamically */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[50%] h-[70vh] opacity-65 md:opacity-100 transition-opacity duration-1000">
          <ThreeScene />
        </div>
      </div>

      {/* FLOATING HEADER HUD */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 relative group overflow-hidden">
              <span className="font-outfit font-black text-white text-base tracking-tighter absolute group-hover:scale-110 transition-transform duration-300">Ω</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-outfit font-black tracking-tight text-white text-lg">OMNIVA</span>
                <span className="text-[9px] tracking-widest font-mono bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20">AI</span>
              </div>
              <p className="text-[10px] text-gray-400/80 font-mono tracking-sans">AUTONOMOUS GROWTH NODE</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/5">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeView === 'landing'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              🚀 Landing Experience
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1 ${
                activeView === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              📊 OMNIVA Dashboard
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Quick Live Mode Indicators */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-gray-300">ENGAGEMENT ENGINE: <b className="text-emerald-400">ACTIVE</b></span>
            </div>

            <button
              onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
              className="relative overflow-hidden cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 border border-white/10 active:scale-95"
            >
              {activeView === 'landing' ? 'Enter Command Console' : 'View Landing Frontpage'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT BODY */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* LANDING VIEW ROUTE */}
        {activeView === 'landing' && (
          <div className="space-y-24 pb-20">
            
            {/* SECTION 1: HERO CONTAINER WITH OVERLAYS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 md:pt-16 min-h-[75vh]">
              <div className="lg:col-span-7 space-y-6 text-left relative z-20">
                
                {/* Meta alert */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  <span>OMNIVA AI BRAND ACCELERATOR v1.4</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-outfit font-black tracking-tight text-white leading-[1.05]">
                  Your Autonomous <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-emerald-400">
                    Marketing Universe
                  </span>
                </h1>

                <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
                  Meet OMNIVA AI — a fully autonomous digital growth agent. 
                  It manages your entire social architecture, auto-moderates traffic comments, publishes optimized campaigns, and designs instant conversion pages. No marketing templates. No manual scheduling. Just unstoppable scale.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="cursor-pointer bg-white text-[#030712] hover:bg-gray-100 font-bold px-6 py-3.5 rounded-xl shadow-xl transition-all text-sm flex items-center justify-center gap-2"
                  >
                    🚀 Enter Enterprise Dashboard
                  </button>
                  <a
                    href="#simulation-panel"
                    className="border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-405" />
                    Watch Autonomous Demo
                  </a>
                </div>

                {/* Live simulation real ticker stats widget */}
                <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-4 max-w-xl">
                  <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-[10px] text-gray-500 font-mono">POSTS DEPLOYED</p>
                    <p className="text-xl font-bold font-display text-white mt-1">
                      {postsManagedCount.toLocaleString()}
                    </p>
                    <span className="text-[9px] text-indigo-400 font-mono">100% Autonomous</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-[10px] text-gray-500 font-mono">AVG ENGAGEMENT</p>
                    <p className="text-xl font-bold font-display text-emerald-400 mt-1">
                      {liveEngagementRate}%
                    </p>
                    <span className="text-[9px] text-emerald-400 font-mono">▲ Auto-Optimized</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-[10px] text-gray-500 font-mono">NET ESCROW LEADS</p>
                    <p className="text-xl font-bold font-display text-pink-400 mt-1">
                      {followerCount.toLocaleString()}
                    </p>
                    <span className="text-[9px] text-pink-400 font-mono">🔥 +12 / Hour</span>
                  </div>
                </div>
              </div>

              {/* Orbital hologram metadata label overlapping canvas scene */}
              <div className="hidden lg:block lg:col-span-5 relative h-full">
                <div className="absolute right-0 top-12 glass-panel p-4 rounded-xl border border-white/10 max-w-[240px] shadow-2xl space-y-2 animate-bounce-slow">
                  <div className="flex justify-between items-center text-[10px] font-mono text-indigo-400">
                    <span>COGNITIVE CORE STATE:</span>
                    <span className="text-emerald-400">98.2% LOAD</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">OMNIVA Live Feed telemetry</h4>
                  <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                    Analyzing market trends and drafting LinkedIn thought logs...
                  </p>
                  <div className="pt-2 border-t border-white/5 flex gap-1.5">
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">SCHEDULER RUNNING</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 font-mono">AUTO RESPONSE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: "WHAT IT DOES" */}
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">PRODUCT PILLARS</span>
                <h2 className="text-3xl sm:text-4xl font-outfit font-black tracking-tight">
                  One Digital Brain. Zero Overhead.
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  OMNIVA consolidates the complete functionality of an in-house marketing coordinator, graphic designer, and web developer into a sleek autonomous system.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* CARD 1 */}
                <div className="glass-panel p-6 rounded-2xl glass-panel-hover transition-all duration-300 relative overflow-hidden group space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Autonomous Social Engine
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Auto-generates high-converting visual posts for Instagram, Facebook, and LinkedIn. Reviews timelines, tracks trending viral hashtags, and moderates comment replies instantly.
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span>INCLUDES INSTANT FB & LN</span>
                    <span className="text-indigo-400">99.4% engagement match</span>
                  </div>
                </div>

                {/* CARD 2 */}
                <div className="glass-panel p-6 rounded-2xl glass-panel-hover transition-all duration-300 relative overflow-hidden group space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                    AI Website Synthesis
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Transforms raw business input into dynamic responsive landing pages. Formulates tailored hero titles, complete sitemaps, structured layouts, customized color palettes, and pricing tiers.
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span>COMPLETE WEB COPYWRITING</span>
                    <span className="text-pink-400">Tailwind css ready</span>
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="glass-panel p-6 rounded-2xl glass-panel-hover transition-all duration-300 relative overflow-hidden group space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Growth Intelligence Strategy
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Analyzes target demographics, allocates organic budgets, constructs step-by-step campaigns, and formulates precise engagement hacks to boost click-through speeds.
                  </p>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span>VIRAL REELS HOOK MATH</span>
                    <span className="text-emerald-400">D3 graph diagnostics</span>
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 3: LIVE SIMULATION PANEL */}
            <div id="simulation-panel" className="space-y-8 scroll-mt-24">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-widest text-[#ec4899] uppercase">CYBERNETIC COCKPIT</span>
                  <h2 className="text-3xl font-outfit font-black tracking-tight text-white">
                    Live Marketing Simulation
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm max-w-xl">
                    Observe OMNIVA actively managing social pipeline triggers. Switch auto-generation on or test the direct moderator comments simulation below.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10">
                  <span className="text-xs font-mono px-2 text-gray-400">SYSTEM ENGINE</span>
                  <button
                    onClick={() => setSimulationActive(!simulationActive)}
                    className={`cursor-pointer px-3 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all ${
                      simulationActive 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {simulationActive ? '● SIMULATION RUNNING' : '■ SIMULATION PAUSED'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT: LIVE LOG FEED (High aesthetic science cockpit) */}
                <div className="lg:col-span-4 glass-panel rounded-2xl p-5 flex flex-col justify-between h-[420px] relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-mono tracking-wider font-semibold">COGNITIVE TELEMETRY</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    </div>

                    <div className="space-y-3 font-mono text-[10px] leading-relaxed max-h-[300px] overflow-y-auto">
                      {liveActivities.map((act) => (
                        <div key={act.id} className="p-2.5 rounded bg-black/40 border border-white/5 space-y-1">
                          <div className="flex justify-between items-center text-[9px] text-gray-400">
                            <span className="text-indigo-400">[{act.type.toUpperCase()}]</span>
                            <span>{act.timestamp}</span>
                          </div>
                          <p className="text-slate-200 font-semibold">{act.message}</p>
                          {act.details && <p className="text-gray-500 text-[9px]">{act.details}</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[9px] font-mono text-gray-500 flex justify-between items-center">
                    <span>SYS_CORE: STABLE</span>
                    <span>QUEUE REFRESH: OK</span>
                  </div>
                </div>

                {/* MIDDLE & RIGHT: MODERATION PIPELINE & BRAND INPUT SUMMARY */}
                <div className="lg:col-span-8 glass-panel rounded-2xl p-6 lg:min-h-[480px] h-auto flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-pink-400" />
                          Incoming Comments Moderation Pipeline <span className="text-[10px] font-mono font-normal text-pink-300">(Human-In-The-Loop Approval)</span>
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Click "Approve AI suggested reply" to immediately simulated broadcast reply.</p>
                      </div>
                    </div>

                    {/* Sentiment Prioritization Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-white/5 text-xs">
                      {/* Sentiment & Platform Filters */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">SENTIMENT:</span>
                          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                            {(['all', 'positive', 'neutral', 'negative'] as const).map((filter) => {
                              const activeClass = 
                                sentimentFilter === filter 
                                  ? filter === 'all' ? 'bg-white/10 text-white font-bold border border-white/15' :
                                    filter === 'positive' ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30' :
                                    filter === 'neutral' ? 'bg-slate-500/15 text-slate-200 font-bold border border-slate-500/30' :
                                    'bg-rose-500/15 text-rose-400 font-bold border border-rose-500/30'
                                  : 'bg-transparent text-gray-500 hover:text-gray-300 border border-transparent';

                              return (
                                <button
                                  key={filter}
                                  onClick={() => setSentimentFilter(filter)}
                                  className={`cursor-pointer px-2 py-0.5 rounded text-[9px] font-mono font-medium uppercase tracking-wider transition-all ${activeClass}`}
                                >
                                  {filter}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">PLATFORM:</span>
                          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                            {(['all', 'facebook', 'instagram', 'linkedin'] as const).map((filter) => {
                              const activeClass = 
                                platformFilter === filter 
                                  ? 'bg-indigo-600 text-white font-bold border border-indigo-500/30 text-indigo-100'
                                  : 'bg-transparent text-gray-500 hover:text-gray-300 border border-transparent';

                              return (
                                <button
                                  key={filter}
                                  onClick={() => setPlatformFilter(filter)}
                                  className={`cursor-pointer px-2 py-0.5 rounded text-[9px] font-mono font-medium uppercase tracking-wider transition-all ${activeClass}`}
                                >
                                  {filter}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {(sentimentFilter !== 'all' || platformFilter !== 'all') && (
                          <button
                            onClick={() => {
                              setSentimentFilter('all');
                              setPlatformFilter('all');
                            }}
                            className="cursor-pointer text-[9px] bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 px-2 py-0.5 rounded font-mono uppercase transition-all"
                          >
                            ✕ Clear Filters
                          </button>
                        )}
                      </div>

                      {/* Sorting Priority */}
                      <button
                        onClick={() => setSortByUrgency(!sortByUrgency)}
                        className={`cursor-pointer px-2.5 py-1 rounded-lg border text-[9px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          sortByUrgency
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 font-bold shadow-sm shadow-amber-500/5'
                            : 'bg-black/40 border-white/5 text-gray-400'
                        }`}
                        title="When active, negative-sentiment comments automatically bubble up to the top."
                      >
                        <Shield className={`w-3 h-3 ${sortByUrgency ? 'animate-pulse' : ''}`} />
                        {sortByUrgency ? 'PRIORITIZE URGENT: ON' : 'PRIORITIZE URGENT: OFF'}
                      </button>
                    </div>

                    {/* Comments list container */}
                    <div className="space-y-4 pt-4 max-h-[340px] overflow-y-auto pr-1">
                      {getFilteredAndSortedComments().length === 0 ? (
                        <div className="py-12 text-center text-gray-500 text-xs font-mono">
                          No comment matching sentiment Filter loaded in queue.
                        </div>
                      ) : (
                        getFilteredAndSortedComments().map((com) => (
                          <div key={com.id} className="p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden group">
                            {com.isReplied && (
                              <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 animate-fade-in">
                                <Check className="w-3 h-3" /> SENT TO {com.platform.toUpperCase()}
                              </div>
                            )}

                            <div className="flex gap-3">
                              <img src={com.avatar} alt={com.author} className="w-8 h-8 rounded-full border border-white/10" />
                              <div className="space-y-2 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs font-semibold text-white">{com.author}</span>
                                  <span className="text-[9px] text-gray-500">{com.timestamp}</span>
                                  <span className={`text-[8px] font-mono uppercase bg-indigo-500/10 px-1 py-0.5 rounded border border-indigo-500/20 text-indigo-300`}>
                                    {com.platform}
                                  </span>

                                  {/* Sentiment Analysis Visual Indicators next to comments */}
                                  {com.sentiment === 'positive' && (
                                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                      😊 Positive
                                    </span>
                                  )}
                                  {com.sentiment === 'neutral' && (
                                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-500/10 border border-slate-500/20 text-slate-300 font-semibold flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                      😐 Neutral
                                    </span>
                                  )}
                                  {com.sentiment === 'negative' && (
                                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold flex items-center gap-1 animate-pulse">
                                      <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                                      </span>
                                      🚨 Negative / Urgent
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-300">"{com.content}"</p>

                                {/* AI response box */}
                                <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/15 text-[11px] space-y-1">
                                  <div className="text-[9px] font-mono text-indigo-400 font-semibold flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> OMNIVA SUGGESTED REPLY:
                                  </div>
                                  {com.isReplied ? (
                                    <p className="italic text-emerald-400">"{com.replyContent}"</p>
                                  ) : (
                                    <p className="text-slate-300">"{com.aiSuggestedReply}"</p>
                                  )}
                                </div>

                                {/* Actions */}
                                {!com.isReplied && (
                                  <div className="flex justify-end gap-2 pt-1">
                                    <button
                                      onClick={() => handleCommentReplySubmit(com.id, com.aiSuggestedReply || '')}
                                      disabled={com.isProcessingReply}
                                      className="cursor-pointer text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                      {com.isProcessingReply ? (
                                        <>
                                          <RotateCw className="w-3 h-3 animate-spin" />
                                          Deploying Reply...
                                        </>
                                      ) : (
                                        <>
                                          <CheckCircle2 className="w-3 h-3" />
                                          Approve AI Reply
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Interactive Customer Comment Injector */}
                    <div className="mt-5 p-4 rounded-xl bg-black/55 border border-white/5 space-y-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-400 uppercase font-mono tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Simulate Real-time Customer Feedback
                      </div>
                      <p className="text-[10px] text-gray-400">
                        Type a custom comment below to test OMNIVA AI's real-time sentiment extraction and suggested reply generations.
                      </p>
                      <form onSubmit={handleAddSimulatedComment} className="space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                          <div className="sm:col-span-5">
                            <input
                              type="text"
                              required
                              placeholder="Customer Name (e.g., Emily W.)"
                              value={newCommentAuthor}
                              onChange={(e) => setNewCommentAuthor(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div className="sm:col-span-4">
                            <select
                              value={newCommentPlatform}
                              onChange={(e) => setNewCommentPlatform(e.target.value as any)}
                              className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                            >
                              <option value="instagram">Instagram DM</option>
                              <option value="facebook">Facebook Comment</option>
                              <option value="linkedin">LinkedIn Message</option>
                            </select>
                          </div>
                          <div className="sm:col-span-3">
                            <button
                              type="submit"
                              disabled={analyzingNewComment}
                              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              {analyzingNewComment ? (
                                <>
                                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                                  Classifying...
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  Simulate Feed
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Type client feedback (e.g., 'Do you ship to Berlin?' or 'My parcel was leaky, extremely disappointed!')"
                            value={newCommentContent}
                            onChange={(e) => setNewCommentContent(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-500 text-center font-mono pt-2 border-t border-white/5">
                    Live database tracking comments at scale &bull; Secure OAuth token valid
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 4: HOW THE AI THINKS */}
            <div className="space-y-8 text-center">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">OMNIVA BRAIN FLOW</span>
                <h2 className="text-3xl font-outfit font-black tracking-tight text-white">How the AI Autonomous System Thinks</h2>
                <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
                  A closed-loop diagnostic framework that perpetually ingests, publishes, validates, and refines market conversion numbers.
                </p>
              </div>

              {/* interactive step flow */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 text-left">
                {[
                  { step: '01', title: 'Business Input', desc: 'Ingests your target brand profile, sector voice metadata, & pricing tiers.', color: 'border-indigo-500/20' },
                  { step: '02', title: 'AI Analysis', desc: 'Gemini flash builds customized micro sitemaps and competitive indexes.', color: 'border-purple-500/20' },
                  { step: '03', title: 'Content creation', desc: 'Crafts visual design instructions and witty hooks for multi-network channels.', color: 'border-pink-500/20' },
                  { step: '04', title: 'Autonomous schedule', desc: 'Posts drafts automatically during user-configured peak CTR hours.', color: 'border-emerald-500/20' },
                  { step: '05', title: 'Audience chat replies', desc: 'Responds instantly to client remarks via human-governed CRM tools.', color: 'border-yellow-500/20' },
                  { step: '06', title: 'Loop Optimization', desc: 'Re-evaluates diagnostic conversion data to scale viral output budgets.', color: 'border-sky-500/20' }
                ].map((item, idx) => (
                  <div key={idx} className={`glass-panel p-4 rounded-xl border ${item.color} relative group hover:-translate-y-1 transition-all duration-300`}>
                    <div className="text-xs font-mono font-semibold text-gray-400/60 pb-2 border-b border-white/5 flex justify-between items-center">
                      <span>STEP {item.step}</span>
                      <ChevronRight className="w-3 h-3 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h4 className="text-sm font-bold text-white mt-3">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-1 lines-clamp-3 leading-relaxed">{item.desc}</p>
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-xl bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: WEBSITE BUILDER PREVIEW */}
            <div className="space-y-8">
              <div className="text-left space-y-2">
                <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">ONE-CLICK DIGITAL INFRASTRUCTURE</span>
                <h2 className="text-3xl font-outfit font-black tracking-tight text-white">Instant Website Generation</h2>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
                  Type any business concept. OMNIVA AI compiles complete conversion copy, layout directions, custom color palettes, pricing structures, and standard Lucide asset layouts.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* LEFT CONFIGURATION PANEL (Website generator triggers) */}
                <div className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-400" />
                      Configure Website Specifications
                    </h3>

                    <div className="space-y-3 pt-2 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-gray-400 font-semibold font-mono">1. BRAND NAME</label>
                        <input
                          type="text"
                          value={customWebBrand}
                          onChange={(e) => setCustomWebBrand(e.target.value)}
                          placeholder="e.g. Acme Solar"
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-gray-400 font-semibold font-mono">2. BUSINESS TYPE</label>
                        <select
                          value={selectedWebType}
                          onChange={(e) => setSelectedWebType(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono cursor-pointer"
                        >
                          <option value="SaaS Landing Page">SaaS Landing Page</option>
                          <option value="Artisanal Cafe">Artisanal Cafe</option>
                          <option value="Solar Grid Energy IoT">Solar Grid Energy IoT</option>
                          <option value="E-commerce Fashion Brand">E-commerce Fashion Brand</option>
                          <option value="Fitness Training Studio">Fitness Training Studio</option>
                          <option value="Premium Creative Agency">Premium Creative Agency</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-gray-400 font-semibold font-mono">3. SPECIFIC CONTEXT / DETAILS</label>
                        <textarea
                          rows={3}
                          value={extraWebInfo}
                          onChange={(e) => setExtraWebInfo(e.target.value)}
                          placeholder="e.g. premium pricing, targeting remote devs..."
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono leading-relaxed resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateWebsite}
                    disabled={generatingWebsite}
                    className="cursor-pointer w-full bg-emerald-500 hover:bg-emerald-600 text-[#030712] font-black py-3 rounded-xl transition-colors text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    {generatingWebsite ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        OMNIVA COGNITIVE PIPELINE ACTIVE...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate My Custom Website Preview
                      </>
                    )}
                  </button>
                </div>

                {/* RIGHT SCREEN PREVIEW PANEL (Interactive web rendering based on state) */}
                <div className="lg:col-span-8 glass-panel rounded-2xl flex flex-col overflow-hidden relative min-h-[400px]">
                  
                  {/* Hologram device header frame */}
                  <div className="bg-black/60 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/75" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/75" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/75" />
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono pl-3">OMNIVA RE-RENDER SYSTEM ENGINE</span>
                    </div>

                    {generatedWebsite && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          MONETIZATION TIER: {generatedWebsite.pricingTier.tier} ({generatedWebsite.pricingTier.price})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* HTML Content Preview Area */}
                  {generatedWebsite ? (
                    <div
                      className="p-6 overflow-y-auto max-h-[460px] space-y-8 flex-1 text-left select-text"
                      style={{
                        backgroundColor: generatedWebsite.palette?.background || '#090d16',
                        fontFamily: generatedWebsite.typography?.bodyFont || 'sans-serif'
                      }}
                    >
                      {/* SITE TOP NAV MINI */}
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <span className="text-sm font-bold text-white tracking-tight" style={{ color: generatedWebsite.palette?.accent || '#ec4899' }}>
                          {generatedWebsite.brandName || 'Acme brand'}
                        </span>
                        <div className="flex gap-3 text-[11px] text-gray-400">
                          {generatedWebsite.sitemap?.map((link, i) => (
                            <span key={i} className="hover:text-white transition-colors">{link}</span>
                          ))}
                        </div>
                      </div>

                      {/* HERO BLOCK */}
                      <div className="space-y-4 py-6 text-center">
                        <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400">
                          {generatedWebsite.slogan || 'Elevate your system'}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 max-w-2xl mx-auto leading-tight" style={{ fontFamily: generatedWebsite.typography?.headingFont || 'serif' }}>
                          {generatedWebsite.copy?.hero?.title || 'Launch with extreme efficiency.'}
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
                          {generatedWebsite.copy?.hero?.subtitle || 'Connecting autonomous logic with clean visual designs.'}
                        </p>
                        <div className="pt-2 flex justify-center gap-3">
                          <button
                            className="px-4 py-2 rounded text-xs font-bold text-black"
                            style={{ backgroundColor: generatedWebsite.palette?.primary || '#10b981' }}
                          >
                            Explore Crate
                          </button>
                          <button className="px-4 py-2 rounded text-xs font-bold border border-white/10 text-white bg-white/5">
                            Read Specifications
                          </button>
                        </div>
                      </div>

                      {/* FEATURES GRID */}
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">ENGINE KEY UTILITIES</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {generatedWebsite.copy?.features?.map((feat, i) => (
                            <div key={i} className="p-4 rounded bg-white/3 border border-white/5 space-y-2 text-left">
                              <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
                                {feat.icon === 'Zap' ? <Zap className="w-4 h-4" /> : feat.icon === 'Shield' ? <Shield className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                              </div>
                              <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                              <p className="text-[10px] text-gray-400 leading-relaxed">{feat.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* PRICING TIER JUSTIFICATION D3 CHIP */}
                      <div className="p-4 rounded-xl text-xs space-y-2 border border-dashed" style={{ borderColor: generatedWebsite.palette?.primary || '#10b981', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                        <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase block">OMNIVA CORE RECOMMENDATION MAPPING</span>
                        <h4 className="font-bold text-white">Tier Evaluation strategy:</h4>
                        <p className="text-gray-400 text-[11px] leading-relaxed">
                          {generatedWebsite.pricingTier?.justification || 'Standard pricing model based on cloud infrastructure resource parameters.'}
                        </p>
                      </div>

                      {/* SYSTEM FOOTER */}
                      <p className="text-center text-[9px] text-gray-600 font-mono mt-8">
                        &copy; 2026 {generatedWebsite.brandName}. Formulated dynamically via OMNIVA digital worker.
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                      <Globe className="w-10 h-10 text-emerald-400 animate-spin" />
                      <h4 className="text-sm font-bold text-slate-300">Ready to synthesize new web architecture</h4>
                      <p className="text-xs text-gray-500 max-w-sm">Use the left input panel to specify brand features and trigger the high-fidelity generation algorithms.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* SECTION 6: PRICING GLASS CARDS */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-mono tracking-widest text-[#ec4899] uppercase">TRANSPARENT ACCOUNT SCALES</span>
                <h2 className="text-3xl font-outfit font-black tracking-tight text-white">Monetization Subscription Plans</h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Whether you are launching an initial prototype or governing thousands of distributed e-commerce nodes, OMNIVA matches your required computational overhead.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* PLAN 1 */}
                <div className="glass-panel p-6 rounded-2xl relative hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">STARTER NODE</span>
                    <h3 className="text-xl font-bold text-white">Basic Plan</h3>
                    
                    <div className="flex items-baseline gap-1 pt-2">
                      <span className="text-3xl font-black font-display text-white">$29</span>
                      <span className="text-xs text-gray-500">/ month</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Perfect for early freelancing projects and local shops looking to automate basic daily posting structures.
                    </p>

                    <div className="h-px bg-white/5 pt-2" />

                    <ul className="space-y-3.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">✓ 1 Core Social Platform (Instagram)</li>
                      <li className="flex items-center gap-2">✓ Automated Draft Scheduling</li>
                      <li className="flex items-center gap-2">✓ Basic Analytics diagnostics</li>
                      <li className="flex items-center gap-2 text-gray-500">✗ Automated comment moderation</li>
                      <li className="flex items-center gap-2 text-gray-500">✗ Custom website synthesis helper</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="cursor-pointer mt-8 w-full border border-white/10 bg-white/3 hover:bg-white/8 text-white rounded-xl py-3 text-xs font-bold transition-all text-center"
                  >
                    Select Basic Platform Node
                  </button>
                </div>

                {/* PLAN 2 */}
                <div className="glass-panel p-6 rounded-2xl relative border-indigo-500/40 hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Glowing popular sign */}
                  <div className="absolute top-0 right-0 bg-[#818cf8] text-[#030712] text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-bl-xl font-mono">
                    RECOMMENDED AI TIER
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#818cf8] uppercase">GROWTH FLUIDITY</span>
                    <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                    
                    <div className="flex items-baseline gap-1 pt-2">
                      <span className="text-3xl font-black font-display text-white">$199</span>
                      <span className="text-xs text-gray-500">/ month</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Tailored for quick-scaling SaaS startups, restaurant chains, and gyms requiring multi-platform visual posting.
                    </p>

                    <div className="h-px bg-white/5 pt-2" />

                    <ul className="space-y-3.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2 text-[#818cf8]">✓ 3 Core Social Platforms (FB, IG, LinkedIn)</li>
                      <li className="flex items-center gap-2">✓ Advanced Comment AI auto-replies</li>
                      <li className="flex items-center gap-2">✓ Automated high-fidelity Website Synthesis</li>
                      <li className="flex items-center gap-2">✓ Active demographic diagnostic tips</li>
                      <li className="flex items-center gap-2">✓ API Webhook scheduler links</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="cursor-pointer mt-8 w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl py-3 text-xs font-bold transition-all text-center shadow-lg hover:brightness-110 shadow-indigo-505"
                  >
                    Launch Pro Workspace Crate
                  </button>
                </div>

                {/* PLAN 3 */}
                <div className="glass-panel p-6 rounded-2xl relative hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono tracking-widest text-pink-500 uppercase">INFINITE FLOW</span>
                    <h3 className="text-xl font-bold text-white">Enterprise Plan</h3>
                    
                    <div className="flex items-baseline gap-1 pt-2">
                      <span className="text-3xl font-black font-display text-white">$999</span>
                      <span className="text-xs text-gray-500">/ month</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Custom brand model fine-tuning with priority server resources to secure unstoppable compound conversion velocity.
                    </p>

                    <div className="h-px bg-white/5 pt-2" />

                    <ul className="space-y-3.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">✓ Unlimited Multi-Network Integrations</li>
                      <li className="flex items-center gap-2 text-pink-400">✓ Fully autonomous SLA moderation</li>
                      <li className="flex items-center gap-2">✓ Unlimited dynamic web variations</li>
                      <li className="flex items-center gap-2">✓ Dedicated OMNIVA agent instance tuning</li>
                      <li className="flex items-center gap-2">✓ Full developer cloud webhook channels</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="cursor-pointer mt-8 w-full border border-white/10 bg-white/3 hover:bg-white/8 text-white rounded-xl py-3 text-xs font-bold transition-all text-center"
                  >
                    Establish Enterprise Pact
                  </button>
                </div>

              </div>
            </div>

            {/* SECTION 7: AI CHAT CONTROL PANEL */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden" id="chat-control">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none w-[300px] h-[300px] bg-indigo-500 rounded-full blur-[120px]" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Description */}
                <div className="lg:col-span-4 space-y-4 text-left">
                  <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">COMMAND CONSOLE CORE</span>
                  <h3 className="text-2xl font-outfit font-black tracking-tight text-white">
                    What do you want to grow today?
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Type messages directly to OMNIVA's cognitive central model. Demand strategy flowcharts, content captions, campaign pitches, or website structural blueprints in real-time.
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">QUICK SYSTEM INSTRUCTIONS:</span>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <button
                        onClick={() => handleSendMessage("Create a fast LinkedIn content schedule about sustainable logistics")}
                        className="cursor-pointer bg-white/3 hover:bg-white/8 px-2.5 py-1 rounded border border-white/10 text-slate-300 transition-colors"
                      >
                        📬 LinkedIn schedule suggestion
                      </button>
                      <button
                        onClick={() => handleSendMessage("Draft a launch viral hook formula for organic nitro tea")}
                        className="cursor-pointer bg-white/3 hover:bg-white/8 px-2.5 py-1 rounded border border-white/10 text-slate-300 transition-colors"
                      >
                        🔥 Nitro tea hook formulas
                      </button>
                      <button
                        onClick={() => handleSendMessage("How should a localized bakery justify a Standard $149 pricing tier?")}
                        className="cursor-pointer bg-white/3 hover:bg-white/8 px-2.5 py-1 rounded border border-white/10 text-slate-300 transition-colors"
                      >
                        📈 Tier justification logic
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated/Active Chat Panel Frame */}
                <div className="lg:col-span-8 glass-panel rounded-2xl flex flex-col h-[380px] overflow-hidden">
                  {/* Chat top header */}
                  <div className="bg-black/60 px-4 py-2 border-b border-white/5 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-indigo-400">⚡ OMNIVA CONSCIENCE LOG TERMINAL</span>
                    <span className="text-gray-500">SECURE API CALLS LIVE</span>
                  </div>

                  {/* Message feed */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin text-xs text-left">
                    {chatHistory.map((h, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl max-w-[85%] ${
                          h.role === 'user'
                            ? 'bg-indigo-600 text-white ml-auto'
                            : 'bg-black/40 text-slate-200 border border-white/5'
                        }`}
                      >
                        <p className="font-semibold text-[10px] opacity-75 pb-1 font-mono">
                          {h.role === 'user' ? 'COMMANDER' : 'OMNIVA AI CORE Agent'}
                        </p>
                        <div className="leading-relaxed whitespace-pre-line prose prose-invert select-text">
                          {h.content}
                        </div>
                      </div>
                    ))}

                    {chatLoading && (
                      <div className="bg-black/40 text-indigo-400 border border-white/5 p-3 rounded-xl max-w-[40%] flex items-center gap-2">
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        <span className="font-mono text-[10px]">COGNITIVELY COMPUTING RESPONSE...</span>
                      </div>
                    )}
                  </div>

                  {/* Chat input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="border-t border-white/5 p-3 flex gap-2 bg-black/40"
                  >
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Instruct the autonomous agent..."
                      className="flex-1 px-4 py-2 bg-black/60 rounded-xl border border-white/10 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-slate-200"
                    />
                    <button
                      type="submit"
                      disabled={chatLoading}
                      className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* WORKSPACE OPERATIONS DASHBOARD (After Toggle) */}
        {activeView === 'dashboard' && (
          <div className="space-y-8 pb-20">
            
            {/* Dashboard top overview banner */}
            <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono text-[9px] border border-indigo-500/20">AGENT CONNECTED</span>
                  <span className="w-2 h-2 rounded bg-emerald-400 animate-ping" />
                </div>
                <h1 className="text-2xl font-outfit font-black tracking-tight text-white">Brand Operations Control Desk</h1>
                <p className="text-gray-400 text-xs font-mono">Governing active target brand: <b className="text-slate-200">{brandName}</b> ({businessType})</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView('landing')}
                  className="cursor-pointer text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  ◀ Exit Command Area
                </button>
                <div className="h-6 w-px bg-white/15" />
                <button
                  onClick={() => {
                    const name = prompt("Target Business Brand Name:", brandName);
                    if (name) setBrandName(name);
                    const desc = prompt("What is the business niche/core service:", businessDesc);
                    if (desc) setBusinessDesc(desc);
                  }}
                  className="cursor-pointer text-xs font-bold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 transition-colors"
                >
                  ✎ Edit Brand Voice Voice
                </button>
              </div>
            </div>

            {/* Layout structure split sidebar + operational block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Sidebar Tabs */}
              <div className="lg:col-span-3 space-y-1.5 bg-black/40 p-4 rounded-2xl border border-white/5">
                <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase px-3 block pb-2">MANAGEMENT DESKS</span>
                
                {[
                  { id: 'overview', title: 'Tactical Overview', icon: Monitor },
                  { id: 'social', title: 'Social Generator & queue', icon: Calendar },
                  { id: 'websites', title: 'Instant Website preview', icon: Globe },
                  { id: 'strategy', title: 'Growth Campaigns Strategy', icon: Sliders },
                  { id: 'settings', title: 'System Secrets & keys', icon: Shield }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveDashboardTab(item.id as any)}
                      className={`cursor-pointer w-full text-left font-semibold text-xs tracking-wide px-3 py-2.5 rounded-lg flex items-center gap-2.5 transition-all ${
                        activeDashboardTab === item.id 
                          ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow' 
                          : 'text-gray-400 hover:text-white hover:bg-white/3'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </button>
                  );
                })}

                <div className="pt-6 border-t border-white/5 mt-4 text-[10px] font-mono text-gray-500 space-y-1">
                  <p>CORE VER: OMNIVA_NODE_OK</p>
                  <p>DEMOGRAPHIC REVENUE: SECURE</p>
                </div>
              </div>

              {/* ACTIVE TAB OPERATIONAL VIEW */}
              <div className="lg:col-span-9 glass-panel rounded-2xl p-6 min-h-[500px]">
                
                {/* 1. TACTICAL OVERVIEW */}
                {activeDashboardTab === 'overview' && (
                  <div className="space-y-6 text-left">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-indigo-400" />
                      Tactical Growth telemetry dashboard
                    </h2>

                    {/* Stats strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">AUTONOMOUS CONVERSION LEADS</span>
                        <h3 className="text-2xl font-black text-white font-display">
                          {followerCount.toLocaleString()}
                        </h3>
                        <p className="text-[9px] text-emerald-400 flex items-center gap-1">
                          ▲ +1.4% since last session
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">ACTIVE POSTS DISPATCHED</span>
                        <h3 className="text-2xl font-black text-white font-display">
                          {postsManagedCount.toLocaleString()}
                        </h3>
                        <p className="text-[9px] text-indigo-400 flex items-center gap-1">
                          ▲ All cron hook schedules OK
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">SIMULATED CTR VELOCITY</span>
                        <h3 className="text-2xl font-black text-white font-display">
                          {liveEngagementRate}%
                        </h3>
                        <p className="text-[9px] text-pink-400 flex items-center gap-1">
                          🔥 Peak activity algorithm locked
                        </p>
                      </div>
                    </div>

                    {/* Current Brand Context card */}
                    <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
                      <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase">ACTIVE COGNITIVE FOCUS MATRIX</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold font-mono">BUSINESS INSTANCE NAME:</p>
                          <p className="text-sm font-bold text-white">{brandName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold font-mono">CLASSIFIED CATEGORY NICHE:</p>
                          <p className="text-sm font-bold text-white">{businessType}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-semibold font-mono">SYNTACTIC BRAND VALUE STATEMENT:</p>
                        <p className="text-xs text-gray-300 leading-relaxed mt-0.5">{businessDesc}</p>
                      </div>
                    </div>

                    {/* Line Chart showing Sentiment Trend over 7 days */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                            AUDIENCE SENTIMENT TRAJECTORY (7d)
                          </h3>
                          <p className="text-[10px] text-gray-400">
                            Real-time pipeline analysis of customer sentiment distribution over the last 7 days with active campaign markers
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-[9px] font-mono">
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/> Positive</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"/> Neutral</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-pulse"/> Negative</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Line Chart Component */}
                        <div className="lg:col-span-2 h-[230px] w-full text-[10px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sentimentHistory} margin={{ top: 20, right: 15, left: -25, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                              <XAxis 
                                dataKey="date" 
                                stroke="#64748b" 
                                tickLine={false} 
                                axisLine={false} 
                                style={{ fill: '#94a3b8', fontSize: '9px', fontFamily: '"JetBrains Mono", monospace' }} 
                              />
                              <YAxis 
                                stroke="#64748b" 
                                tickLine={false} 
                                axisLine={false} 
                                style={{ fill: '#94a3b8', fontSize: '9px', fontFamily: '"JetBrains Mono", monospace' }} 
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: 'rgba(9, 9, 11, 0.95)',
                                  borderColor: 'rgba(255, 255, 255, 0.1)',
                                  borderRadius: '8px',
                                  color: '#f8fafc',
                                  pointerEvents: 'none',
                                  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))',
                                  fontFamily: '"Inter", sans-serif',
                                  fontSize: '11px',
                                }}
                                itemStyle={{ paddingLineHeight: 1.2 }}
                              />
                              
                              {/* Sentiment Lines */}
                              <Line
                                type="monotone"
                                dataKey="positive"
                                stroke="#10b981"
                                strokeWidth={2}
                                activeDot={{ r: 6 }}
                                dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="neutral"
                                stroke="#64748b"
                                strokeWidth={2}
                                activeDot={{ r: 6 }}
                                dot={{ r: 3, fill: '#64748b', strokeWidth: 0 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="negative"
                                stroke="#f43f5e"
                                strokeWidth={2}
                                activeDot={{ r: 6 }}
                                dot={{ r: 3, fill: '#f43f5e', strokeWidth: 0 }}
                              />

                              {/* Campaign Reference Lines with labels */}
                              {campaigns.map((camp, idx) => (
                                <ReferenceLine
                                  key={camp.id}
                                  x={camp.date}
                                  stroke="#a855f7"
                                  strokeDasharray="4 4"
                                  strokeWidth={1.5}
                                  label={{
                                    value: `📣 #${idx + 1}`,
                                    position: 'top',
                                    fill: '#d8b4fe',
                                    fontSize: 9,
                                    fontFamily: '"JetBrains Mono", monospace',
                                    fontWeight: 'bold',
                                  }}
                                />
                              ))}
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Interactive Campaign Manager Panel */}
                        <div className="p-3.5 rounded-lg bg-black/35 border border-white/5 space-y-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold text-indigo-300 font-mono uppercase tracking-wider flex items-center justify-between border-b border-white/5 pb-2">
                              <span>Campaign Events list</span>
                              <span className="text-[8px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono font-normal">
                                {campaigns.length} Active
                              </span>
                            </h4>
                            <div className="space-y-1.5 max-h-[110px] overflow-y-auto font-mono text-[9px] pr-1">
                              {campaigns.map((comp, idx) => (
                                <div key={comp.id} className="flex items-center justify-between p-2 bg-white/[0.02] border border-white/5 rounded hover:bg-white/[0.05] transition-all">
                                  <div className="space-y-0.5 truncate pr-1 text-left">
                                    <div className="flex items-center gap-1">
                                      <span className="text-purple-400 font-black">📣 #{idx + 1}</span>
                                      <span className="text-gray-200 font-sans font-semibold truncate text-[10px]">{comp.name}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-gray-500 text-[8px]">
                                      <span>Date: <b className="text-gray-300">{comp.date}</b></span>
                                      <span>Cost: <b className="text-gray-300">{comp.cost}</b></span>
                                      <span>Reach: <b className="text-gray-300">{comp.reach}</b></span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => setCampaigns(prev => prev.filter(c => c.id !== comp.id))}
                                    className="cursor-pointer text-gray-500 hover:text-rose-400 p-0.5 font-bold transition-colors text-[10px] pl-1.5"
                                    title="Delete Campaign"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              {campaigns.length === 0 && (
                                <p className="text-center text-gray-600 py-4 italic text-[9px]">No campaigns active. Add a milestone below.</p>
                              )}
                            </div>
                          </div>

                          {/* Quick Add Form */}
                          <form onSubmit={handleAddCampaign} className="space-y-2 border-t border-white/5 pt-2.5">
                            <div className="grid grid-cols-2 gap-1.5">
                              <div>
                                <label className="block text-[8px] font-mono text-gray-500 uppercase mb-0.5">Date</label>
                                <select
                                  value={newCampaignDate}
                                  onChange={(e) => setNewCampaignDate(e.target.value)}
                                  className="w-full bg-black/60 border border-white/10 rounded px-1.5 py-1 text-[9px] font-mono text-gray-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                  {sentimentHistory.map(day => (
                                    <option key={day.date} value={day.date} className="bg-zinc-900 text-white">{day.date}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[8px] font-mono text-gray-500 uppercase mb-0.5">Cost</label>
                                <input
                                  type="text"
                                  value={newCampaignCost}
                                  onChange={(e) => setNewCampaignCost(e.target.value)}
                                  placeholder="$200"
                                  className="w-full bg-black/60 border border-white/10 rounded px-1.5 py-1 text-[9px] font-mono text-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-5 gap-1.5">
                              <div className="col-span-3">
                                <label className="block text-[8px] font-mono text-gray-500 uppercase mb-0.5">Campaign Name</label>
                                <input
                                  type="text"
                                  value={newCampaignName}
                                  onChange={(e) => setNewCampaignName(e.target.value)}
                                  placeholder="e.g. Summer Blitz Campaign"
                                  className="w-full bg-black/60 border border-white/10 rounded px-1.5 py-1 text-[9px] text-gray-200 focus:outline-none focus:border-indigo-500"
                                />
                              </div>
                              <div className="col-span-2 flex flex-col justify-end">
                                <button
                                  type="submit"
                                  className="cursor-pointer h-[24px] bg-indigo-600 hover:bg-indigo-500 text-white font-mono uppercase text-[8px] font-bold rounded flex items-center justify-center gap-1 transition-all"
                                >
                                  <span>+ Add Marker</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    {/* Platform Sentiment Heatmap Grid Panel */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                        <div className="space-y-1">
                          <h3 className="text-xs font-mono font-bold text-pink-400 uppercase flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-pink-400" />
                            PLATFORM SENTIMENT HEATMAP
                          </h3>
                          <p className="text-[10px] text-gray-400">
                            Interactive comment density matrix. Click any cell to target/filter high-intensity feedback in the queue below.
                          </p>
                        </div>
                        {(sentimentFilter !== 'all' || platformFilter !== 'all') && (
                          <button
                            onClick={() => {
                              setSentimentFilter('all');
                              setPlatformFilter('all');
                            }}
                            className="text-[8px] font-mono uppercase bg-rose-500/10 border border-rose-500/20 text-rose-300 px-2 py-0.5 rounded cursor-pointer hover:bg-rose-500/20 transition-all flex items-center gap-1 self-start sm:self-auto"
                          >
                            ✕ Reset Matrix Filter
                          </button>
                        )}
                      </div>

                      {/* Heatmap Grid */}
                      <div className="overflow-x-auto">
                        <div className="min-w-[440px] space-y-2">
                          {/* Column Headers */}
                          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold text-gray-400">
                            <div className="text-left pl-2">Channel</div>
                            <div className="text-emerald-400 bg-emerald-500/5 py-1 rounded border border-emerald-500/10 flex items-center justify-center gap-1">😊 Positive</div>
                            <div className="text-slate-300 bg-slate-500/5 py-1 rounded border border-slate-500/10 flex items-center justify-center gap-1">😐 Neutral</div>
                            <div className="text-rose-400 bg-rose-500/5 py-1 rounded border border-rose-500/10 flex items-center justify-center gap-1">🚨 Negative</div>
                          </div>

                          {/* Rows: Platforms */}
                          {(['instagram', 'facebook', 'linkedin'] as const).map(platform => {
                            const platformColors = {
                              instagram: { text: 'text-pink-400', bgBorder: 'border-pink-500/20 bg-pink-500/5', label: 'Instagram' },
                              facebook: { text: 'text-sky-400', bgBorder: 'border-sky-500/20 bg-sky-500/5', label: 'Facebook' },
                              linkedin: { text: 'text-indigo-400', bgBorder: 'border-indigo-500/20 bg-indigo-500/5', label: 'LinkedIn' },
                            };
                            const info = platformColors[platform];

                            return (
                              <div key={platform} className="grid grid-cols-4 gap-2 items-center text-xs">
                                {/* Row Header */}
                                <div className={`flex items-center gap-1.5 px-2 py-3 rounded-lg border font-semibold ${info.bgBorder} ${info.text}`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                  <span className="font-mono text-[10px] uppercase tracking-wider">{info.label}</span>
                                </div>

                                {/* Cells */}
                                {(['positive', 'neutral', 'negative'] as const).map(sentiment => {
                                  // Gather the current count
                                  const cellComments = comments.filter(c => c.platform === platform && c.sentiment === sentiment);
                                  const count = cellComments.length;

                                  // Calculate density coefficient based on current comments distribution
                                  const maxGroupSize = Math.max(
                                    ...(['instagram', 'facebook', 'linkedin'] as const).flatMap(p =>
                                      (['positive', 'neutral', 'negative'] as const).map(s => 
                                        comments.filter(c => c.platform === p && c.sentiment === s).length
                                      )
                                    ),
                                    1
                                  );
                                  const ratio = count / maxGroupSize;

                                  // Check if active coordinate
                                  const isSelected = platformFilter === platform && sentimentFilter === sentiment;

                                  // Coloring strategy
                                  let bgStyle: React.CSSProperties = {};
                                  let cellClass = "";
                                  
                                  if (count === 0) {
                                    bgStyle = { backgroundColor: 'rgba(255, 255, 255, 0.02)' };
                                    cellClass = "text-gray-600 border-white/5 hover:border-white/10";
                                  } else if (sentiment === 'positive') {
                                    bgStyle = { backgroundColor: `rgba(16, 185, 129, ${0.1 + ratio * 0.45})` };
                                    cellClass = "text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/40";
                                  } else if (sentiment === 'neutral') {
                                    bgStyle = { backgroundColor: `rgba(148, 163, 184, ${0.1 + ratio * 0.45})` };
                                    cellClass = "text-slate-200 border-slate-500/30 hover:bg-slate-500/40";
                                  } else {
                                    bgStyle = { backgroundColor: `rgba(244, 63, 94, ${0.15 + ratio * 0.5})` };
                                    cellClass = "text-rose-300 border-rose-500/30 hover:bg-rose-500/40 font-bold " + (count > 0 ? "animate-pulse" : "");
                                  }

                                  return (
                                    <button
                                      key={sentiment}
                                      onClick={() => {
                                        if (isSelected) {
                                          setPlatformFilter('all');
                                          setSentimentFilter('all');
                                        } else {
                                          setPlatformFilter(platform);
                                          setSentimentFilter(sentiment);
                                        }
                                      }}
                                      style={bgStyle}
                                      className={`cursor-pointer h-11 rounded-lg border flex flex-col items-center justify-center transition-all ${cellClass} ${
                                        isSelected 
                                          ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-black scale-[0.98]' 
                                          : 'hover:scale-[1.01]'
                                      }`}
                                    >
                                      <span className="text-sm font-black tracking-tight">{count}</span>
                                      <span className="text-[8px] font-mono uppercase opacity-75">{count === 1 ? 'review' : 'reviews'}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Micro Legend & status indicators */}
                      <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-gray-500 pt-2 border-t border-white/5 gap-2">
                        <div className="flex items-center gap-1.5">
                          <span>Hotspot intensity:</span>
                          <span className="w-2.5 h-2.5 rounded bg-white/[0.02] border border-white/5" />
                          <span>0</span>
                          <span className="w-16 h-1.5 rounded bg-gradient-to-r from-pink-500/10 to-pink-500/90 inline-block mx-1" style={{ backgroundImage: 'linear-gradient(to right, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.8))' }} />
                          <span>Max</span>
                        </div>
                        <div className="text-right text-[9px] text-pink-400">
                          {sentimentFilter !== 'all' || platformFilter !== 'all' ? (
                            <span>Currently filtering: <b className="uppercase">{platformFilter}</b> × <b className="uppercase">{sentimentFilter}</b></span>
                          ) : (
                            <span>Hover or click grid cells to filter incoming flows</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Live engagement comment simulation widget */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                        <h3 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                          <span>LATEST UNRESOLVED ENGAGEMENT TRAFFIC</span>
                          <span className="text-[9px] bg-rose-500/10 border border-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">Action required</span>
                        </h3>
                        {/* Compact platform and sentiment coordinated selector */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Sentiment filter */}
                          <div className="flex items-center gap-0.5 bg-black/60 p-0.5 rounded-md border border-white/5 text-[9px] font-mono">
                            <span className="text-gray-500 px-1 uppercase tracking-wider text-[8px]">Sentiment:</span>
                            {(['all', 'positive', 'neutral', 'negative'] as const).map(f => (
                              <button
                                key={f}
                                onClick={() => setSentimentFilter(f)}
                                className={`cursor-pointer px-1.5 py-0.5 rounded uppercase tracking-wider transition-all ${
                                  sentimentFilter === f 
                                    ? 'bg-indigo-600 text-white font-bold' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>

                          {/* Platform filter */}
                          <div className="flex items-center gap-0.5 bg-black/60 p-0.5 rounded-md border border-white/5 text-[9px] font-mono">
                            <span className="text-gray-500 px-1 uppercase tracking-wider text-[8px]">Platform:</span>
                            {(['all', 'facebook', 'instagram', 'linkedin'] as const).map(f => (
                              <button
                                key={f}
                                onClick={() => setPlatformFilter(f)}
                                className={`cursor-pointer px-1.5 py-0.5 rounded uppercase tracking-wider transition-all ${
                                  platformFilter === f 
                                    ? 'bg-indigo-600 text-white font-bold' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                              >
                                {f === 'all' ? 'all' : f === 'instagram' ? 'ig' : f === 'facebook' ? 'fb' : 'li'}
                              </button>
                            ))}
                          </div>

                          {/* Reset Indicator */}
                          {(sentimentFilter !== 'all' || platformFilter !== 'all') && (
                            <button
                              onClick={() => {
                                setSentimentFilter('all');
                                setPlatformFilter('all');
                              }}
                              className="cursor-pointer text-[8px] bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 px-1.5 py-0.5 rounded font-mono uppercase transition-all"
                            >
                              ✕ Reset
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 max-h-[220px] overflow-y-auto">
                        {getFilteredAndSortedComments().length === 0 ? (
                          <div className="p-4 bg-black/45 rounded-xl border border-white/5 text-gray-500 text-center text-xs font-mono">
                            No comment matching sentiment Filter loaded in queue.
                          </div>
                        ) : (
                          getFilteredAndSortedComments().map((c) => (
                            <div key={c.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-3">
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-semibold text-white">{c.author}</span>
                                  <span className="text-gray-500 text-[10px]">({c.platform})</span>

                                  {/* Compact Dash indicators */}
                                  {c.sentiment === 'positive' && (
                                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold select-none">
                                      😊 Pos
                                    </span>
                                  )}
                                  {c.sentiment === 'neutral' && (
                                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-500/10 border border-slate-500/20 text-slate-300 font-semibold select-none">
                                      😐 Neu
                                    </span>
                                  )}
                                  {c.sentiment === 'negative' && (
                                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold select-none animate-pulse">
                                      🚨 Urgent
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-xs text-left">"{c.content}"</p>
                              </div>
                              <button
                                onClick={() => {
                                  const ans = prompt("Edit reply caption:", c.aiSuggestedReply);
                                  if (ans) handleCommentReplySubmit(c.id, ans);
                                }}
                                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded whitespace-nowrap self-end sm:self-auto"
                              >
                                {c.isReplied ? '✓ Reply Dispatched' : 'Approve Auto-moderator reply'}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SOCIAL GENERATOR QUEUE */}
                {activeDashboardTab === 'social' && (
                  <div className="space-y-6 text-left">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-400" />
                      Dynamic Social Content dispatch desk
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Input parameters */}
                      <div className="lg:col-span-5 space-y-4 bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
                        <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase">1. CHOOSE POST PLATFORM</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {['instagram', 'facebook', 'linkedin'].map((plat) => (
                            <button
                              key={plat}
                              onClick={() => setSocialPlatform(plat as any)}
                              className={`cursor-pointer py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                                socialPlatform === plat
                                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/50'
                                  : 'bg-black/40 text-gray-500 border border-white/5'
                              }`}
                            >
                              {plat}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 font-semibold block">2. INSTANCE BRAND PERSONA STYLE</label>
                          <input
                            type="text"
                            value={socialBrandVoice}
                            onChange={(e) => setSocialBrandVoice(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 font-semibold block">3. POST TOPIC OR LAUNCH STATEMENT</label>
                          <textarea
                            rows={3}
                            value={socialTopic}
                            onChange={(e) => setSocialTopic(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-100 font-mono resize-none leading-relaxed"
                          />
                        </div>

                        <button
                          onClick={handleGenerateSocialPost}
                          disabled={generatingPost}
                          className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide transition-all"
                        >
                          {generatingPost ? 'COGNITIVELY DRAFTING CAPTIONS...' : 'Generate New Social Post'}
                        </button>
                      </div>

                      {/* Right: Posts Queue list */}
                      <div className="lg:col-span-7 space-y-3">
                        <h4 className="text-xs font-bold text-white font-mono uppercase">Social Posting Pipeline Queue</h4>
                        
                        <div className="space-y-3 max-h-[350px] overflow-y-auto">
                          {socialPostDrafts.map((draft) => (
                            <div key={draft.id} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-indigo-400 capitalize flex items-center gap-1">
                                  <span>📣</span> {draft.platform} - {draft.topic}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${
                                  draft.status === 'posted' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                                }`}>
                                  {draft.status}
                                </span>
                              </div>

                              <p className="text-xs text-gray-300 leading-relaxed font-sans select-text hover:text-white">"{draft.caption}"</p>

                              <div className="flex flex-wrap gap-1">
                                {draft.hashtags.map((tag, idx) => (
                                  <span key={idx} className="text-[10px] text-indigo-300 font-mono">#{tag}</span>
                                ))}
                              </div>

                              {draft.visualPrompt && (
                                <div className="p-2.5 rounded bg-white/3 border border-dashed border-white/5 text-[10px] text-gray-400">
                                  <b>DESIGN DIRECTIVE:</b> "{draft.visualPrompt}"
                                </div>
                              )}

                              {draft.status === 'draft' && (
                                <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                                  <button
                                    onClick={() => {
                                      setSocialPostDrafts(prev => prev.map(p => p.id === draft.id ? { ...p, status: 'posted' } : p));
                                    }}
                                    className="cursor-pointer bg-emerald-500 text-black text-[10px] font-bold px-3 py-1 rounded"
                                  >
                                    Publish Autonomously
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. INSTANT WEBSITE RE-RENDERING */}
                {activeDashboardTab === 'websites' && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-indigo-400" />
                        Automated Conversion Web synthesis cockpit
                      </h2>
                      <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded">
                        99/100 page speed layout
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left structure values */}
                      <div className="lg:col-span-4 bg-black/40 p-4 rounded-xl border border-white/5 space-y-3 text-xs">
                        <div className="space-y-1">
                          <label className="text-gray-500 font-mono uppercase font-bold text-[9px]">LAUNCH BRAND NAME</label>
                          <input
                            type="text"
                            value={customWebBrand}
                            onChange={(e) => setCustomWebBrand(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-slate-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-gray-500 font-mono uppercase font-bold text-[9px]">CONVERSION DOMAIN STYLE</label>
                          <select
                            value={selectedWebType}
                            onChange={(e) => setSelectedWebType(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-slate-100 cursor-pointer"
                          >
                            <option value="SaaS Landing Page">SaaS Landing Page</option>
                            <option value="Artisanal Cafe">Artisanal Cafe</option>
                            <option value="Solar Grid Energy IoT">Solar Grid Energy IoT</option>
                            <option value="Premium Creative Agency">Premium Creative Agency</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-gray-500 font-mono uppercase font-bold text-[9px]">ADDITIONAL HOOK / PRESETS</label>
                          <textarea
                            rows={3}
                            value={extraWebInfo}
                            onChange={(e) => setExtraWebInfo(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-slate-100 leading-relaxed font-mono resize-none"
                          />
                        </div>

                        <button
                          onClick={handleGenerateWebsite}
                          disabled={generatingWebsite}
                          className="cursor-pointer w-full bg-emerald-500 text-black font-black py-2.5 rounded text-xs transition-colors"
                        >
                          {generatingWebsite ? 'COMMUNING CORE GENERATOR...' : 'Re-synthesize Web copy'}
                        </button>
                      </div>

                      {/* Right: Sitemap and structure list */}
                      <div className="lg:col-span-8 space-y-4">
                        {generatedWebsite ? (
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/15 space-y-2">
                              <h4 className="text-xs font-bold text-indigo-400 font-mono uppercase">AI PROPOSED ARCHITECTURE META MAP</h4>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <span className="text-gray-500 font-mono uppercase block text-[9px]">1. PROPOSED MONETIZATION TIER</span>
                                  <span className="font-bold text-white">{generatedWebsite.pricingTier?.tier} ({generatedWebsite.pricingTier?.price})</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 font-mono uppercase block text-[9px]">2. CONVERSION SLOGAN</span>
                                  <span className="font-bold text-white">"{generatedWebsite.slogan}"</span>
                                </div>
                              </div>
                              <p className="text-[11px] text-gray-400 pt-1 leading-relaxed border-t border-white/5 mt-2">
                                <b>PRICING JUSTIFICATION:</b> {generatedWebsite.pricingTier?.justification}
                              </p>
                            </div>

                            <div className="p-4 bg-black/30 rounded-xl border border-white/5 space-y-2 text-xs">
                              <span className="text-[9px] font-mono uppercase text-gray-500">DYNAMIC DEPLOYED WEB PAGES (SITEMAP):</span>
                              <div className="flex flex-wrap gap-2 pt-1">
                                {generatedWebsite.sitemap?.map((page, i) => (
                                  <span key={i} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded font-mono text-[10px]">
                                    📂 {page} Page
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 bg-black/20 rounded-xl border border-dashed border-white/5 text-center text-gray-500 text-xs">
                            Synthesize domain to preview telemetry diagram setup.
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. GROWTH CAMPAIGNS STRATEGY */}
                {activeDashboardTab === 'strategy' && (
                  <div className="space-y-6 text-left">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-indigo-400" />
                      Autonomous Brand Scaling Strategy
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Input specs */}
                      <div className="lg:col-span-5 bg-black/30 p-4 rounded-xl border border-white/5 space-y-3 text-xs">
                        <div className="space-y-1.5">
                          <label className="text-gray-500 font-mono uppercase font-bold text-[9px]">BUDGET TIER SCALING RANGE</label>
                          <select
                            value={strategyBudget}
                            onChange={(e) => setStrategyBudget(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-slate-100 cursor-pointer"
                          >
                            <option value="Low Tier ($100-$300/mo advertising balance)">Low Tier ($100-$305/mo)</option>
                            <option value="Mid Tier ($500-$1000/mo advertising balance)">Mid Tier ($500-$1000/mo)</option>
                            <option value="Enterprise Tier ($2000+/mo high-intensity distribution)">Enterprise Tier ($2000+/mo)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-gray-500 font-mono uppercase font-bold text-[9px]">MARKET GROWTH TARGET / STRATEGIC GOALS</label>
                          <textarea
                            rows={3}
                            value={strategyMarketGoals}
                            onChange={(e) => setStrategyMarketGoals(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-slate-100 leading-relaxed font-mono resize-none"
                          />
                        </div>

                        <button
                          onClick={handleGenerateStrategy}
                          disabled={generatingStrategy}
                          className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded text-xs transition-colors"
                        >
                          {generatingStrategy ? 'FORMULATING CAMPAIGN MATRICAL FLOWS...' : 'Formulate Growth Strategy'}
                        </button>
                      </div>

                      {/* Right: Strategy Output results */}
                      <div className="lg:col-span-7 space-y-3">
                        {generatedStrategy ? (
                          <div className="p-5 bg-black/40 rounded-xl border border-white/5 space-y-4 text-xs select-text">
                            <div className="pb-3 border-b border-white/5">
                              <span className="text-[9px] font-mono text-[#ec4899] uppercase">CYBER SECURITY COMPLIANT SCHEME</span>
                              <h3 className="text-lg font-bold text-white mt-0.5">{generatedStrategy.campaignName}</h3>
                              <p className="text-gray-400 text-[11px] mt-1 italic">"Goals: {generatedStrategy.goals}"</p>
                            </div>

                            {/* Steps to deploy */}
                            <div className="space-y-2">
                              <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase">ACTIONABLE MILESTONES AUTOMATED:</h4>
                              <ol className="space-y-1.5 list-decimal pl-4 text-gray-300 leading-relaxed">
                                {generatedStrategy.steps?.map((step, idx) => (
                                  <li key={idx}>{step}</li>
                                ))}
                              </ol>
                            </div>

                            {/* Viral hooks formula */}
                            <div className="p-3 rounded-lg bg-pink-950/20 border border-pink-500/15 space-y-1.5">
                              <h4 className="text-[10px] font-mono font-bold text-pink-400 uppercase flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> SUGGESTED VIRAL VIDEO REEL HOOKS:
                              </h4>
                              <ul className="space-y-1 list-disc pl-4 text-gray-300">
                                {generatedStrategy.viralHooks?.map((hook, i) => (
                                  <li key={i} className="font-semibold text-slate-100">"{hook}"</li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2 text-[11px]">
                              <div>
                                <span className="text-gray-500 font-mono uppercase block text-[9px]">TARGET AUDIENCE:</span>
                                <span className="font-bold text-white">{generatedStrategy.targetAudience?.join(', ')}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 font-mono uppercase block text-[9px]">PROJECTED KPIs:</span>
                                <span className="font-bold text-indigo-300">{generatedStrategy.performanceMetrics?.join(' | ')}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 bg-black/20 rounded-xl border border-dashed border-white/5 text-center text-gray-500 text-xs">
                            Formulate Campaign using parameters to render precise action plans.
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* 5. SYSTEM SETTINGS & KEY REGULATION */}
                {activeDashboardTab === 'settings' && (
                  <div className="space-y-6 text-left">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-indigo-400" />
                      Dynamic Security Credentials
                    </h2>

                    <div className="p-5 bg-black/40 rounded-xl border border-white/5 space-y-4 text-xs font-mono">
                      <div className="flex items-center gap-2 text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span>Warning: Credentials are handled securely via the secrets manager panel in AI Studio UI. Any custom variables represent localized memory stores.</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-500 block">OMNIVA FRAMEWORK REVENUE CLOUD:</span>
                        <input
                          type="password"
                          value="••••••••••••••••••••••••"
                          disabled
                          className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-gray-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-gray-500 block">AUTHENTIC METEOR TRANSIT SCHEDULER KEY:</span>
                        <input
                          type="text"
                          value="OMN_AUTH_SUCCESS_TOKEN_98A"
                          disabled
                          className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-indigo-400 text-xs"
                        />
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-slate-300 mb-2">How OMNIVA AI Stores Memory:</h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                          OMNIVA stores target brand tone styles, historic scheduler metrics, auto-generated posts, comment moderated replies, and generated sitemap copies locally. By using durable cloud persistence, the digital builder secures that your operational settings persist securely across frames.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER GENERAL */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-20 bg-black/60 text-slate-400 text-xs text-center font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-bold text-white">OMNIVA AI &bull; THE AUTONOMOUS MARKETING UNIVERSE</p>
          <p className="text-gray-500">Autonomous post workflows &bull; Multi-platform sync &bull; Generated custom websites with Google Gemini 3.5-flash.</p>
          <p className="text-[10px] text-gray-600 block pt-4">© 2026 OMNIVA Core. Built inside AI Studio preview.</p>
        </div>
      </footer>

    </div>
  );
}

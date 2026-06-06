import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
const getGeminiClient = (): GoogleGenAI => {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || "";
    if (!key || key === "MY_GEMINI_API_KEY") {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined or is placeholder. Falling back to simulated growth brain responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
};

// ==========================================
// 1. CHAT ENDPOINT
// ==========================================
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  try {
    const ai = getGeminiClient();
    const systemInstruction = `You are OMNIVA AI, the autonomous digital growth and brand management system. Your goal is to help businesses grow automatically, maximize engagement, maintain brand consistency, suggest social media posting schedules, and recommend structured landing pages with custom SEO parameters.
    Keep your tone ultra-professional, deeply strategic, encouraging, conversational, and direct (like a top-tier Chief Marketing Officer and Creative Director combined). Avoid robotic or dry templates. Offer innovative social post ideas, viral hook suggestions, and campaign flowcharts. Respond using rich Markdown.`;

    // Standard conversational block
    const promptContents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        promptContents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        });
      }
    }
    promptContents.push({ role: 'user', parts: [{ text: message }] });

    const key = process.env.GEMINI_API_KEY || "";
    if (!key || key === "MY_GEMINI_API_KEY") {
      // High-quality mock fallback for OMNIVA AI when no key is injected
      return res.json({
        text: `📊 **OMNIVA AI Brand Analysis [DEMO MODE]**\n\nI am currently operating in Growth Simulation Mode because no custom API key is connected. Here is a simulated strategic response:\n\nTo optimize your business profile, here is a targeted social expansion plan:\n- **Post Focus:** Create modern "behind-the-scenes" interactive video content explaining how your services solve customer paint points.\n- **Hook Formula:** *"This 3-step automation changed how we think about scale entirely..."*\n- **Recommended Platforms:** Instagram (visual branding / Reels) + LinkedIn (market leadership & long-form text).\n\n*Configure your Gemini API Key in the Secrets pane to unlock active AI execution.*`
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptContents,
      config: {
        systemInstruction,
        temperature: 0.85,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "OMNIVA server encountered a processing error" });
  }
});

// ==========================================
// 2. SOCIAL POST GENERATOR
// ==========================================
app.post("/api/generate-social", async (req, res) => {
  const { platform, topic, brandVoice, guidelines } = req.body;

  try {
    const ai = getGeminiClient();
    const prompt = `Generate a high-converting, platform-specific social media post for ${platform}.
    Topic/Focus: ${topic}
    Brand Voice Style: ${brandVoice || "Professional, tech-forward, and authoritative"}
    Specific Instructions or Rules: ${guidelines || "Create engagement, use active verbs, and include hashtags."}

    Respond in valid JSON matching this schema:
    {
      "caption": "The written caption including interactive hook and call to action",
      "hashtags": ["list", "of", "relevant", "hashtags"],
      "visualPrompt": "Strategic graphic design cue or video reel outline for the visual asset"
    }
    Ensure the JSON is correctly formatted. Do not include markdown code block tags around your JSON output.`;

    const key = process.env.GEMINI_API_KEY || "";
    if (!key || key === "MY_GEMINI_API_KEY") {
      // Simulate highly targeted output
      return res.json({
        caption: `🚀 Are you ready to completely change how you manage your online presence?

OMNIVA AI handles your social schedules, designs automated websites, and drafts replies so you can focus on building what matters most. Stop letting manual posting slow down your trajectory. 

Try it for free today. Details in bio!`,
        hashtags: ["OmnivaAI", "MarketingAutomation", "SaasGrowth", "Productivity"],
        visualPrompt: "A sleek dark neon holographic floating web dashboard displaying automated analytics graphs expanding outwards. Apple-inspired design aesthetic with premium glassmorphic cards."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            visualPrompt: { type: Type.STRING }
          },
          required: ["caption", "hashtags", "visualPrompt"]
        },
        temperature: 0.9,
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Social Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. WEBSITE GENERATOR AI
// ==========================================
app.post("/api/generate-website", async (req, res) => {
  const { businessType, brandName, extraInfo } = req.body;

  try {
    const ai = getGeminiClient();
    const prompt = `Generate a fully functional website structure, copywriting material, and a monetization tier mapping for a business of type "${businessType}" named "${brandName}".
    Context description: ${extraInfo || "A modern enterprise looking for high consumer engagement."}

    Return a clean, valid JSON object matching the following fields precisely:
    {
      "businessType": "${businessType}",
      "brandName": "${brandName}",
      "slogan": "A compelling, catchy 1-sentence slogan",
      "sitemap": ["Home", "Features", "Pricing", "Contact", "CustomSectionName"],
      "copy": {
        "hero": {
          "title": "A strong, punchy conversion-focused hero title",
          "subtitle": "An elegant 1-2 sentence value proposition subtitle"
        },
        "about": {
          "title": "Our Philosophy",
          "content": "A beautifully drafted 3-sentence company philosophy and story."
        },
        "features": [
          {"title": "Feature 1 title", "description": "High value feature 1 description", "icon": "Use a valid Lucide icon name like Sparkles, Layers, Shield, Zap, Globe, MessageSquare, Flame etc."},
          {"title": "Feature 2 title", "description": "High value feature 2 description", "icon": "Lucide icon name"},
          {"title": "Feature 3 title", "description": "High value feature 3 description", "icon": "Lucide icon name"}
        ]
      },
      "palette": {
        "primary": "Tailwind hex color (e.g., #8b5cf6 for violet)",
        "secondary": "Tailwind hex color",
        "accent": "Tailwind hex color",
        "background": "Tailwind hex color (usually safe dark/light background e.g. #0b0f19)"
      },
      "typography": {
        "headingFont": "A stylish display font family",
        "bodyFont": "A clean reading font family"
      },
      "pricingTier": {
        "tier": "Basic, Standard, or Advanced based on complexity",
        "price": "Drafted monthly pricing in USD (e.g., $49/mo)",
        "justification": "Clear, objective pricing tier justification detailing standard, basic, or advanced features"
      }
    }
    
    Make sure to write excellent, conversion-optimized branding text that reads beautifully. Do not return markdown wrapping tags.`;

    const key = process.env.GEMINI_API_KEY || "";
    if (!key || key === "MY_GEMINI_API_KEY") {
      // Highly attractive mock sitemap response
      return res.json({
        businessType,
        brandName,
        slogan: `Elevate your digital vision into an autonomous growth loop.`,
        sitemap: ["Overview", "Brand Solution", "Growth Engine", "Contact Setup"],
        copy: {
          hero: {
            title: `Empowering ${businessType} to dominate the digital landscape automatically.`,
            subtitle: `Transform your operations with OMNIVA AI's multi-platform Social scheduler and smart conversion pages.`
          },
          about: {
            title: `The Future of Brand Intelligence`,
            content: `We started ${brandName} to bridge the gap between human craftsmanship and digital systems. By engineering beautiful responsive touchpoints, we make growth intuitive, elegant, and persistent across all distribution networks.`
          },
          features: [
            { title: "Autonomous Scheduling", description: "Set your strategy on auto-pilot with scheduled posting pipelines.", icon: "Sparkles" },
            { title: "Dynamic CRM Engagement", description: "Breathe life back into comments with responsive AI auto-replies.", icon: "MessageSquare" },
            { title: "Real-time Metrics Tracking", description: "Observe real conversion growth numbers in a customized sci-fi dashboard.", icon: "Flame" }
          ]
        },
        palette: {
          primary: "#6366f1",
          secondary: "#10b981",
          accent: "#ec4899",
          background: "#030712"
        },
        typography: {
          headingFont: "Outfit",
          bodyFont: "Inter"
        },
        pricingTier: {
          tier: "Standard",
          price: "$199/month",
          justification: "Provides mid-market automation, complete platform syncs, and automated AI website generation."
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8,
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Website Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4. GROWTH STRATEGY GENERATOR
// ==========================================
app.post("/api/generate-strategy", async (req, res) => {
  const { businessDesc, marketGoals, budget } = req.body;

  try {
    const ai = getGeminiClient();
    const prompt = `Draft an advanced, hyper-tactical Growth Campaign Strategy for a business with the following characteristics:
    Description: ${businessDesc}
    Market Goals: ${marketGoals}
    Available Budget Tier: ${budget}

    Respond in valid JSON matching this schema:
    {
      "campaignName": "A catchy, visionary marketing campaign name",
      "targetAudience": ["List", "of", "high-value", "target", "audience", "segments"],
      "goals": "Strategic goals summary",
      "steps": ["Step 1: Initiation", "Step 2: Content blitz", "Step 3: Conversion loop", "Step 4: Scale"],
      "estimatedBudget": "Brief allocation of the budget",
      "performanceMetrics": ["KPI 1", "KPI 2", "KPI 3"],
      "viralHooks": ["Hook idea 1 (social reels)", "Hook idea 2 (linkedin/fb)"],
      "optimizationTips": "1-2 critical tips to sustain conversion momentum"
    }
    Ensure valid, clean JSON structure without backticks.`;

    const key = process.env.GEMINI_API_KEY || "";
    if (!key || key === "MY_GEMINI_API_KEY") {
      return res.json({
        campaignName: "Viral Leap Acceleration",
        targetAudience: ["Early-stage SaaS founders", "B2B consultancies looking to scale", "Venture-backed builders"],
        goals: "Maximize premium tier conversions and acquire social traction",
        steps: [
          "Phase 1: Brand positioning standard setup",
          "Phase 2: Video Reels automation campaign featuring live dashboard metrics",
          "Phase 3: Community building and direct message conversion flowcharts",
          "Phase 4: Launching paid target segments with localized copy variants"
        ],
        estimatedBudget: "60% content creation, 30% micro-influencer outreach, 10% structural scaling",
        performanceMetrics: ["Click-through rate (目標: 4.8%)", "Cost per Acquisition reduction", "Follower growth velocity"],
        viralHooks: [
          "How this simple offline schedule grew a B2B business by 200%",
          "This is what happens when you hand over your complete posting pipeline to a digital worker"
        ],
        optimizationTips: "Maintain consistent interaction delays on replies to elevate post algorithmic rankings naturally."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.85,
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Strategy Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 5. SOCIAL COMMENT AUTO-REPLY HELPER
// ==========================================
app.post("/api/auto-reply", async (req, res) => {
  const { commentContent, platform, brandIdentity } = req.body;

  try {
    const ai = getGeminiClient();
    const prompt = `You are the autodial-moderator of OMNIVA AI. Draft a friendly, highly persuasive, contextually professional, and brand-consistent social media reply.
    Platform: ${platform}
    Incoming Comment/DM: "${commentContent}"
    Brand Persona description: ${brandIdentity || "A helpful, witty, smart, and futuristic digital growth company."}

    Return a clean JSON mapping:
    {
      "reply": "The response text. Should be organic, helpful, and invite further dialogue or action (under 300 characters)."
    }
    Do not output markdown code ticks. Ensure correctly escaped JSON.`;

    const key = process.env.GEMINI_API_KEY || "";
    if (!key || key === "MY_GEMINI_API_KEY") {
      return res.json({
        reply: `That's exactly what we engineered OMNIVA AI to solve! High efficiency, zero friction. Have you tried generating your free website preview yet? Let us know what you think!`
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING }
          },
          required: ["reply"]
        },
        temperature: 0.85,
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Auto-Reply Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 5B. ANALYZE-COMMENT WITH SENTIMENT ENDPOINT
// ==========================================
app.post("/api/analyze-comment", async (req, res) => {
  const { commentContent, platform, brandIdentity } = req.body;

  try {
    const ai = getGeminiClient();
    const prompt = `Analyze the sentiment of the following social media comment and suggest a professional, brand-consistent response.
    Platform: ${platform || "instagram"}
    Incoming Comment/DM: "${commentContent}"
    Brand Identity Context: ${brandIdentity || "A helpful, smart, futuristic growth system."}

    Respond in valid JSON matching this schema:
    {
      "sentiment": "positive" | "neutral" | "negative",
      "reply": "A concise, conversational suggested reply under 300 characters."
    }
    Make sure "sentiment" is strictly one of "positive", "neutral", or "negative". Do not wrap with markdown code block tags.`;

    const key = process.env.GEMINI_API_KEY || "";
    if (!key || key === "MY_GEMINI_API_KEY") {
      // High-quality local fallback rules for OMNIVA AI
      const lower = String(commentContent || "").toLowerCase();
      let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
      let reply = "Thanks for sharing! Our autonomous client engagement system is addressing this context right away.";

      if (
        lower.includes('love') || 
        lower.includes('awesome') || 
        lower.includes('best') || 
        lower.includes('perfect') || 
        lower.includes('great') || 
        lower.includes('amazing') || 
        lower.includes('good') || 
        lower.includes('friendly') || 
        lower.includes('appreciate') || 
        lower.includes('thanks') || 
        lower.includes('thank you')
      ) {
        sentiment = 'positive';
        reply = "We appreciate your amazing support! Powering high-fidelity brand consistency is what we do best here at OMNIVA. ☕✨";
      } else if (
        lower.includes('bad') || 
        lower.includes('sad') || 
        lower.includes('expensive') || 
        lower.includes('hate') || 
        lower.includes('fail') || 
        lower.includes('slow') || 
        lower.includes('broken') || 
        lower.includes('issue') || 
        lower.includes('friction') || 
        lower.includes('terrible') || 
        lower.includes('error') || 
        lower.includes('wrong') || 
        lower.includes('unacceptable')
      ) {
        sentiment = 'negative';
        reply = "We apologize for the sub-optimal experience! We have escalated this alert to our active support nodes for immediate attention. 🚨 We will reach out to resolve this in a direct message right now.";
      }

      return res.json({ sentiment, reply });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            reply: { type: Type.STRING }
          },
          required: ["sentiment", "reply"]
        },
        temperature: 0.7,
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    const sentimentLower = String(parsedData.sentiment || "neutral").toLowerCase();
    let finalSentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (sentimentLower.includes('pos')) finalSentiment = 'positive';
    if (sentimentLower.includes('neg')) finalSentiment = 'negative';

    res.json({
      sentiment: finalSentiment,
      reply: parsedData.reply || "Thank you for the feedback. Our active brand nodes will evaluate this immediately."
    });
  } catch (error: any) {
    console.error("Gemini Comment Analysis Error:", error);
    res.status(500).json({ error: error.message || "Engine Error" });
  }
});

// ==========================================================
// 6. DEV & PROD VITE MIDDLEWARE SETUP
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OMNIVA CORE SERVER] Online at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

startServer();

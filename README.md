# 🧠 OMNIVA AI — Autonomous Digital Growth & Brand Management Agent

[![React v19](https://img.shields.io/badge/React-v19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite v6](https://img.shields.io/badge/Vite-v6.2-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Express v4](https://img.shields.io/badge/Express-v4.2-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Powered%20By-Gemini%203.5--Flash-orange?style=flat-square&logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/CSS-Tailwind%20v4.0-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**The absolute autonomous growth department for SMBs.** OMNIVA AI automatically manages complete online ecosystems—from high-converting social media pipelines with automated comment moderation, to AI-driven brand marketing campaigns and instantly deployed landing pages.

---

## 📖 Table of Contents
1. [Project Name](#project-name)
2. [Features](#features)
3. [Screenshots / Demo](#screenshots--demo)
4. [Architecture Overview](#architecture-overview)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [Installation](#installation)
8. [Usage](#usage)
9. [Configuration](#configuration)
10. [API Documentation](#api-documentation)
11. [Database & Persistence](#database)
12. [Testing](#testing)
13. [CI/CD](#cicd)
14. [Performance & Scalability](#performance--scalability)
15. [Security](#security)
16. [Roadmap](#roadmap)
17. [Contributing](#contributing)
18. [License](#license)
19. [Author](#author)
20. [Acknowledgements](#acknowledgements)

---

## 🚀 Project Name

### **OMNIVA AI**
> *Automated Social Streams, Intelligent Moderation, and AI Website Deployment in a Single Unified Workspace.*

OMNIVA AI acts as a 24/7 autonomous corporate marketing engine. Designed for small and medium-sized businesses, it replaces fragmented tooling by combining social scheduling, deep campaign layout strategies, rule-triggered CRM auto-replies, sentiment monitoring, and fully drafted landing sites.

---

## ✨ Features

### 📡 Tactical Streams & Analytics
- **Audience Sentiment Trajectory**: Real-time 7-day feedback curves tracking **Positive**, **Neutral**, and **Negative** comments using `recharts` lines, with integrated physical mapping of campaign execution markers.
- **Platform Sentiment Heatmap**: Dynamic density matrix tracking comments across the **Facebook**, **Instagram**, and **LinkedIn** channels. Clicking a coordinate filters active queues inside the workspace.
- **Milestone Annotation Manager**: Interactive controls to append or remove historical marketing milestones directly over the sentiment charts to evaluate product traction and campaign ROI.

### ✍️ Intelligent Social Post Pipeline
- **AI Social Generator**: Target custom channels with specific brand tones (*Witty, Corporate, Bold, Technical*), guidelines, and descriptive topics. Generates engaging text captions, platform hashtags, and design prompts.
- **Social Stream Queue**: Interactive workspace to schedule draft posts, manually update engagement values, and preview active creative.

### 🌐 Instant Website Builder Wireframe
- **Semantic Generation**: Analyzes business categories and briefs to suggest a bespoke website structure, navigation menu, copyright scripts, custom color palette metrics, and font hierarchy.
- **Interactive Workspace Preview**: Renders the complete, live generated page inside a style-palette side drawer, featuring visual elements and monetization mappings representing Basic, Standard, and Advanced tiers.

### 🧭 Grow Strategy Roadmap
- **Strategy Architect**: Prompts Gemini to design holistic marketing plans. Outlines campaign milestones, target market segments, cost forecasts, viral hook guidelines, and interactive SEO directives.

### 🛡️ System Settings & brand parameters
- **Configurable Personas**: Edit business details and core brand rules globally.
- **API Key Guard**: Explains standard setups for secure container context environment variables.

---

## 📸 Screenshots / Demo

### Interactive Workspace Dashboard
![OMNIVA AI Main UI Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&fit=crop&q=80)
*Interactive multi-panel workspace featuring sentiment analytic line charts and matrix heatmaps.*

> **Live Demo URL:** [https://ais-dev-seyddgplllhzuvqggieowi-544858969369.asia-southeast1.run.app](https://ais-dev-seyddgplllhzuvqggieowi-544858969369.asia-southeast1.run.app)   
> *Configure your custom environment variables or API keys via settings to enable active processing.*

---

## 🏛️ Architecture Overview

The system utilizes a secure **Full-Stack Client-Server Architecture** to keep AI parameters hidden from external browsers:

```
┌───────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (SPA)                       │
│  - Interactive Recharts & Micro-engineered Heatmap Grid       │
│  - ThreeScene Interactive WebGL-Canvas Particle Background     │
│  - Contextual State Machine & Platform-wide Client Views      │
└───────────────────────────────┬───────────────────────────────┘
                                │ Secured HTTPS JSON API Pipes
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                   NODE.JS EXPRESS SERVER                      │
│  - Middleware Route Interceptors (/api/*)                    │
│  - Native Environment Credentials Handlers (.env)             │
│  - Fallback Simulation Pipelines for Keyless Deployments       │
└───────────────────────────────┬───────────────────────────────┘
                                │ Secure Server-to-Server HTTPS
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                    GEMINI AI PLATFORM                         │
│  - SDK Client: @google/genai (v2.4.0)                          │
│  - Model Foundation: gemini-3.5-flash                         │
└───────────────────────────────────────────────────────────────┘
```

### Key Components

1. **Frontend Application**: Renders single-page responsive layouts. Uses `motion` for fluid tab conversions and state updates, and standard browser interfaces for tracking active campaign parameters.
2. **Interactive Background**: Custom HTML5 Canvas particle renderer (`ThreeScene`) calculating inertia vectors and mouse-proximity lines with responsive canvas sizing.
3. **Backend Middleware Server**: Proxies outgoing telemetry and AI tasks to Google APIs, shielding user secrets. Supports zero-config simulation loops for local sandbox testing.

---

## 🛠️ Tech Stack

| Domain | Technolgies |
| :--- | :--- |
| **Language** | TypeScript (Strict Typings) |
| **Frontend UI Framework** | React v19.0 |
| **Styles & Theme** | Tailwind CSS v4.0, JetBrains Mono & Inter typography |
| **Animations & FX** | Motion (motion/react), Fluid Canvas particle system |
| **Interactive Graphs** | Recharts (Responsive Line Chart, ReferenceLine markers) |
| **Backend Server** | Node.js Express Server v4.21 |
| **Development Engine** | Vite v6.2, tsx compiler, esbuild |
| **AI LLM Engine** | @google/genai SDK v2.4.0 (Gemini 3.5 Flash Model) |

---

## 📁 Project Structure

```
├── .env.example              # Sample environment configuration file
├── .gitignore                # Production artifact exclusion list
├── index.html                # HTML entry document
├── metadata.json             # AI Studio configuration file (permissions, name, capabilities)
├── package.json              # Direct build requirements and dependencies
├── tsconfig.json             # TypeScript project definitions
├── vite.config.ts            # Vite configuration and plugin declarations
├── server.ts                 # Full-stack Express server config & API proxy endpoints
└── src/
    ├── App.tsx               # Primary dashboard interface & client-side states
    ├── main.tsx              # Application client-side entry point
    ├── index.css             # Global stylesheet (Imports Tailwind and Typography fonts)
    ├── types.ts              # Declarations of state models, posts, and comments
    └── components/
        └── ThreeScene.tsx    # Parallax canvas particle ecosystem of the console
```

---

## ⚙️ Installation

### Prerequisites
Make sure your workstation contains standard Node.js environments:
- **Node.js**: `v18.x` or subsequent releases
- **npm**: `v9.x` or higher

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/omniva-ai.git
cd omniva-ai
```

### Step 2: Install Project Dependencies
Run npm installer on the directory:
```bash
npm install
```

### Step 3: Setup the Environment
Clone the template file to configure your local variables:
```bash
cp .env.example .env
```
Open your `.env` document and set your custom Gemini credential:
```env
GEMINI_API_KEY="AIzaSyYourSecretAPIKeyHere..."
APP_URL="http://localhost:3000"
```

---

## 💻 Usage

### 🚀 Development Server
Starts the full-stack system in local environment using `tsx` watch pipelines:
```bash
npm run dev
```
Navigate to your local browser tab: [http://localhost:3000](http://localhost:3000)

### 🏗️ Production Compilation
Builds the client bundle with Vite and combines the backend server into a self-contained CommonJS output folder using `esbuild`:
```bash
npm run build
```

### ⚡ Start Production Server
Launch compiled assets:
```bash
npm run start
```

---

## 🔌 API Documentation

All endpoints receive structured JSON requests and return clean JSON objects:

### 1. Unified Dialogue Partner
* **Route**: `POST /api/chat`
* **Request Payload**:
  ```json
  {
    "message": "Suggest a marketing title for a tech apparel launch",
    "history": [
      { "role": "user", "content": "Hello" },
      { "role": "model", "content": "Hello, I am OMNIVA AI. How can I assist you?" }
    ]
  }
  ```
* **Response Payload**:
  ```json
  {
    "text": "### 🚀 Kinetic Thread Collection\n\nTo optimize your launch, consider these three parameters..."
  }
  ```

### 2. Post Generator Pipeline
* **Route**: `POST /api/generate-social`
* **Request Payload**:
  ```json
  {
    "platform": "instagram",
    "topic": "Nitro Coffee Benefits",
    "brandVoice": "Bold, authoritative and futuristic",
    "guidelines": "Mention performance and biological hacks"
  }
  ```
* **Response Payload**:
  ```json
  {
    "caption": "Re-engineer your energy circuits with cold active coffee formula.",
    "hashtags": ["BioFuel", "ActiveGrowth", "NitroSynap"],
    "visualPrompt": "A close-up high-contrast render of a frost-rimmed aluminum can radiating cold steam."
  }
  ```

### 3. Website Asset Builder
* **Route**: `POST /api/generate-website`
* **Request Payload**:
  ```json
  {
    "businessType": "Modern Fitness Gym",
    "brandName": "IronCore Labs",
    "extraInfo": "High quality machines, digital training tracking"
  }
  ```
* **Response Payload**:
  ```json
  {
    "businessType": "Modern Fitness Gym",
    "brandName": "IronCore Labs",
    "slogan": "Unleash your biological force constraints",
    "sitemap": ["Home", "Programs", "Membership", "Facility", "Contact"],
    "copy": {
      "hero": {
        "title": "A smarter track to human performance.",
        "subtitle": "Discover bio-synchronized equipment designed to maximize athletic outputs."
      },
      "about": {
        "title": "Aesthetic Conditioning Redefined",
        "content": "Crafting modern performance labs with interactive biofeedback metrics."
      },
      "features": [
        { "title": "Interactive Labs", "description": "Connected telemetry watches every lift.", "icon": "Flame" }
      ]
    },
    "palette": {
      "primary": "#3b82f6",
      "secondary": "#10b981",
      "accent": "#ef4444",
      "background": "#030712"
    },
    "typography": {
      "headingFont": "Outfit",
      "bodyFont": "Inter"
    },
    "pricingTier": {
      "tier": "Standard",
      "price": "$89/month",
      "justification": "Covers personal physical coaches and custom analytics panels."
    }
  }
  ```

---

## 🗄️ Database

### Current Mock Schema Architecture
OMNIVA AI uses an in-memory reactive state manager leveraging React hooks in sandbox modes for transient sessions. This ensures immediate accessibility and local responsiveness without database startup friction. All custom content generated (posts, sites, campaigns) updates live states in runtime.

### Recommended Production Migration Path
For enterprise multi-user persistence, we recommend setting up **Firebase Firestore** or **Relational PostgreSQL (Cloud SQL)**:
1. **Firestore (Durable Persistent NoSQL Store)**: Best suited for scaling scheduled posts, user logs, and audit records.
2. **PostgreSQL / Cloud SQL**: Excellent if relational workflows, transactional booking logs, and complex marketing analytics calculations are required.

---

## 🧪 Testing

The codebase enforces strict type-checking at compile time.

```bash
# Verify component syntax & type integrity
npm run lint
```
To run future unit tests using testing libraries like Jest or Vitest, add testing files in `src/__tests__/` and configure `vite.config.ts`.

---

## 📦 CI/CD

OMNIVA AI is optimized for deployment inside containerized clouds, such as **Google Cloud Run**:

```
[GIT PUSH] 🚀 ━━> [BUILD CONTAINER] ━━> [LINT CHECK] ━━> [PRODUCTION INGRESS ROUTE (Port 3000)]
```

### Production Build Command Execution
During deployment, the build server runs:
```bash
npm run build
```
This launches Vite client builds, bundles the NodeJS Express backend server to an optimized standalone output file `dist/server.cjs` via `esbuild`, and loads environment configurations, completely bypassing ESM runtime resolution overhead.

---

## ⚡ Performance & Scalability

1. **Lazy Initialization**: Server-side SDK components (including `GoogleGenAI`) are instantiated lazily on the first request rather than during startup, protecting the system from startup crashes during misconfigured environments.
2. **Static Asset Caching**: Pre-compiled static assets are served directly through Express production middlewares, cutting response delays down to sub-millisecond ranges.
3. **Optimized Render Schedules**: The canvas scene updates using standard `requestAnimationFrame` hooks paired with debounced sizing triggers, maintaining continuous 60fps states on high-DPI displays.

---

## 🔒 Security

- **Server-Side API Keys Proxying**: Sensitive tokens (such as `GEMINI_API_KEY`) reside purely in the private cloud runtime environment (`process.env`). No external browser client ever has access to these credentials.
- **Sanitized JSON Responses**: Express endpoint handlers explicitly define MIME schemas, protecting against arbitrary injection during text generations.
- **Strict HTTPS Contexts**: Designed to operate inside sandboxed reverse proxies (`Port 3000`), strictly managing browser frames and access policies safely.

---

## 🗺️ Roadmap

- [ ] **Multi-platform API Sync**: Build actual oauth authorization channels directly onto Twitter/X, Instagram Graph, and LinkedIn Share APIs.
- [ ] **Durable Database Persistence**: Integrate Firestore DB structures to back active schedules across sessions.
- [ ] **Deep Analytics Integrations**: Setup real tracking graphs measuring click-through ratios, referral feeds, and actual audience engagement growth metrics.

---

## 🤝 Contributing

Contributions are welcome! Please follow these standards:

1. **Branch Format**: `feature/your-cool-update` or `bugfix/issue-fix`.
2. **Linter Guidelines**: Ensure codes pass strict type-checks locally before raising pull-requests:
   ```bash
   npm run lint
   ```
3. **Pull Request Submission**: Tag maintainers and include clear scannable bullet summaries detailing your logic changes.

---

## 📄 License
This project is open-source under the terms of the MIT License. Refer to the License code for additional information.

---

## ✍️ Author
Designed with futuristic aesthetic intent by your OMNIVA AI team.
- **Email Support**: farhankabir236@gmail.com
- **Product Hub**: [Google AI Studio Build](https://ai.studio/build)

---

## ❤️ Acknowledgements
- [Google Gemini Team](https://ai.google.dev/) for high-fidelity Generative AI models.
- [Lucide Icons](https://lucide.dev/) for modern minimalist visual cues.
- [Recharts Authors](https://recharts.org/) for beautiful, responsive chart widgets.

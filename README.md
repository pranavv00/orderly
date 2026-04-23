<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

# 🍽️ Orderly — AI-Powered Food Automation

**Your autonomous meal planning, ordering, and budgeting agent. Powered by AI.**

Orderly is a premium, dark-themed web application that acts as an intelligent food management system. It combines AI-driven meal planning, automated ordering, budget tracking, and nutrition monitoring into a single, beautiful dashboard — inspired by the design language of platforms like Swiggy.

---

## ✨ Features

### 📊 Dashboard
- **Real-time stat cards** — calories, weekly spend, meals planned, and auto-orders at a glance
- **Today's Meals** — breakfast, lunch, and dinner with calorie counts and timing
- **Budget Donut Chart** — animated SVG visualization of weekly spend vs. budget
- **AI Suggestions** — personalized meal recommendations with tags (Trending, New, Healthy)
- **Upcoming Orders** — timeline view of scheduled orders and reservations
- **Health Streak** — gamified streak tracker for staying within calorie goals
- **Quick Actions** — one-tap shortcuts to order, plan, reorder, or set up automations

### 📅 Meal Planner
- **Weekly calendar grid** — 7-day view with breakfast, lunch, and dinner slots
- **Week navigation** — browse past and future weeks
- **Per-day summaries** — daily calorie and cost totals
- **Weekly summary bar** — aggregate cost, average calories, meals planned, and budget status
- **AI generation** — generate optimized meal plans with a single click

### ⚡ Automations
- **Automation rules engine** — create, edit, pause, and delete automation rules
- **Rule types** — auto-order lunch, weekly grocery restock, meal plan generation, budget alerts, dinner reservations
- **Expandable detail cards** — trigger, action, constraints, and approval settings
- **Stats overview** — active rules count, total triggers, and auto-orders placed
- **Per-rule metrics** — trigger count and success rate

### 💬 Orderly AI Chat
- **Conversational AI assistant** — natural language interface for meal planning, ordering, and budget queries
- **Rich meal plan cards** — inline meal plan previews with macros, pricing, and action buttons (Approve, Modify, Reject)
- **Conversation threads** — sidebar with thread history and navigation
- **Quick suggestions** — pre-built prompt chips for common actions
- **Typing indicator** — animated dots during AI response generation
- **Active automations panel** — toggle automations directly from the chat view

### ⚙️ Settings
- **Profile management** — name, email, phone, location
- **Dietary preferences** — tags, preferred cuisines, calorie goals, allergens
- **Meal schedule** — customizable breakfast, lunch, and dinner times
- **Budget settings** — weekly/monthly budgets and alert thresholds
- **Connected platforms** — Swiggy, Zomato, Instamart, Dineout integration status
- **AI agent behavior** — autonomy level (Suggest / Approval / Autopilot), approval window, scoring weights
- **Notifications** — granular control over order, budget, summary, and promotional notifications
- **Saved addresses** — home, work, and custom delivery addresses

### 🔐 Authentication
- **OAuth 2.0 callback flow** — server-side code exchange with mock backend
- **HTTP-only session cookies** — secure, base64-encoded session management
- **Session lifecycle** — create, read, and destroy sessions with expiry handling

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + Custom CSS Design System |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Charts** | [Recharts 3](https://recharts.org/) |
| **Font** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm / bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/pranavv00/orderly.git
cd orderly

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
orderly/
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/           # OAuth API routes
│   │   ├── auth/
│   │   │   └── callback/       # OAuth callback page
│   │   ├── globals.css         # Design system & global styles
│   │   ├── layout.tsx          # Root layout with metadata & fonts
│   │   ├── page.tsx            # Main app shell with routing
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Dashboard.tsx       # Dashboard with stats, meals, budget, AI suggestions
│   │   ├── ChatInterface.tsx   # AI chat with threads, meal plans, automations
│   │   ├── MealPlanner.tsx     # Weekly meal calendar with navigation
│   │   ├── Automations.tsx     # Automation rules engine
│   │   ├── Settings.tsx        # User preferences & configuration
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── Header.tsx          # Top header bar
│   └── lib/
│       └── auth.ts             # OAuth & session management utilities
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── README.md
```

---

## 🎨 Design System

Orderly uses a custom dark theme design system inspired by Swiggy's visual language:

- **Surface Hierarchy** — 7 levels of background colors for visual depth
- **Brand Accent** — Swiggy orange (`#fc8019`) used intentionally for CTAs and active states
- **Semantic Colors** — green, red, amber, blue, purple, cyan, pink for contextual meaning
- **Typography** — Inter font family with weights 300–800
- **Radius Scale** — consistent 4px-based border radius system (6px → 9999px)
- **Motion** — cubic-bezier easing with fast (120ms), base (200ms), and slow (350ms) durations
- **Gradients** — brand, green, blue, purple, sunset, cyan for elevated surfaces

---

## 🗺️ Roadmap

- [ ] Real OAuth provider integration (Google / Swiggy)
- [ ] Backend API with database persistence
- [ ] Real-time order tracking with WebSockets
- [ ] Mobile-responsive layout
- [ ] Push notifications (FCM)
- [ ] Multi-user support & family plans
- [ ] Receipt scanning with OCR
- [ ] Integration with Swiggy / Zomato APIs

---

## 📄 License

This project is private and not licensed for redistribution.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/pranavv00">Pranav Gawande</a>
</p>

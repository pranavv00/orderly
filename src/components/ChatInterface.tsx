"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Plus,
  Sparkles,
  Flame,
  Clock,
  CircleDot,
  Check,
  X,
  Edit3,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  mealPlan?: MealPlanData;
  actions?: ActionButton[];
}

interface MealPlanData {
  title: string;
  meals: { emoji: string; label: string; name: string; price: number; cal: number }[];
  total: number;
  macros: { protein: number; carbs: number; fat: number };
}

interface ActionButton {
  label: string;
  type: "primary" | "secondary";
  icon?: React.ReactNode;
}

const threads = [
  { id: "1", title: "Current Plan", preview: "Tomorrow's meal plan ready", active: true },
  { id: "2", title: "Budget Check", preview: "Weekly budget analysis" },
  { id: "3", title: "Dinner Ideas", preview: "5 restaurant suggestions" },
  { id: "4", title: "Grocery List", preview: "Instamart order for Sunday" },
  { id: "5", title: "Diet Preferences", preview: "Updated to high-protein" },
];

const automations = [
  { name: "Auto-order Lunch", detail: "Weekdays at 11:30 AM", active: true },
  { name: "Weekly Grocery", detail: "Sundays at 10:00 AM", active: false },
  { name: "Budget Alert", detail: "When >80% spent", active: true },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content:
      "Hey! 👋 I'm your Orderly assistant. I can plan meals, track your budget, and auto-order food. What would you like to do today?",
    timestamp: "10:00 AM",
  },
  {
    id: "2",
    role: "user",
    content: "Plan my meals for tomorrow. Budget ₹500, high protein please.",
    timestamp: "10:02 AM",
  },
  {
    id: "3",
    role: "ai",
    content:
      "Here's your optimized meal plan for tomorrow. I prioritized protein-rich options within your ₹500 budget, with good variety from your usual choices:",
    timestamp: "10:02 AM",
    mealPlan: {
      title: "TOMORROW'S MEAL PLAN",
      meals: [
        { emoji: "🥞", label: "Breakfast", name: "Egg Bhurji + Multigrain Toast", price: 95, cal: 380 },
        { emoji: "🍛", label: "Lunch", name: "Chicken Biryani (Meghana Foods)", price: 220, cal: 650 },
        { emoji: "🥗", label: "Snack", name: "Greek Yogurt + Nuts", price: 60, cal: 180 },
        { emoji: "🍽️", label: "Dinner", name: "Paneer Tikka + 2 Roti", price: 185, cal: 520 },
      ],
      total: 560,
      macros: { protein: 135, carbs: 195, fat: 58 },
    },
    actions: [
      { label: "Approve & Schedule", type: "primary", icon: <Check size={14} /> },
      { label: "Modify", type: "secondary", icon: <Edit3 size={14} /> },
      { label: "Reject", type: "secondary", icon: <X size={14} /> },
    ],
  },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeThread, setActiveThread] = useState("1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: getAIResponse(input),
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    if (lower.includes("budget")) {
      return "📊 **Budget Status:** You've spent ₹2,400 out of ₹5,000 this week (48%). At your current pace, you'll be right on target. Today's planned spend is ₹570 (3 meals). Want me to suggest some ways to save?";
    }
    if (lower.includes("order") || lower.includes("hungry")) {
      return "🍽️ Based on your preferences and the time of day, I recommend:\n\n1. **Meghana Foods** — Chicken Biryani (₹220, 35 min)\n2. **Bowl Company** — Protein Bowl (₹280, 25 min)\n3. **Subway** — Chicken Teriyaki Sub (₹350, 20 min)\n\nShall I place any of these orders?";
    }
    if (lower.includes("healthy") || lower.includes("diet")) {
      return "🥗 Great focus on health! Based on your recent meals, you're averaging 1,800 kcal/day with 110g protein. To hit your 2,200 kcal target, I'd suggest adding a protein-rich snack around 4 PM. Want me to plan one?";
    }
    return "Got it! I'll look into that for you. Is there anything specific about cuisine, budget, or dietary preferences you'd like me to consider?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-layout">
      {/* Chat Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <span className="chat-sidebar-title">Conversations</span>
          <button
            className="header-btn"
            style={{ width: "30px", height: "30px", borderRadius: "8px" }}
          >
            <Plus size={16} />
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "8px 0" }}>
          {threads.map((t) => (
            <div
              key={t.id}
              className={`chat-thread ${activeThread === t.id ? "active" : ""}`}
              onClick={() => setActiveThread(t.id)}
            >
              <div className="chat-thread-title">{t.title}</div>
              <div className="chat-thread-preview">{t.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        <div className="chat-messages">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`chat-message ${msg.role === "user" ? "user" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`chat-message-avatar ${msg.role === "ai" ? "ai" : "human"}`}>
                  {msg.role === "ai" ? (
                    <Sparkles size={16} color="white" />
                  ) : (
                    "PG"
                  )}
                </div>
                <div>
                  <div className="chat-message-bubble">
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                    {msg.mealPlan && (
                      <div className="meal-plan-card">
                        <div className="meal-plan-card-title">{msg.mealPlan.title}</div>
                        {msg.mealPlan.meals.map((meal) => (
                          <div key={meal.label} className="meal-plan-row">
                            <div className="meal-plan-row-emoji">{meal.emoji}</div>
                            <div style={{ flex: "0 0 70px", fontSize: "10px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                              {meal.label}
                            </div>
                            <div className="meal-plan-row-name">{meal.name}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "3px", marginRight: "8px" }}>
                              <Flame size={10} /> {meal.cal}
                            </div>
                            <div className="meal-plan-row-price">₹{meal.price}</div>
                          </div>
                        ))}
                        <div className="meal-plan-footer">
                          <div>
                            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Total</div>
                            <div className="meal-plan-total">₹{msg.mealPlan.total}</div>
                          </div>
                          <div className="meal-plan-macros">
                            <span><CircleDot size={8} color="var(--accent-red)" /> P: {msg.mealPlan.macros.protein}g</span>
                            <span><CircleDot size={8} color="var(--accent-amber)" /> C: {msg.mealPlan.macros.carbs}g</span>
                            <span><CircleDot size={8} color="var(--accent-blue)" /> F: {msg.mealPlan.macros.fat}g</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {msg.actions && (
                    <div className="chat-actions">
                      {msg.actions.map((action) => (
                        <motion.button
                          key={action.label}
                          className={`chat-action-btn ${action.type}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {action.icon} {action.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: "10.5px", color: "var(--text-faint)", marginTop: "8px", paddingLeft: "2px" }}>
                    {msg.timestamp}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              className="chat-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="chat-message-avatar ai">
                <Sparkles size={16} color="white" />
              </div>
              <div className="chat-message-bubble">
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input-bar">
          <div className="chat-input-wrapper">
            <input
              className="chat-input"
              placeholder="Ask Orderly anything... (e.g. 'Order me healthy lunch under ₹300')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-input-btn">
              <Mic size={18} />
            </button>
            <button className="chat-input-btn send" onClick={handleSend}>
              <Send size={16} />
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px", paddingLeft: "2px" }}>
            {["🍕 Order dinner", "📊 Budget status", "🥗 Healthy options"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion.slice(2).trim());
                  }}
                  style={{
                    padding: "5px 14px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "11.5px",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all var(--duration-fast)",
                    fontFamily: "inherit",
                  }}
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Automations Panel */}
      <div className="auto-panel">
        <div className="auto-panel-title">Active Automations</div>
        {automations.map((auto) => (
          <AutomationRule
            key={auto.name}
            name={auto.name}
            detail={auto.detail}
            initialActive={auto.active}
          />
        ))}

        <div
          style={{
            marginTop: "auto",
            padding: "14px",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "var(--brand)" }}>
            💡 AI Insight
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
            You tend to order biryani 3x/week. I&apos;ve added variety to tomorrow&apos;s plan!
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationRule({
  name,
  detail,
  initialActive,
}: {
  name: string;
  detail: string;
  initialActive: boolean;
}) {
  const [active, setActive] = useState(initialActive);

  return (
    <div className="auto-rule">
      <div className="auto-rule-header">
        <div className="auto-rule-name">{name}</div>
        <div className={`toggle ${active ? "active" : ""}`} onClick={() => setActive(!active)}>
          <div className="toggle-knob" />
        </div>
      </div>
      <div className="auto-rule-detail">
        <Clock size={10} style={{ display: "inline", verticalAlign: "-1px", marginRight: "4px" }} />
        {detail}
      </div>
    </div>
  );
}

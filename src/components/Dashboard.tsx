"use client";

import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Clock,
  Utensils,
  ShoppingCart,
  CalendarPlus,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Timer,
  Leaf,
  Dumbbell,
} from "lucide-react";
import type { Page } from "@/app/page";

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

// Budget donut component
function BudgetDonut({ spent, total }: { spent: number; total: number }) {
  const percentage = Math.round((spent / total) * 100);
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="budget-chart">
      <svg width="136" height="136" viewBox="0 0 136 136">
        <circle
          cx="68"
          cy="68"
          r={radius}
          fill="none"
          stroke="var(--bg-elevated)"
          strokeWidth="8"
        />
        <motion.circle
          cx="68"
          cy="68"
          r={radius}
          fill="none"
          stroke="url(#budgetGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="budgetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fc8019" />
            <stop offset="100%" stopColor="#ff9a3d" />
          </linearGradient>
        </defs>
      </svg>
      <div className="budget-center">
        <div className="budget-amount">₹{spent.toLocaleString()}</div>
        <div className="budget-label">of ₹{total.toLocaleString()}</div>
      </div>
    </div>
  );
}

// Meal data
const todayMeals = [
  {
    type: "Breakfast",
    name: "Masala Dosa + Filter Coffee",
    cal: 380,
    time: "8:30 AM",
    emoji: "🥞",
    color: "#f59e0b",
  },
  {
    type: "Lunch",
    name: "Chicken Biryani",
    cal: 620,
    time: "1:00 PM",
    emoji: "🍛",
    color: "#22c55e",
  },
  {
    type: "Dinner",
    name: "Paneer Tikka + Roti",
    cal: 480,
    time: "8:00 PM",
    emoji: "🍽️",
    color: "#a78bfa",
  },
];

const aiSuggestions = [
  {
    name: "Grilled Chicken Bowl",
    meta: "550 kcal • High Protein",
    tag: "Trending",
    emoji: "🥗",
  },
  {
    name: "Mediterranean Pasta",
    meta: "490 kcal • Vegetarian",
    tag: "New",
    emoji: "🍝",
  },
  {
    name: "Quinoa Salad Bowl",
    meta: "320 kcal • Low Carb",
    tag: "Healthy",
    emoji: "🥙",
  },
];

const upcomingOrders = [
  {
    id: "APM3842",
    restaurant: "Meghana Foods",
    time: "Today, 1:00 PM",
    status: "active",
    items: "Chicken Biryani × 1",
  },
  {
    id: "APM3843",
    restaurant: "Barbeque Nation",
    time: "Tomorrow, 7:30 PM",
    status: "pending",
    items: "Dinner reservation",
  },
  {
    id: "APM3844",
    restaurant: "Instamart",
    time: "Sunday, 10:00 AM",
    status: "pending",
    items: "Weekly grocery restock",
  },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div variants={stagger} initial="initial" animate="animate">
      {/* Stats Row */}
      <motion.div
        variants={fadeInUp}
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}
      >
        {[
          {
            label: "Today's Calories",
            value: "1,480",
            sub: "of 2,200 goal",
            icon: <Flame size={16} />,
            color: "amber",
            gradient: "var(--gradient-sunset)",
          },
          {
            label: "Weekly Spend",
            value: "₹2,400",
            sub: "₹2,600 remaining",
            icon: <TrendingUp size={16} />,
            color: "blue",
            gradient: "var(--gradient-brand)",
          },
          {
            label: "Meals Planned",
            value: "18/21",
            sub: "This week",
            icon: <Utensils size={16} />,
            color: "green",
            gradient: "var(--gradient-green)",
          },
          {
            label: "Auto-Orders",
            value: "5",
            sub: "This week",
            icon: <Sparkles size={16} />,
            color: "purple",
            gradient: "var(--gradient-purple)",
          },
        ].map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.color}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: stat.gradient,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {stat.icon}
              </div>
              <ArrowUpRight size={14} color="var(--text-faint)" />
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "2px" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "11.5px", color: "var(--text-faint)" }}>{stat.sub}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px", fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px" }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Today's Meals */}
          <motion.div variants={fadeInUp} className="stat-card blue">
            <div className="section-header">
              <div>
                <div className="section-title">Today&apos;s Meals</div>
                <div className="section-subtitle">{dateStr}</div>
              </div>
              <button
                className="btn btn-outline"
                style={{ padding: "6px 12px", fontSize: "12px" }}
                onClick={() => onNavigate("planner")}
              >
                <CalendarPlus size={13} /> Edit Plan
              </button>
            </div>
            <div className="grid-3">
              {todayMeals.map((meal) => (
                <motion.div
                  key={meal.type}
                  className="meal-slot"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="meal-slot-image"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      background: `linear-gradient(135deg, ${meal.color}12, ${meal.color}06)`,
                    }}
                  >
                    {meal.emoji}
                  </div>
                  <div className="meal-slot-label" style={{ color: meal.color }}>
                    {meal.type}
                  </div>
                  <div className="meal-slot-name">{meal.name}</div>
                  <div className="meal-slot-meta">
                    <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Flame size={10} color="var(--accent-amber)" /> {meal.cal} kcal
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Clock size={10} /> {meal.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Nutrition summary bar */}
            <div
              style={{
                marginTop: "14px",
                padding: "10px 14px",
                background: "var(--bg-elevated)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="nutrition-badge">
                <div className="nutrition-item">
                  <div className="nutrition-dot" style={{ background: "var(--accent-red)" }} />
                  <span>Protein 95g</span>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-dot" style={{ background: "var(--accent-amber)" }} />
                  <span>Carbs 180g</span>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-dot" style={{ background: "var(--accent-blue)" }} />
                  <span>Fat 52g</span>
                </div>
                <div className="nutrition-item">
                  <div className="nutrition-dot" style={{ background: "var(--accent-green)" }} />
                  <span>Fiber 28g</span>
                </div>
              </div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent-green)" }}>
                <Leaf size={12} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
                82/100
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp}>
            <div className="section-header">
              <div className="section-title">Quick Actions</div>
            </div>
            <div className="grid-4">
              {[
                {
                  icon: "🛒",
                  label: "Order Now",
                  bg: "var(--gradient-brand)",
                  page: "chat" as Page,
                },
                {
                  icon: "📅",
                  label: "Plan Tomorrow",
                  bg: "var(--gradient-green)",
                  page: "planner" as Page,
                },
                {
                  icon: "🔁",
                  label: "Reorder Last",
                  bg: "var(--gradient-purple)",
                  page: "chat" as Page,
                },
                {
                  icon: "🤖",
                  label: "Auto Setup",
                  bg: "var(--gradient-sunset)",
                  page: "orders" as Page,
                },
              ].map((action) => (
                <motion.button
                  key={action.label}
                  className="quick-action"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate(action.page)}
                >
                  <div className="quick-action-icon" style={{ background: action.bg, borderRadius: "var(--radius-md)" }}>
                    {action.icon}
                  </div>
                  <div className="quick-action-label">{action.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* AI Suggestions */}
          <motion.div variants={fadeInUp} className="stat-card cyan">
            <div className="section-header">
              <div className="section-title">
                <Sparkles size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "6px", color: "var(--brand)" }} />
                AI Suggestions
              </div>
              <button className="btn btn-ghost" style={{ fontSize: "12px" }}>
                <RotateCcw size={12} /> Refresh
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {aiSuggestions.map((s, i) => (
                <motion.div
                  key={s.name}
                  className="suggestion-card"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <div
                    className="suggestion-image"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      background: "var(--bg-card)",
                    }}
                  >
                    {s.emoji}
                  </div>
                  <div className="suggestion-info">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div className="suggestion-name">{s.name}</div>
                      <span
                        className={`badge ${s.tag === "Trending" ? "amber" : s.tag === "New" ? "blue" : "green"}`}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <div className="suggestion-meta">
                      {s.meta}
                    </div>
                  </div>
                  <button className="suggestion-btn">Add to Plan</button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Budget Widget */}
          <motion.div variants={fadeInUp} className="stat-card blue">
            <div className="section-title" style={{ marginBottom: "4px" }}>
              Weekly Budget
            </div>
            <BudgetDonut spent={2400} total={5000} />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--brand)" }}>48%</div>
                <div style={{ fontSize: "11px", color: "var(--text-faint)" }}>spent</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent-green)" }}>₹2,600</div>
                <div style={{ fontSize: "11px", color: "var(--text-faint)" }}>remaining</div>
              </div>
            </div>
            {/* Daily breakdown */}
            <div
              style={{
                marginTop: "14px",
                padding: "10px 12px",
                background: "var(--bg-elevated)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px", color: "var(--text-muted)" }}>
                Today&apos;s Spend
              </div>
              {[
                { label: "Breakfast", amount: 120, color: "var(--accent-amber)" },
                { label: "Lunch (scheduled)", amount: 250, color: "var(--accent-green)" },
                { label: "Dinner (planned)", amount: 200, color: "var(--accent-purple)" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    padding: "3px 0",
                    color: "var(--text-muted)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    {item.label}
                  </span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{item.amount}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Orders */}
          <motion.div variants={fadeInUp} className="stat-card green">
            <div className="section-title" style={{ marginBottom: "10px" }}>
              Upcoming Orders
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {upcomingOrders.map((order, i) => (
                <div key={order.id} className="order-item" style={{ position: "relative" }}>
                  <div>
                    <div className={`order-dot ${order.status}`} />
                    {i < upcomingOrders.length - 1 && <div className="order-line" />}
                  </div>
                  <div>
                    <div className="order-id">
                      #{order.id}
                      <span style={{ marginLeft: "8px", fontSize: "11px", color: "var(--text-faint)" }}>
                        {order.restaurant}
                      </span>
                    </div>
                    <div className="order-detail">{order.items}</div>
                    <div className="order-detail">
                      <Timer size={10} style={{ display: "inline", verticalAlign: "-1px", marginRight: "3px" }} />
                      {order.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            variants={fadeInUp}
            className="stat-card purple"
            style={{
              background: "var(--gradient-brand-soft)",
              borderColor: "rgba(252, 128, 25, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--gradient-brand)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                <Dumbbell size={18} color="white" />
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}>Health Streak</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--brand)" }}>🔥 12 days</div>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-faint)", lineHeight: 1.5 }}>
              You&apos;ve stayed within your calorie goal for 12 days straight. Keep it up!
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

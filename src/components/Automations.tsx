"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Clock,
  Calendar,
  ShoppingCart,
  Utensils,
  AlertTriangle,
  CheckCircle2,
  Pause,
  Trash2,
  Edit3,
  Zap,
  TrendingUp,
  Package,
} from "lucide-react";

interface AutomationData {
  id: string;
  name: string;
  description: string;
  icon: string;
  trigger: string;
  action: string;
  constraints: string;
  approval: string;
  status: "active" | "paused" | "draft";
  lastTriggered?: string;
  triggerCount: number;
  successRate: number;
  color: string;
}

const automationsData: AutomationData[] = [
  {
    id: "1",
    name: "Auto-order Lunch",
    description: "Orders from top AI suggestion if no order placed by trigger time",
    icon: "🍛",
    trigger: "Weekdays at 11:30 AM IST",
    action: "Order from top AI suggestion (budget ≤₹250)",
    constraints: "Max ₹250/order, vegetarian on Mon/Thu",
    approval: "Push notification — 15 min approval window",
    status: "active",
    lastTriggered: "Today, 11:30 AM ✅",
    triggerCount: 47,
    successRate: 94,
    color: "var(--accent-blue)",
  },
  {
    id: "2",
    name: "Weekly Grocery Restock",
    description: "Auto-orders essential groceries via Instamart every Sunday",
    icon: "🛒",
    trigger: "Every Sunday at 10:00 AM IST",
    action: "Reorder essential groceries via Instamart",
    constraints: "Budget ≤₹800/week, includes: Milk, Eggs, Bread, Vegetables",
    approval: "Required — review in app before placing",
    status: "active",
    lastTriggered: "Last Sunday, 10:00 AM ✅",
    triggerCount: 12,
    successRate: 100,
    color: "var(--accent-green)",
  },
  {
    id: "3",
    name: "Weekly Meal Plan",
    description: "Generates AI-optimized meal plan every Monday morning",
    icon: "📅",
    trigger: "Every Monday at 7:00 AM IST",
    action: "Generate meal plan for the entire week",
    constraints: "₹5,000 weekly budget, high-protein, vegetarian Mondays",
    approval: "Required — review and modify in Meal Planner",
    status: "active",
    lastTriggered: "Monday, 7:00 AM ✅",
    triggerCount: 8,
    successRate: 88,
    color: "var(--accent-amber)",
  },
  {
    id: "4",
    name: "Budget Alert",
    description: "Notifies when weekly food spend exceeds 80% of budget",
    icon: "💰",
    trigger: "When weekly spend > 80% of budget",
    action: "Push notification + suggest cost-saving alternatives",
    constraints: "Budget: ₹5,000/week",
    approval: "Info-only — no action required",
    status: "active",
    lastTriggered: "Wednesday ⚠️",
    triggerCount: 3,
    successRate: 100,
    color: "var(--accent-red)",
  },
  {
    id: "5",
    name: "Dinner Reservation",
    description: "Auto-books Barbeque Nation every Friday for family dinner",
    icon: "🍽️",
    trigger: "Every Friday at 3:00 PM IST",
    action: "Book Dineout reservation — Barbeque Nation, 4 people, 7:30 PM",
    constraints: "Budget ≤₹2,000, preferred table: window",
    approval: "Auto-confirm (no approval needed)",
    status: "paused",
    lastTriggered: "2 weeks ago",
    triggerCount: 6,
    successRate: 83,
    color: "var(--accent-purple)",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function Automations() {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null);

  const activeCount = automationsData.filter((a) => a.status === "active").length;
  const totalTriggered = automationsData.reduce((s, a) => s + a.triggerCount, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Stats */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            <Zap size={20} style={{ display: "inline", verticalAlign: "-3px", marginRight: "8px", color: "var(--brand)" }} />
            Automation Rules
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Set up autonomous actions — let AI manage your meals
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> New Rule
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          {
            icon: <CheckCircle2 size={18} />,
            label: "Active Rules",
            value: activeCount.toString(),
            gradient: "var(--gradient-green)",
          },
          {
            icon: <TrendingUp size={18} />,
            label: "Total Triggers",
            value: totalTriggered.toString(),
            gradient: "var(--gradient-blue)",
          },
          {
            icon: <Package size={18} />,
            label: "Auto-Orders Placed",
            value: "47",
            gradient: "var(--gradient-purple)",
          },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: stat.gradient,
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Automation Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {automationsData.map((auto, index) => (
          <AutomationCard
            key={auto.id}
            data={auto}
            index={index}
            isExpanded={selectedAutomation === auto.id}
            onToggleExpand={() =>
              setSelectedAutomation(selectedAutomation === auto.id ? null : auto.id)
            }
          />
        ))}
      </div>
    </motion.div>
  );
}

function AutomationCard({
  data,
  index,
  isExpanded,
  onToggleExpand,
}: {
  data: AutomationData;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const [status, setStatus] = useState(data.status);

  return (
    <motion.div
      className="automation-full-card"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay: index * 0.05 }}
      style={{
        borderLeftWidth: "3px",
        borderLeftColor: status === "active" ? data.color : "var(--border-subtle)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={onToggleExpand}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-elevated)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            {data.icon}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700 }}>{data.name}</span>
              <span
                className={`badge ${
                  status === "active" ? "green" : status === "paused" ? "amber" : "blue"
                }`}
              >
                {status === "active" ? (
                  <CheckCircle2 size={10} />
                ) : status === "paused" ? (
                  <Pause size={10} />
                ) : null}
                {status}
              </span>
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              {data.description}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ textAlign: "right", marginRight: "8px" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              <Clock size={10} style={{ display: "inline", verticalAlign: "-1px", marginRight: "3px" }} />
              {data.lastTriggered || "Never"}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
              {data.triggerCount} triggers • {data.successRate}% success
            </div>
          </div>
          <div
            className={`toggle ${status === "active" ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setStatus(status === "active" ? "paused" : "active");
            }}
          >
            <div className="toggle-knob" />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-subtle)",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              <DetailRow icon={<Calendar size={13} />} label="Trigger" value={data.trigger} />
              <DetailRow icon={<ShoppingCart size={13} />} label="Action" value={data.action} />
              <DetailRow
                icon={<AlertTriangle size={13} />}
                label="Constraints"
                value={data.constraints}
              />
              <DetailRow icon={<CheckCircle2 size={13} />} label="Approval" value={data.approval} />
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "14px",
                paddingTop: "14px",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <button className="btn btn-outline" style={{ padding: "6px 14px", fontSize: "12px" }}>
                <Edit3 size={13} /> Edit Rule
              </button>
              <button className="btn btn-outline" style={{ padding: "6px 14px", fontSize: "12px" }}>
                <Pause size={13} /> {status === "active" ? "Pause" : "Resume"}
              </button>
              <button
                className="btn btn-ghost"
                style={{
                  padding: "6px 14px",
                  fontSize: "12px",
                  color: "var(--accent-red)",
                  marginLeft: "auto",
                }}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "5px" }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{value}</div>
    </div>
  );
}

"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Zap,
  MessageSquare,
  Settings,
  ChefHat,
} from "lucide-react";
import type { Page } from "@/app/page";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
  { id: "planner", label: "Meal Planner", icon: <CalendarDays /> },
  { id: "orders", label: "Automations", icon: <Zap /> },
  { id: "chat", label: "Orderly AI", icon: <MessageSquare /> },
  { id: "settings", label: "Settings", icon: <Settings /> },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <ChefHat size={18} color="white" />
        </div>
        <span className="sidebar-logo-text">Orderly</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ padding: "12px", borderTop: "1px solid var(--border-subtle)" }}>
        <div
          style={{
            background: "var(--gradient-brand-soft)",
            borderRadius: "var(--radius-sm)",
            padding: "12px",
            border: "1px solid rgba(252, 128, 25, 0.08)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--brand)", marginBottom: "3px" }}>
            Pro Plan
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-faint)", marginBottom: "8px" }}>
            Unlimited AI • Auto-order
          </div>
          <div
            style={{
              height: "3px",
              background: "var(--bg-elevated)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "72%",
                height: "100%",
                background: "var(--gradient-brand)",
                borderRadius: "2px",
              }}
            />
          </div>
          <div style={{ fontSize: "10px", color: "var(--text-faint)", marginTop: "5px" }}>
            18/25 AI calls today
          </div>
        </div>
      </div>
    </aside>
  );
}

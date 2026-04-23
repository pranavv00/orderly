"use client";

import { Bell, Search, Command } from "lucide-react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "7px 14px",
            cursor: "pointer",
            transition: "all var(--duration-fast)",
            marginRight: "4px",
          }}
        >
          <Search size={13} color="var(--text-faint)" />
          <span style={{ fontSize: "12.5px", color: "var(--text-faint)", letterSpacing: "-0.01em" }}>
            Search meals, restaurants...
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: "var(--bg-elevated)",
              borderRadius: "4px",
              padding: "2px 5px",
              fontSize: "10px",
              color: "var(--text-faint)",
              fontWeight: 500,
            }}
          >
            <Command size={9} />K
          </div>
        </div>
        <button className="header-btn" style={{ position: "relative" }}>
          <Bell size={16} />
          <div
            style={{
              position: "absolute",
              top: "7px",
              right: "7px",
              width: "6px",
              height: "6px",
              background: "var(--brand)",
              borderRadius: "50%",
              border: "1.5px solid var(--bg-primary)",
            }}
          />
        </button>
        <div className="avatar">PG</div>
      </div>
    </header>
  );
}

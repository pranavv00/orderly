"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ChatInterface from "@/components/ChatInterface";
import Automations from "@/components/Automations";
import MealPlanner from "@/components/MealPlanner";
import Settings from "@/components/Settings";

export type Page = "dashboard" | "planner" | "orders" | "chat" | "settings";

export default function Home() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard onNavigate={setActivePage} />;
      case "chat":
        return <ChatInterface />;
      case "orders":
        return <Automations />;
      case "planner":
        return <MealPlanner />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  const pageTitle: Record<Page, string> = {
    dashboard: "Dashboard",
    planner: "Meal Planner",
    orders: "Automations",
    chat: "Orderly AI",
    settings: "Settings",
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-content">
        <Header title={pageTitle[activePage]} />
        {activePage === "chat" ? (
          renderPage()
        ) : (
          <div className="page-content">{renderPage()}</div>
        )}
      </div>
    </div>
  );
}

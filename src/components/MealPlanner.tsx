"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Plus,
  Flame,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface MealSlot {
  type: "breakfast" | "lunch" | "dinner" | "snack";
  name?: string;
  emoji?: string;
  cal?: number;
  cost?: number;
  color: string;
}

interface DayPlan {
  date: Date;
  meals: MealSlot[];
}

const mealColors: Record<string, string> = {
  breakfast: "var(--accent-amber)",
  lunch: "var(--accent-green)",
  dinner: "var(--accent-purple)",
  snack: "var(--accent-cyan)",
};

function generateWeekPlan(startDate: Date): DayPlan[] {
  const meals: Record<string, { name: string; emoji: string; cal: number; cost: number }[]> = {
    breakfast: [
      { name: "Masala Dosa", emoji: "🥞", cal: 350, cost: 80 },
      { name: "Poha + Chai", emoji: "🍵", cal: 280, cost: 60 },
      { name: "Egg Bhurji Toast", emoji: "🍳", cal: 400, cost: 95 },
      { name: "Idli Sambar", emoji: "🫓", cal: 300, cost: 70 },
      { name: "Oats + Fruits", emoji: "🥣", cal: 250, cost: 50 },
      { name: "Paratha + Curd", emoji: "🫓", cal: 420, cost: 85 },
      { name: "Upma + Coffee", emoji: "☕", cal: 310, cost: 65 },
    ],
    lunch: [
      { name: "Chicken Biryani", emoji: "🍛", cal: 620, cost: 220 },
      { name: "Paneer Thali", emoji: "🍱", cal: 550, cost: 180 },
      { name: "Rajma Chawal", emoji: "🍚", cal: 480, cost: 150 },
      { name: "Fish Curry Rice", emoji: "🐟", cal: 500, cost: 200 },
      { name: "Dal Makhani + Naan", emoji: "🫓", cal: 580, cost: 190 },
      { name: "Chole Bhature", emoji: "🍛", cal: 650, cost: 160 },
      { name: "Veg Fried Rice", emoji: "🍚", cal: 450, cost: 140 },
    ],
    dinner: [
      { name: "Paneer Tikka + Roti", emoji: "🍽️", cal: 480, cost: 200 },
      { name: "Grilled Chicken", emoji: "🍗", cal: 420, cost: 250 },
      { name: "Palak Dal + Rice", emoji: "🥗", cal: 380, cost: 140 },
      { name: "Pasta Arrabiata", emoji: "🍝", cal: 520, cost: 230 },
      { name: "Butter Chicken", emoji: "🍛", cal: 600, cost: 280 },
      { name: "Mushroom Risotto", emoji: "🍚", cal: 450, cost: 260 },
      { name: "Dosa + Chutney", emoji: "🥞", cal: 350, cost: 120 },
    ],
  };

  const days: DayPlan[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dayMeals: MealSlot[] = [
      {
        type: "breakfast",
        ...meals.breakfast[i],
        color: mealColors.breakfast,
      },
      {
        type: "lunch",
        ...meals.lunch[i],
        color: mealColors.lunch,
      },
      {
        type: "dinner",
        ...meals.dinner[i],
        color: mealColors.dinner,
      },
    ];

    days.push({ date, meals: dayMeals });
  }

  return days;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function MealPlanner() {
  const [currentWeek, setCurrentWeek] = useState(getWeekStart(new Date()));
  const weekPlan = generateWeekPlan(currentWeek);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekTotal = weekPlan.reduce(
    (acc, day) => ({
      cost: acc.cost + day.meals.reduce((s, m) => s + (m.cost || 0), 0),
      cal: acc.cal + day.meals.reduce((s, m) => s + (m.cal || 0), 0),
    }),
    { cost: 0, cal: 0 }
  );

  const navigateWeek = (dir: number) => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + dir * 7);
    setCurrentWeek(next);
  };

  const weekLabel = `${currentWeek.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} — ${new Date(
    currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Meal Planner
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Plan, track, and optimize your weekly meals
          </p>
        </div>
        <button className="btn btn-primary">
          <Sparkles size={16} /> Generate with AI
        </button>
      </div>

      {/* Week Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          padding: "12px 16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <button className="btn btn-ghost" style={{ padding: "6px" }} onClick={() => navigateWeek(-1)}>
          <ChevronLeft size={20} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "15px", fontWeight: 700 }}>{weekLabel}</span>
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <DollarSign size={12} color="var(--accent-green)" /> ₹{weekTotal.cost.toLocaleString()}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Flame size={12} color="var(--accent-amber)" /> {weekTotal.cal.toLocaleString()} kcal avg/day
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <TrendingUp size={12} color="var(--accent-blue)" /> On budget
            </span>
          </div>
        </div>
        <button className="btn btn-ghost" style={{ padding: "6px" }} onClick={() => navigateWeek(1)}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="planner-week">
        {weekPlan.map((day) => {
          const isToday = day.date.getTime() === today.getTime();
          const dayLabel = day.date.toLocaleDateString("en-US", { weekday: "short" });
          const dateNum = day.date.getDate();
          const dayCost = day.meals.reduce((s, m) => s + (m.cost || 0), 0);
          const dayCal = day.meals.reduce((s, m) => s + (m.cal || 0), 0);

          return (
            <motion.div
              key={day.date.toISOString()}
              className={`planner-day ${isToday ? "today" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * weekPlan.indexOf(day) }}
            >
              <div className={`planner-day-header ${isToday ? "today" : ""}`}>
                {dayLabel} {dateNum}
                {isToday && (
                  <span style={{ marginLeft: "6px", fontSize: "9px", background: "var(--brand)", color: "white", padding: "1px 6px", borderRadius: "var(--radius-full)", verticalAlign: "1px" }}>
                    TODAY
                  </span>
                )}
              </div>

              {day.meals.map((meal) => (
                <div key={meal.type} className="planner-meal-item">
                  <div className="planner-meal-type" style={{ color: meal.color }}>
                    {meal.emoji} {meal.type}
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: "2px" }}>{meal.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "10px" }}>
                    <span>{meal.cal} kcal</span>
                    <span style={{ color: "var(--accent-green)" }}>₹{meal.cost}</span>
                  </div>
                </div>
              ))}

              {/* Add meal button */}
              <button
                style={{
                  width: "100%",
                  padding: "6px",
                  background: "transparent",
                  border: "1px dashed var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-muted)",
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  marginTop: "4px",
                  transition: "all var(--duration-fast)",
                  fontFamily: "inherit",
                }}
              >
                <Plus size={12} /> Add Snack
              </button>

              {/* Day Summary */}
              <div
                style={{
                  marginTop: "8px",
                  paddingTop: "8px",
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                }}
              >
                <span>{dayCal} kcal</span>
                <span style={{ fontWeight: 600, color: "var(--accent-green)" }}>₹{dayCost}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: "20px",
          padding: "16px 20px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "32px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>Total Cost</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-green)" }}>
              ₹{weekTotal.cost.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>Avg Cal/Day</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-amber)" }}>
              {Math.round(weekTotal.cal / 7).toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>Meals Planned</div>
            <div style={{ fontSize: "20px", fontWeight: 700 }}>21/21</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>Budget Status</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-blue)" }}>
              On Track ✓
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn btn-outline" style={{ fontSize: "13px" }}>
            Export Plan
          </button>
          <button className="btn btn-primary" style={{ fontSize: "13px" }}>
            Confirm Week
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

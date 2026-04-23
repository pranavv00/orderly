"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  CreditCard,
  Shield,
  Bell,
  Palette,
  Bot,
  Heart,
  Trash2,
  Plus,
  Save,
} from "lucide-react";

interface SettingsSection {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const sections: SettingsSection[] = [
  { id: "profile", icon: <User size={18} />, label: "Profile" },
  { id: "preferences", icon: <Heart size={18} />, label: "Food Preferences" },
  { id: "budget", icon: <CreditCard size={18} />, label: "Budget & Payments" },
  { id: "ai", icon: <Bot size={18} />, label: "AI Settings" },
  { id: "notifications", icon: <Bell size={18} />, label: "Notifications" },
  { id: "addresses", icon: <MapPin size={18} />, label: "Addresses" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [dietaryTags, setDietaryTags] = useState([
    "Vegetarian on Mondays",
    "High Protein",
    "No Peanuts",
    "Low Sugar",
  ]);
  const [cuisines, setCuisines] = useState([
    "South Indian",
    "North Indian",
    "Chinese",
    "Italian",
    "Continental",
  ]);

  const removeDietaryTag = (tag: string) => {
    setDietaryTags(dietaryTags.filter((t) => t !== tag));
  };

  const removeCuisine = (cuisine: string) => {
    setCuisines(cuisines.filter((c) => c !== cuisine));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Settings</h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
            Manage your preferences, budget, and AI behavior
          </p>
        </div>
        <button className="btn btn-primary">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px" }}>
        {/* Section Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? "active" : ""}`}
              onClick={() => setActiveSection(section.id)}
              style={{ textAlign: "left" }}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeSection === "profile" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="settings-section">
                <div className="settings-section-title">
                  <User size={18} style={{ display: "inline", verticalAlign: "-3px", marginRight: "8px" }} />
                  Profile Information
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Full Name</div>
                    <div className="settings-row-desc">Your display name</div>
                  </div>
                  <input className="settings-input" defaultValue="Pranav Gawande" />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Email</div>
                    <div className="settings-row-desc">Account email</div>
                  </div>
                  <input className="settings-input" defaultValue="pranav@example.com" />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Phone</div>
                    <div className="settings-row-desc">For SMS notifications</div>
                  </div>
                  <input className="settings-input" defaultValue="+91 98765 43210" />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Location</div>
                    <div className="settings-row-desc">For restaurant search</div>
                  </div>
                  <input className="settings-input" defaultValue="Bangalore, India" />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "preferences" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="settings-section">
                <div className="settings-section-title">
                  <Heart size={18} style={{ display: "inline", verticalAlign: "-3px", marginRight: "8px" }} />
                  Dietary Preferences
                </div>
                <div className="settings-row">
                  <div style={{ flex: 1 }}>
                    <div className="settings-row-label">Dietary Tags</div>
                    <div className="settings-row-desc">AI will respect these in every suggestion</div>
                    <div className="tag-list" style={{ marginTop: "8px" }}>
                      {dietaryTags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                          <span className="remove" onClick={() => removeDietaryTag(tag)}>×</span>
                        </span>
                      ))}
                      <button
                        className="tag"
                        style={{ cursor: "pointer", borderStyle: "dashed", color: "var(--brand)" }}
                      >
                        <Plus size={12} /> Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="settings-row">
                  <div style={{ flex: 1 }}>
                    <div className="settings-row-label">Preferred Cuisines</div>
                    <div className="settings-row-desc">AI prefers these when suggesting meals</div>
                    <div className="tag-list" style={{ marginTop: "8px" }}>
                      {cuisines.map((c) => (
                        <span key={c} className="tag">
                          {c}
                          <span className="remove" onClick={() => removeCuisine(c)}>×</span>
                        </span>
                      ))}
                      <button
                        className="tag"
                        style={{ cursor: "pointer", borderStyle: "dashed", color: "var(--brand)" }}
                      >
                        <Plus size={12} /> Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Calorie Goal</div>
                    <div className="settings-row-desc">Daily target</div>
                  </div>
                  <input className="settings-input" defaultValue="2,200 kcal" style={{ width: "140px" }} />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Allergens</div>
                    <div className="settings-row-desc">AI will strictly avoid these</div>
                  </div>
                  <div className="tag-list">
                    <span className="tag" style={{ borderColor: "rgba(239, 68, 68, 0.3)", color: "var(--accent-red)" }}>
                      🥜 Peanuts <span className="remove">×</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <div className="settings-section-title">Meal Schedule</div>
                {[
                  { meal: "Breakfast", time: "08:30" },
                  { meal: "Lunch", time: "13:00" },
                  { meal: "Dinner", time: "20:00" },
                ].map((m) => (
                  <div key={m.meal} className="settings-row">
                    <div className="settings-row-label">{m.meal} Time</div>
                    <input className="settings-input" type="time" defaultValue={m.time} style={{ width: "140px" }} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "budget" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="settings-section">
                <div className="settings-section-title">
                  <CreditCard size={18} style={{ display: "inline", verticalAlign: "-3px", marginRight: "8px" }} />
                  Budget Settings
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Weekly Budget</div>
                    <div className="settings-row-desc">AI enforces this limit across all platforms</div>
                  </div>
                  <input className="settings-input" defaultValue="₹5,000" style={{ width: "140px" }} />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Monthly Budget</div>
                    <div className="settings-row-desc">Overall monthly cap</div>
                  </div>
                  <input className="settings-input" defaultValue="₹20,000" style={{ width: "140px" }} />
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Budget Alert Threshold</div>
                    <div className="settings-row-desc">Notify when spend exceeds this %</div>
                  </div>
                  <input className="settings-input" defaultValue="80%" style={{ width: "140px" }} />
                </div>
              </div>

              <div className="settings-section">
                <div className="settings-section-title">Connected Platforms</div>
                {[
                  { name: "Swiggy", status: "Connected", color: "green" },
                  { name: "Zomato", status: "Not Connected", color: "amber" },
                  { name: "Instamart", status: "Connected", color: "green" },
                  { name: "Dineout", status: "Not Connected", color: "amber" },
                ].map((p) => (
                  <div key={p.name} className="settings-row">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="settings-row-label">{p.name}</div>
                      <span className={`badge ${p.color}`}>{p.status}</span>
                    </div>
                    <button className="btn btn-outline" style={{ fontSize: "12px", padding: "6px 12px" }}>
                      {p.status === "Connected" ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "ai" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="settings-section">
                <div className="settings-section-title">
                  <Bot size={18} style={{ display: "inline", verticalAlign: "-3px", marginRight: "8px" }} />
                  AI Agent Behavior
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Autonomy Level</div>
                    <div className="settings-row-desc">How much freedom the AI has</div>
                  </div>
                  <select
                    className="settings-input"
                    defaultValue="approval"
                    style={{ width: "200px", cursor: "pointer" }}
                  >
                    <option value="suggest">Suggest Only</option>
                    <option value="approval">Order with Approval</option>
                    <option value="autopilot">Full Autopilot</option>
                  </select>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="settings-row-label">Approval Window</div>
                    <div className="settings-row-desc">Time to approve before auto-cancel</div>
                  </div>
                  <select className="settings-input" defaultValue="15" style={{ width: "140px", cursor: "pointer" }}>
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="never">Never auto-cancel</option>
                  </select>
                </div>

                <div style={{ marginTop: "16px", padding: "16px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>
                    Scoring Weights
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                    Adjust how the AI prioritizes different factors when making meal decisions.
                  </div>
                  {[
                    { label: "Budget", value: 25, color: "var(--accent-green)" },
                    { label: "Health", value: 20, color: "var(--accent-red)" },
                    { label: "Variety", value: 15, color: "var(--accent-purple)" },
                    { label: "Habit Match", value: 15, color: "var(--accent-amber)" },
                    { label: "Convenience", value: 15, color: "var(--accent-blue)" },
                    { label: "Mood/Craving", value: 10, color: "var(--accent-pink)" },
                  ].map((weight) => (
                    <div
                      key={weight.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ width: "100px", fontSize: "12px", fontWeight: 500 }}>
                        {weight.label}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: "6px",
                          background: "var(--bg-card)",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${weight.value * 4}%`,
                            height: "100%",
                            background: weight.color,
                            borderRadius: "3px",
                            transition: "width var(--transition-base)",
                          }}
                        />
                      </div>
                      <div style={{ width: "40px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: weight.color }}>
                        {weight.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="settings-section">
                <div className="settings-section-title">
                  <Bell size={18} style={{ display: "inline", verticalAlign: "-3px", marginRight: "8px" }} />
                  Notification Preferences
                </div>
                {[
                  { label: "Order Approvals", desc: "When AI wants to place an order", enabled: true },
                  { label: "Order Updates", desc: "Delivery status changes", enabled: true },
                  { label: "Budget Alerts", desc: "When approaching budget limit", enabled: true },
                  { label: "Weekly Summary", desc: "Weekly spend & nutrition report", enabled: true },
                  { label: "AI Suggestions", desc: "Proactive meal ideas", enabled: false },
                  { label: "Promotional", desc: "Deals and restaurant offers", enabled: false },
                ].map((notif) => (
                  <NotificationRow key={notif.label} label={notif.label} desc={notif.desc} initialEnabled={notif.enabled} />
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "addresses" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="settings-section">
                <div className="settings-section-title">
                  <MapPin size={18} style={{ display: "inline", verticalAlign: "-3px", marginRight: "8px" }} />
                  Saved Addresses
                </div>
                {[
                  {
                    label: "Home",
                    address: "123, Koramangala 4th Block, Bangalore 560034",
                    isDefault: true,
                  },
                  {
                    label: "Work",
                    address: "WeWork, 14th Floor, Prestige Tower, MG Road, Bangalore 560001",
                    isDefault: false,
                  },
                ].map((addr) => (
                  <div key={addr.label} className="settings-row">
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          background: "var(--bg-elevated)",
                          borderRadius: "var(--radius-md)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MapPin size={16} color="var(--brand)" />
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div className="settings-row-label">{addr.label}</div>
                          {addr.isDefault && <span className="badge blue">Default</span>}
                        </div>
                        <div className="settings-row-desc">{addr.address}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button className="btn btn-ghost" style={{ fontSize: "12px", padding: "4px 8px" }}>
                        Edit
                      </button>
                      <button className="btn btn-ghost" style={{ fontSize: "12px", padding: "4px 8px", color: "var(--accent-red)" }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-outline"
                  style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function NotificationRow({
  label,
  desc,
  initialEnabled,
}: {
  label: string;
  desc: string;
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);

  return (
    <div className="settings-row">
      <div>
        <div className="settings-row-label">{label}</div>
        <div className="settings-row-desc">{desc}</div>
      </div>
      <div className={`toggle ${enabled ? "active" : ""}`} onClick={() => setEnabled(!enabled)}>
        <div className="toggle-knob" />
      </div>
    </div>
  );
}

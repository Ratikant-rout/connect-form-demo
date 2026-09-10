import React from "react";
import {
  Database,
  Plug,
  BarChart3,
  Code2
} from "lucide-react";

const navigationItems = [
  {
    id: "sap",
    label: "SAP Integration",
    icon: Database
  },
  {
    id: "connect",
    label: "Consumer Connection",
    icon: Plug
  },
  {
    id: "provider",
    label: "Provider Dashboard",
    icon: BarChart3
  },
  {
    id: "explorer",
    label: "API Explorer",
    icon: Code2
  }
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="portal-navigation">
      <div className="portal-navigation-inner">

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`portal-nav-item ${
                isActive ? "active" : ""
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}

      </div>
    </nav>
  );
}
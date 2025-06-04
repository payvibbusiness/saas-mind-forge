
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Home,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  Plus,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen w-64 bg-background glass-panel border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text">SaaS Validator</h1>
        <p className="text-xs text-muted-foreground mt-1">AI-Powered Idea Validation</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-8">
          <Button
            variant="default"
            className="w-full flex items-center gap-2 mb-6"
            asChild
          >
            <Link to="/ideas/new">
              <Plus size={18} />
              <span>New Idea</span>
            </Link>
          </Button>

          <div className="space-y-1">
            <Link
              to="/dashboard"
              className={cn("nav-item", {
                active: isActive("/dashboard"),
              })}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/ideas"
              className={cn("nav-item", {
                active: isActive("/ideas"),
              })}
            >
              <Lightbulb size={20} />
              <span>My Ideas</span>
            </Link>
            <Link
              to="/analytics"
              className={cn("nav-item", {
                active: isActive("/analytics"),
              })}
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium px-3 py-2">
            Settings
          </p>
          <Link
            to="/settings"
            className={cn("nav-item", {
              active: isActive("/settings"),
            })}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="nav-item w-full text-left"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button
            onClick={() => logout()}
            className="nav-item w-full text-left text-red-500"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-accent"></div>
          <div>
            <p className="text-sm font-medium">Free Plan</p>
            <Link to="/settings" className="text-xs text-accent hover:underline">
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

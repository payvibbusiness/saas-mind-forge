
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
  requireAuth?: boolean;
};

const AppLayout = ({ children, title, requireAuth = true }: AppLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title={title} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

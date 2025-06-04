
import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AppHeader = ({ title }: { title: string }) => {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-border">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 bg-background border-border"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent"></span>
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-medium">
          BK
        </div>
      </div>
    </header>
  );
};

export default AppHeader;


import React from "react";
import { Link } from "react-router-dom";
import { Lightbulb } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - branding */}
      <div className="w-full md:w-1/2 bg-primary p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <Lightbulb size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">SaaS Idea Validator</h1>
          <p className="text-lg text-white/80 mb-8">
            Validate your SaaS ideas with AI-powered insights before you build
          </p>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-white/70">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">3x</div>
              <div className="text-sm text-white/70">Faster Validation</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1,500+</div>
              <div className="text-sm text-white/70">Ideas Analyzed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">$5M+</div>
              <div className="text-sm text-white/70">Capital Saved</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - auth form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

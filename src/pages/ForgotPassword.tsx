
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.error("Password reset failed:", error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Forgot Password" 
      description="Enter your email to reset your password"
    >
      {isSubmitted ? (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Check your email</h3>
          <p className="text-muted-foreground mb-4">
            We've sent a password reset link to {email}
          </p>
          <div className="flex flex-col space-y-4">
            <Button asChild variant="outline">
              <Link to="/login">Back to login</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsSubmitted(false)}
            >
              Try another email
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending reset link..." : "Send reset link"}
          </Button>
        
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="text-accent hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;

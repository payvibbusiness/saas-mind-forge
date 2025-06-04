import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIdeas } from "@/contexts/IdeasContext";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, ChevronRight, Lightbulb, Zap } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type SubscriptionPlan = "free" | "basic" | "pro";
type AiProvider = "openai" | "gemini" | "grok";

const Dashboard = () => {
  const { ideas } = useIdeas();
  const { user } = useAuth();

  const validatedIdeas = ideas.filter((idea) => idea.validated);
  const pendingIdeas = ideas.filter((idea) => !idea.validated);

  // These could come from user preferences/database in the future
  const getUserSubscription = (): SubscriptionPlan => "free";
  const getUserAiProvider = (): AiProvider => "openai";
  
  const userSubscription = getUserSubscription();
  const userAiProvider = getUserAiProvider();

  const chartData = [
    { name: "Market Fit", value: 76 },
    { name: "Competition", value: 54 },
    { name: "Execution", value: 82 },
    { name: "Profitability", value: 65 },
    { name: "Innovation", value: 90 },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{ideas.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {validatedIdeas.length} validated, {pendingIdeas.length} pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Market Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {validatedIdeas.length > 0
                ? (
                    validatedIdeas.reduce(
                      (sum, idea) => sum + idea.validation!.marketDemand,
                      0
                    ) / validatedIdeas.length
                  ).toFixed(1)
                : "N/A"}
              <span className="text-sm font-normal text-muted-foreground">/10</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {validatedIdeas.length} validated ideas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subscription Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold capitalize">
              {userSubscription}
            </div>
            <div className="flex items-center mt-1">
              <p className="text-xs text-muted-foreground">
                {userSubscription === "pro"
                  ? "Unlimited validations"
                  : userSubscription === "basic"
                  ? "7 validations left this month"
                  : "3 validations left this month"}
              </p>
              {userSubscription !== "pro" && (
                <Link
                  to="/settings"
                  className="text-xs text-accent hover:underline ml-2"
                >
                  Upgrade
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Provider Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" />
            AI Provider
          </CardTitle>
          <CardDescription>
            You're currently using {userAiProvider === "openai" ? "OpenAI" : userAiProvider === "gemini" ? "Gemini" : "Grok"} as your AI provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center">
                <img 
                  src={`/placeholder.svg`} 
                  alt={userAiProvider === "openai" ? "OpenAI" : userAiProvider === "gemini" ? "Gemini" : "Grok"} 
                  className="h-8 w-8"
                />
              </div>
              <div>
                <h3 className="font-medium">{userAiProvider === "openai" ? "OpenAI" : userAiProvider === "gemini" ? "Gemini" : "Grok"}</h3>
                <p className="text-sm text-muted-foreground">
                  {userAiProvider === "gemini" 
                    ? "Google's Gemini AI" 
                    : userAiProvider === "grok" 
                    ? "xAI's Grok" 
                    : "OpenAI's GPT models"}
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/settings">Change Provider</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Ideas</CardTitle>
              <CardDescription>Your latest SaaS concepts</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/ideas">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ideas.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="font-medium text-lg mb-1">No ideas yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start by adding your first SaaS idea
                  </p>
                  <Button asChild>
                    <Link to="/ideas/new">Add Your First Idea</Link>
                  </Button>
                </div>
              ) : (
                ideas
                  .slice(0, 3)
                  .map((idea) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border"
                    >
                      <div>
                        <h3 className="font-medium mb-1">{idea.title}</h3>
                        <div className="flex items-center">
                          {idea.validated ? (
                            <>
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-xs text-muted-foreground">
                                Validated on{" "}
                                {new Date(
                                  idea.validation!.validatedAt
                                ).toLocaleDateString()}
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                              <span className="text-xs text-muted-foreground">
                                Not validated
                              </span>
                            </>
                          )}
                          {idea.validated && (
                            <div className="ml-3 flex items-center">
                              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                              <span className="text-xs text-muted-foreground">
                                {idea.validation!.marketDemand}/10 Market Fit
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/ideas/${idea.id}`}>View</Link>
                      </Button>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Analysis</CardTitle>
              <CardDescription>Industry trends overview</CardDescription>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/analytics">
                <BarChart3 className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--accent))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <Link
                to="/analytics"
                className="text-sm text-accent hover:underline"
              >
                View detailed analytics
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

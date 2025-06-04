
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Zap, BarChart3, Check, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "AI-Powered Idea Validation",
    description: "Leverage the power of multiple AI models to validate your SaaS ideas before you invest time and resources."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Market Analysis",
    description: "Get detailed insights into market demand, competitor landscape, and potential target audiences."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Multi-Model AI Support",
    description: "Choose from Gemini, OpenAI, or Grok to power your idea validation, with different strengths and insights."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "ROI Projections",
    description: "Estimate potential returns, effort required, and optimal pricing strategies for your SaaS idea."
  }
];

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Startup Founder",
    content: "This tool helped me validate 3 different SaaS ideas and choose the one with the highest market potential. Saved me months of development time!"
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    content: "The AI insights were surprisingly accurate. My team has been able to pivot our strategy based on the competitive analysis provided."
  },
  {
    name: "Mike Johnson",
    role: "Solo Developer",
    content: "As a solo developer with limited resources, this tool has been invaluable. I can now make data-driven decisions before committing to an idea."
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with basic validation",
    features: [
      "3 idea validations per month",
      "Basic AI analysis",
      "Export to PDF",
      "Standard response time"
    ]
  },
  {
    name: "Basic",
    price: "$9.99",
    description: "For serious founders",
    features: [
      "10 idea validations per month",
      "Advanced AI analysis",
      "Export to PDF and Notion",
      "Competitor analysis",
      "Priority support"
    ]
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Complete validation suite",
    isPopular: true,
    features: [
      "Unlimited idea validations",
      "Premium AI analysis",
      "All export options",
      "Competitor analysis",
      "Market trend reports",
      "ROI projections",
      "24/7 priority support"
    ]
  }
];

const Landing = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">SaaS Validator</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-accent transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-accent transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm hover:text-accent transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Validate Your SaaS Ideas with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stop wasting time on ideas that won't work. Use AI to validate market fit, analyze competition, and project ROI before you start building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none h-40 bottom-0 top-auto"></div>
            <div className="bg-accent/5 border border-border rounded-2xl p-3">
              {/* This would be a dashboard screenshot in a real app */}
              <div className="aspect-video bg-background rounded-xl flex items-center justify-center p-6">
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 text-accent mx-auto mb-4 animate-pulse-gentle" />
                  <h3 className="text-2xl font-bold mb-2">SaaS Idea Validation Dashboard</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Full analytics, market trends, and AI-powered insights to make better decisions
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold">8,500+</p>
              <p className="text-sm text-muted-foreground">Ideas Validated</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$12M+</p>
              <p className="text-sm text-muted-foreground">Capital Saved</p>
            </div>
            <div>
              <p className="text-3xl font-bold">92%</p>
              <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold">3,200+</p>
              <p className="text-sm text-muted-foreground">Happy Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose SaaS Validator?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages multiple AI models to give you the most accurate validation for your SaaS ideas, saving you time and resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-panel rounded-xl p-6">
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 text-accent">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Validate your SaaS idea in three simple steps and get actionable insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent mx-auto">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Submit Your Idea</h3>
              <p className="text-muted-foreground">
                Enter your SaaS idea details, target audience, and unique selling points
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent mx-auto">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Choose your preferred AI provider to analyze market fit, competition, and potential ROI
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-accent mx-auto">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Get Insights</h3>
              <p className="text-muted-foreground">
                Receive detailed validation reports with actionable recommendations and next steps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have saved time and resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-panel rounded-xl p-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that suits your needs, with no hidden fees
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-xl border ${plan.isPopular ? 'border-accent shadow-lg relative' : 'border-border'} p-6`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.isPopular ? "default" : "outline"} 
                  className="w-full"
                  asChild
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Validate Your Ideas?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of entrepreneurs and developers who use our platform to validate their SaaS ideas before investing time and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">
                Get Started for Free
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">SaaS Validator</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered SaaS idea validation platform for entrepreneurs and developers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-accent transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-muted-foreground hover:text-accent transition-colors">How it Works</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-accent transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SaaS Validator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

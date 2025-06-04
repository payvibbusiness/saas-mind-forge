
import React, { createContext, useContext, useState, useEffect } from "react";

type Idea = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  validated: boolean;
  validation?: IdeaValidation;
};

type IdeaValidation = {
  marketDemand: number;
  competitorAnalysis: string;
  techStackSuggestion: string[];
  featureSuggestions: string[];
  mrrProjection: { min: number; max: number };
  effortEstimation: { months: number; teamSize: number };
  aiProvider: string;
  validatedAt: string;
};

type IdeasContextType = {
  ideas: Idea[];
  isLoading: boolean;
  error: string | null;
  addIdea: (idea: Omit<Idea, "id" | "createdAt" | "updatedAt" | "validated">) => Promise<void>;
  updateIdea: (id: string, idea: Partial<Idea>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  validateIdea: (id: string, aiProvider: string) => Promise<void>;
};

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would fetch ideas from Supabase
    const fetchIdeas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // For demo purposes, load from localStorage if available
        const storedIdeas = localStorage.getItem("ideas");
        if (storedIdeas) {
          setIdeas(JSON.parse(storedIdeas));
        } else {
          // Default sample ideas
          const sampleIdeas: Idea[] = [
            {
              id: "idea-1",
              title: "Developer Analytics Dashboard",
              description: "Real-time analytics for developers to track their productivity, code quality, and project status.",
              tags: ["analytics", "developer", "productivity"],
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              validated: true,
              validation: {
                marketDemand: 8.5,
                competitorAnalysis: "Moderate competition with 3-5 established players. Key differentiators needed in developer experience and integration capabilities.",
                techStackSuggestion: ["Next.js", "GraphQL", "Prisma", "PostgreSQL"],
                featureSuggestions: ["Code quality metrics", "GitHub integration", "Team collaboration", "Performance tracking"],
                mrrProjection: { min: 15000, max: 50000 },
                effortEstimation: { months: 4, teamSize: 3 },
                aiProvider: "openai",
                validatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              }
            },
            {
              id: "idea-2",
              title: "AI-Powered Content Calendar",
              description: "Calendar application that uses AI to suggest optimal posting times and content ideas for social media managers.",
              tags: ["ai", "content", "social-media"],
              createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
              validated: false
            }
          ];
          setIdeas(sampleIdeas);
          localStorage.setItem("ideas", JSON.stringify(sampleIdeas));
        }
      } catch (err) {
        setError("Failed to load ideas");
        console.error("Error loading ideas:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const addIdea = async (idea: Omit<Idea, "id" | "createdAt" | "updatedAt" | "validated">) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newIdea: Idea = {
        ...idea,
        id: `idea-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        validated: false
      };
      
      setIdeas(prevIdeas => {
        const updatedIdeas = [...prevIdeas, newIdea];
        localStorage.setItem("ideas", JSON.stringify(updatedIdeas));
        return updatedIdeas;
      });
    } catch (err) {
      setError("Failed to add idea");
      console.error("Error adding idea:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateIdea = async (id: string, ideaUpdates: Partial<Idea>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIdeas(prevIdeas => {
        const updatedIdeas = prevIdeas.map(idea => 
          idea.id === id 
            ? { 
                ...idea, 
                ...ideaUpdates, 
                updatedAt: new Date().toISOString() 
              } 
            : idea
        );
        localStorage.setItem("ideas", JSON.stringify(updatedIdeas));
        return updatedIdeas;
      });
    } catch (err) {
      setError("Failed to update idea");
      console.error("Error updating idea:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteIdea = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIdeas(prevIdeas => {
        const updatedIdeas = prevIdeas.filter(idea => idea.id !== id);
        localStorage.setItem("ideas", JSON.stringify(updatedIdeas));
        return updatedIdeas;
      });
    } catch (err) {
      setError("Failed to delete idea");
      console.error("Error deleting idea:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const validateIdea = async (id: string, aiProvider: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate AI validation response
      const mockValidation: IdeaValidation = {
        marketDemand: Math.floor(Math.random() * 5) + 5, // 5-10 score
        competitorAnalysis: [
          "Moderate competition with several established players.",
          "Low competition with few established solutions.",
          "High competition, but market is rapidly growing.",
          "Niche market with specialized competitors.",
        ][Math.floor(Math.random() * 4)],
        techStackSuggestion: [
          ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
          ["React", "Firebase", "Material UI", "JavaScript"],
          ["Vue.js", "MongoDB", "Express.js", "Node.js"],
          ["Django", "PostgreSQL", "React", "Python"],
        ][Math.floor(Math.random() * 4)],
        featureSuggestions: [
          "User authentication",
          "Subscription management",
          "Analytics dashboard",
          "Mobile responsiveness",
          "API integration",
          "Dark mode",
        ].sort(() => 0.5 - Math.random()).slice(0, 4),
        mrrProjection: { 
          min: Math.floor(Math.random() * 20000) + 5000,  
          max: Math.floor(Math.random() * 50000) + 30000 
        },
        effortEstimation: { 
          months: Math.floor(Math.random() * 6) + 2,
          teamSize: Math.floor(Math.random() * 3) + 1
        },
        aiProvider,
        validatedAt: new Date().toISOString(),
      };
      
      setIdeas(prevIdeas => {
        const updatedIdeas = prevIdeas.map(idea => 
          idea.id === id 
            ? { 
                ...idea, 
                validated: true,
                validation: mockValidation,
                updatedAt: new Date().toISOString() 
              } 
            : idea
        );
        localStorage.setItem("ideas", JSON.stringify(updatedIdeas));
        return updatedIdeas;
      });
    } catch (err) {
      setError("Failed to validate idea");
      console.error("Error validating idea:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IdeasContext.Provider
      value={{
        ideas,
        isLoading,
        error,
        addIdea,
        updateIdea,
        deleteIdea,
        validateIdea,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error("useIdeas must be used within an IdeasProvider");
  }
  return context;
};

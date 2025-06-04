
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
  validateIdea: (id: string) => Promise<void>;
};

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchIdeas();
    }
  }, [user]);

  const fetchIdeas = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedIdeas: Idea[] = data.map(idea => ({
        id: idea.id,
        title: idea.title,
        description: idea.description,
        tags: idea.tags || [],
        createdAt: idea.created_at,
        updatedAt: idea.updated_at,
        validated: idea.validated || false,
        validation: idea.validated ? {
          marketDemand: idea.market_demand || 0,
          competitorAnalysis: idea.competitor_analysis || '',
          techStackSuggestion: idea.tech_stack_suggestion || [],
          featureSuggestions: idea.feature_suggestions || [],
          mrrProjection: { 
            min: idea.mrr_projection_min || 0, 
            max: idea.mrr_projection_max || 0 
          },
          effortEstimation: { 
            months: idea.effort_estimation_months || 0, 
            teamSize: idea.effort_estimation_team_size || 0 
          },
          aiProvider: idea.ai_provider || 'gemini',
          validatedAt: idea.validated_at || '',
        } : undefined
      }));

      setIdeas(formattedIdeas);
    } catch (err) {
      setError("Failed to load ideas");
      console.error("Error loading ideas:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addIdea = async (idea: Omit<Idea, "id" | "createdAt" | "updatedAt" | "validated">) => {
    if (!user) throw new Error("User not authenticated");
    
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert([{
          user_id: user.id,
          title: idea.title,
          description: idea.description,
          tags: idea.tags,
        }])
        .select()
        .single();

      if (error) throw error;

      // Automatically validate the idea using Gemini
      await validateIdea(data.id);
      
      await fetchIdeas(); // Refresh the list
    } catch (err) {
      setError("Failed to add idea");
      console.error("Error adding idea:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateIdea = async (id: string, ideaUpdates: Partial<Idea>) => {
    if (!user) throw new Error("User not authenticated");
    
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('ideas')
        .update({
          title: ideaUpdates.title,
          description: ideaUpdates.description,
          tags: ideaUpdates.tags,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchIdeas(); // Refresh the list
    } catch (err) {
      setError("Failed to update idea");
      console.error("Error updating idea:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteIdea = async (id: string) => {
    if (!user) throw new Error("User not authenticated");
    
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchIdeas(); // Refresh the list
    } catch (err) {
      setError("Failed to delete idea");
      console.error("Error deleting idea:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const validateIdea = async (id: string) => {
    if (!user) throw new Error("User not authenticated");
    
    setIsLoading(true);
    setError(null);
    try {
      // Get the idea details first
      const { data: ideaData, error: fetchError } = await supabase
        .from('ideas')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      // Call our edge function to analyze the idea
      const { data: analysis, error: analysisError } = await supabase.functions.invoke('analyze-idea', {
        body: {
          title: ideaData.title,
          description: ideaData.description,
          tags: ideaData.tags || []
        }
      });

      if (analysisError) throw analysisError;

      // Update the idea with validation results
      const { error: updateError } = await supabase
        .from('ideas')
        .update({
          validated: true,
          market_demand: analysis.marketDemand,
          competitor_analysis: analysis.competitorAnalysis,
          tech_stack_suggestion: analysis.techStackSuggestion,
          feature_suggestions: analysis.featureSuggestions,
          mrr_projection_min: analysis.mrrProjection.min,
          mrr_projection_max: analysis.mrrProjection.max,
          effort_estimation_months: analysis.effortEstimation.months,
          effort_estimation_team_size: analysis.effortEstimation.teamSize,
          ai_provider: 'gemini',
          validated_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (updateError) throw updateError;
      
      await fetchIdeas(); // Refresh the list
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

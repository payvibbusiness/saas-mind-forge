
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useIdeas } from "@/contexts/IdeasContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Lightbulb, Plus, Search, Trash2, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

const IdeasList = () => {
  const { ideas, deleteIdea } = useIdeas();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleDelete = async (id: string) => {
    try {
      await deleteIdea(id);
      toast.success("Idea deleted successfully");
    } catch (error) {
      toast.error("Failed to delete idea");
    }
  };

  // Apply filters and sorting
  const filteredIdeas = ideas
    .filter((idea) => {
      // Filter by search term
      const matchesSearch =
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by validation status
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "validated" && idea.validated) ||
        (filterStatus === "pending" && !idea.validated);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort ideas
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        case "highest-market":
          if (!a.validated) return 1;
          if (!b.validated) return -1;
          return b.validation!.marketDemand - a.validation!.marketDemand;
        default:
          return 0;
      }
    });

  return (
    <AppLayout title="My Ideas">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search ideas..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="validated">Validated</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
              <SelectItem value="highest-market">Highest Market</SelectItem>
            </SelectContent>
          </Select>
          
          <Button asChild>
            <Link to="/ideas/new">
              <Plus className="mr-1 h-4 w-4" />
              New
            </Link>
          </Button>
        </div>
      </div>

      {filteredIdeas.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            {ideas.length === 0 ? (
              <>
                <Lightbulb className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-1">No ideas yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by adding your first SaaS idea
                </p>
                <Button asChild>
                  <Link to="/ideas/new">Add Your First Idea</Link>
                </Button>
              </>
            ) : (
              <>
                <Search className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-1">No matching ideas</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters or search term
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}>
                    Clear Filters
                  </Button>
                  <Button asChild>
                    <Link to="/ideas/new">Add New Idea</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium">{idea.title}</h3>
                    {idea.validated ? (
                      <Badge className="bg-green-500">Validated</Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {idea.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {idea.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Created {new Date(idea.createdAt).toLocaleDateString()}</span>
                    {idea.validated && (
                      <div className="ml-4 flex items-center">
                        <ArrowUpDown className="h-3 w-3 mr-1" />
                        <span>{idea.validation!.marketDemand}/10 Market Fit</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex sm:flex-col justify-end p-4 sm:border-l border-border gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/ideas/${idea.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => handleDelete(idea.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default IdeasList;

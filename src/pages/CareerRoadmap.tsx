import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Save, RefreshCw, CheckCircle2, BookOpen, Wrench, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoadmapStep {
  id: string;
  week: string;
  title: string;
  description: string;
  skills: string[];
  tools: string[];
  resources: { name: string; url: string }[];
  completed: boolean;
}

const CareerRoadmap = () => {
  const { toast } = useToast();
  const [targetRole, setTargetRole] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [techStack, setTechStack] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);

  const handleGenerate = async () => {
    if (!targetRole || !skillLevel) {
      toast({
        title: "Missing Information",
        description: "Please fill in the target role and skill level.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // TODO: Replace with actual AI API call
    // Example: const response = await generateRoadmap({ targetRole, skillLevel, techStack });
    
    // Simulated delay for demo
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock roadmap data - replace with AI response
    const mockRoadmap: RoadmapStep[] = [
      {
        id: "1",
        week: "Week 1-2",
        title: "Foundations & Setup",
        description: "Set up your development environment and learn the basics of your chosen tech stack.",
        skills: ["Git", "Terminal", "IDE Setup"],
        tools: ["VS Code", "GitHub", "Node.js"],
        resources: [
          { name: "Git Documentation", url: "#" },
          { name: "VS Code Tips", url: "#" },
        ],
        completed: false,
      },
      {
        id: "2",
        week: "Week 3-4",
        title: "Core Concepts",
        description: "Deep dive into the fundamental concepts required for your target role.",
        skills: ["HTML", "CSS", "JavaScript"],
        tools: ["Chrome DevTools", "CodePen"],
        resources: [
          { name: "MDN Web Docs", url: "#" },
          { name: "JavaScript.info", url: "#" },
        ],
        completed: false,
      },
      {
        id: "3",
        week: "Week 5-8",
        title: "Framework Mastery",
        description: "Learn and practice with modern frameworks and libraries.",
        skills: ["React", "State Management", "Routing"],
        tools: ["React DevTools", "Vite"],
        resources: [
          { name: "React Documentation", url: "#" },
          { name: "React Tutorial", url: "#" },
        ],
        completed: false,
      },
      {
        id: "4",
        week: "Week 9-10",
        title: "Styling & UI",
        description: "Master modern CSS techniques and UI component libraries.",
        skills: ["Tailwind CSS", "Responsive Design", "Accessibility"],
        tools: ["Figma", "shadcn/ui"],
        resources: [
          { name: "Tailwind Docs", url: "#" },
          { name: "A11y Project", url: "#" },
        ],
        completed: false,
      },
      {
        id: "5",
        week: "Week 11-12",
        title: "Projects & Portfolio",
        description: "Build real-world projects and create your professional portfolio.",
        skills: ["Project Planning", "Deployment", "Documentation"],
        tools: ["Vercel", "Netlify", "GitHub Pages"],
        resources: [
          { name: "Portfolio Examples", url: "#" },
          { name: "Deployment Guide", url: "#" },
        ],
        completed: false,
      },
    ];

    setRoadmap(mockRoadmap);
    setIsLoading(false);

    toast({
      title: "Roadmap Generated!",
      description: "Your personalized career roadmap is ready.",
    });
  };

  const handleSave = async () => {
    // TODO: Replace with actual Firestore save
    // Example: await saveRoadmapToFirestore(roadmap);
    
    toast({
      title: "Roadmap Saved!",
      description: "Your roadmap has been saved to your account.",
    });
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const toggleStepCompleted = (stepId: string) => {
    setRoadmap((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            AI Career Roadmap Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get a personalized step-by-step learning path to achieve your career goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Configure Your Path
              </CardTitle>
              <CardDescription>
                Tell us about your goals and we'll create a roadmap for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role *</Label>
                <Input
                  id="targetRole"
                  placeholder="e.g. Frontend Developer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Current Skill Level *</Label>
                <Select value={skillLevel} onValueChange={setSkillLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="techStack">Preferred Tech Stack</Label>
                <Textarea
                  id="techStack"
                  placeholder="e.g. React, TypeScript, Node.js, PostgreSQL"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Roadmap
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Roadmap Timeline Section */}
          <div className="lg:col-span-2">
            {roadmap.length > 0 ? (
              <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={handleRegenerate}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Roadmap
                  </Button>
                </div>

                {/* Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

                  {/* Timeline Steps */}
                  <div className="space-y-6">
                    {roadmap.map((step, index) => (
                      <div key={step.id} className="relative pl-12">
                        {/* Timeline Dot */}
                        <button
                          onClick={() => toggleStepCompleted(step.id)}
                          className={`absolute left-0 top-6 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                            step.completed
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background border-border hover:border-primary"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-semibold">{index + 1}</span>
                          )}
                        </button>

                        {/* Step Card */}
                        <Card className={`transition-all ${step.completed ? "opacity-75" : ""}`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="w-fit">
                                {step.week}
                              </Badge>
                            </div>
                            <CardTitle className={`text-xl ${step.completed ? "line-through" : ""}`}>
                              {step.title}
                            </CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Skills */}
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                <BookOpen className="h-4 w-4" />
                                Skills to Learn
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {step.skills.map((skill) => (
                                  <Badge key={skill} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Tools */}
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                <Wrench className="h-4 w-4" />
                                Tools & Technologies
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {step.tools.map((tool) => (
                                  <Badge key={tool} variant="secondary">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Resources */}
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                <ExternalLink className="h-4 w-4" />
                                Resources
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {step.resources.map((resource) => (
                                  <a
                                    key={resource.name}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                  >
                                    {resource.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion Summary */}
                <Card className="bg-muted/50">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Progress: {roadmap.filter((s) => s.completed).length} / {roadmap.length} steps completed
                      </span>
                      <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${(roadmap.filter((s) => s.completed).length / roadmap.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full min-h-[400px] flex items-center justify-center">
                <div className="text-center p-8">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No Roadmap Yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in your details and click "Generate Roadmap" to get your personalized career path
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Lightbulb, Code, Users, Trophy } from "lucide-react";

export interface ResumeAnalysis {
    overallFeedback: string;
    strengths: string[];
    areasToImprove: string[];
    missingSkills: string[];
    projects: {
        name: string;
        description: string;
        technologies: string[];
    }[];
    internships: {
        company: string;
        role: string;
        duration: string;
        description: string;
    }[];
    suggestedFocusAreas: string[];
}

interface ResumeAnalysisFeedbackProps {
    analysis: ResumeAnalysis;
    onStartInterview: () => void;
    isLoading?: boolean;
}

const ResumeAnalysisFeedback = ({ 
    analysis, 
    onStartInterview, 
    isLoading = false 
}: ResumeAnalysisFeedbackProps) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm">
                    <span className="text-4xl">✨</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    Resume Analysis Complete
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We've analyzed your resume and are ready to create a personalized mock interview experience tailored to your skills and experience.
                </p>
            </div>

            {/* Overall Feedback */}
            <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="space-y-2 flex-1">
                        <h2 className="font-semibold text-foreground">Overall Assessment</h2>
                        <p className="text-sm text-muted-foreground">
                            {analysis.overallFeedback}
                        </p>
                    </div>
                </div>
            </Card>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Strengths */}
                <Card className="p-6 border border-border bg-card/50">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <h3 className="font-semibold text-foreground">Your Strengths</h3>
                        </div>
                        <div className="space-y-2">
                            {analysis.strengths.map((strength, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{strength}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Areas to Improve */}
                <Card className="p-6 border border-border bg-card/50">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold text-foreground">Areas to Improve</h3>
                        </div>
                        <div className="space-y-2">
                            {analysis.areasToImprove.map((area, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground">{area}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Missing Skills */}
            {analysis.missingSkills.length > 0 && (
                <Card className="p-6 border-2 border-orange-500/30 bg-orange-500/5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-orange-500" />
                            <h3 className="font-semibold text-foreground">Skills to Develop</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {analysis.missingSkills.map((skill, idx) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1 text-sm rounded-full bg-orange-500/20 text-orange-600 border border-orange-500/30"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {/* Projects Section */}
            {analysis.projects.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Projects Found</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {analysis.projects.map((project, idx) => (
                            <Card key={idx} className="p-4 border border-border bg-card/50">
                                <h4 className="font-medium text-foreground">{project.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {project.technologies.map((tech, tidx) => (
                                        <span 
                                            key={tidx}
                                            className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Internships Section */}
            {analysis.internships.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-500" />
                        <h3 className="font-semibold text-foreground">Internship Experience</h3>
                    </div>
                    <div className="space-y-3">
                        {analysis.internships.map((internship, idx) => (
                            <Card key={idx} className="p-4 border border-border bg-card/50">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-foreground">{internship.role}</h4>
                                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                                        {internship.duration}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{internship.company}</p>
                                <p className="text-sm text-muted-foreground">{internship.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Suggested Focus Areas */}
            <Card className="p-6 border-2 border-primary/30 bg-primary/5">
                <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">📋 Your Interview Will Focus On</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {analysis.suggestedFocusAreas.map((area, idx) => (
                            <div key={idx} className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">{area}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Start Interview Button */}
            <div className="pt-6 pb-4">
                <Button
                    onClick={onStartInterview}
                    disabled={isLoading}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-lg py-6"
                >
                    Start Mock Interview
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                    The interview will consist of 4 parts: Aptitude, Coding, Project-based questions, and HR round
                </p>
            </div>
        </div>
    );
};

export default ResumeAnalysisFeedback;

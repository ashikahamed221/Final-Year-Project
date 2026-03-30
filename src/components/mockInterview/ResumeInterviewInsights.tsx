import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Briefcase,
  Code2,
  Award,
  Users,
  Zap,
} from "lucide-react";
import React from "react";

interface ResumeInterviewInsightsProps {
  skills?: string[];
  experience?: string;
  domain?: string;
  matchedSkills?: {
    skill: string;
    relevance: "high" | "medium" | "low";
    testedIn?: number;
  }[];
  missingSkills?: string[];
  recommendations?: string[];
}

export const ResumeInterviewInsights: React.FC<
  ResumeInterviewInsightsProps
> = ({
  skills = [],
  experience = "Not specified",
  domain = "General",
  matchedSkills = [],
  missingSkills = [],
  recommendations = [],
}) => {
  const getRelevanceBadgeColor = (
    relevance: "high" | "medium" | "low"
  ) => {
    switch (relevance) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const getExperienceIcon = (exp: string) => {
    if (exp.toLowerCase().includes("fresh") || exp.toLowerCase().includes("entry"))
      return "👶";
    if (exp.toLowerCase().includes("mid")) return "💼";
    if (exp.toLowerCase().includes("senior")) return "🏆";
    return "📊";
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Resume-Based Interview</h2>
      </div>

      {/* Experience Level Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-950/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            Experience Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getExperienceIcon(experience)}</span>
            <div>
              <p className="font-semibold text-sm">{experience}</p>
              <p className="text-xs text-muted-foreground">
                Interview difficulty tailored to your level
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Assessment Card */}
      {skills.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-600" />
              Skills Assessed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matched Skills Card */}
      {matchedSkills.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-green-600" />
              Skills Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matchedSkills.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.skill}</span>
                  {item.testedIn && (
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {item.testedIn} Q
                    </Badge>
                  )}
                </div>
                <Badge
                  className={`text-xs ${getRelevanceBadgeColor(
                    item.relevance
                  )}`}
                >
                  {item.relevance}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Missing Skills Card */}
      {missingSkills.length > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" />
              Skills to Focus On
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {missingSkills.map((skill, idx) => (
                <li
                  key={idx}
                  className="text-sm flex gap-2 items-start text-muted-foreground"
                >
                  <span className="text-orange-600 mt-0.5">→</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Card */}
      {recommendations.length > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-cyan-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-600" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="text-sm flex gap-2 items-start text-muted-foreground"
                >
                  <span className="text-cyan-600 mt-0.5">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Interview Domain Info */}
      {domain && (
        <Card className="border-0 shadow-sm bg-muted/50">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Domain:</span> {domain}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeInterviewInsights;

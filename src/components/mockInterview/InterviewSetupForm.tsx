import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, Code, Users, BookOpen } from "lucide-react";

interface InterviewSetupFormProps {
  onStart: (data: {
    jobRole: string;
    skills: string;
    jobDescription: string;
    interviewType: string;
  }) => void;
  isLoading?: boolean;
}

const INTERVIEW_TYPES = [
  { value: "aptitude", label: "Aptitude Round", description: "Quantitative, Logical & Verbal", icon: BookOpen },
  { value: "coding", label: "Coding Round", description: "DSA & Problem Solving", icon: Code },
  { value: "technical", label: "Technical Round", description: "Tech Knowledge & Design", icon: Users },
  { value: "hr", label: "HR Round", description: "Behavioral & Situational", icon: Briefcase },
];

const InterviewSetupForm = ({ onStart, isLoading = false }: InterviewSetupFormProps) => {
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!jobRole.trim()) {
      newErrors.jobRole = "Job role is required";
    }
    if (!skills.trim()) {
      newErrors.skills = "Skills are required";
    }
    if (!jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
    }
    if (!interviewType) {
      newErrors.interviewType = "Interview type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onStart({
      jobRole: jobRole.trim(),
      skills: skills.trim(),
      jobDescription: jobDescription.trim(),
      interviewType,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
          <span className="text-4xl">🎯</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Interview Setup
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Tell us about the position and your skills. We'll customize your interview experience accordingly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Job Role */}
        <div className="space-y-2">
          <label htmlFor="jobRole" className="block text-sm font-medium text-foreground">
            Job Role
          </label>
          <Input
            id="jobRole"
            placeholder="e.g., Full Stack Developer, Frontend Engineer, Data Scientist"
            value={jobRole}
            onChange={(e) => {
              setJobRole(e.target.value);
              if (errors.jobRole) setErrors({ ...errors, jobRole: "" });
            }}
            className={errors.jobRole ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.jobRole && <p className="text-sm text-red-500">{errors.jobRole}</p>}
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label htmlFor="skills" className="block text-sm font-medium text-foreground">
            Skills (comma-separated)
          </label>
          <Input
            id="skills"
            placeholder="e.g., React, Node.js, Python, SQL, AWS"
            value={skills}
            onChange={(e) => {
              setSkills(e.target.value);
              if (errors.skills) setErrors({ ...errors, skills: "" });
            }}
            className={errors.skills ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <label htmlFor="jobDescription" className="block text-sm font-medium text-foreground">
            Job Description/Requirements
          </label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description or key requirements for this position..."
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
              if (errors.jobDescription) setErrors({ ...errors, jobDescription: "" });
            }}
            className={`min-h-32 ${errors.jobDescription ? "border-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.jobDescription && <p className="text-sm text-red-500">{errors.jobDescription}</p>}
        </div>

        {/* Interview Type */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Select Interview Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTERVIEW_TYPES.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    setInterviewType(type.value);
                    if (errors.interviewType) setErrors({ ...errors, interviewType: "" });
                  }}
                  disabled={isLoading}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    interviewType === type.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{type.label}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.interviewType && <p className="text-sm text-red-500">{errors.interviewType}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-lg py-6"
          >
            {isLoading ? "Preparing Interview..." : "Start Interview"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InterviewSetupForm;

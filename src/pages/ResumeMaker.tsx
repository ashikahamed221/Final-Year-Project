import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Sparkles,
  Download,
  Save,
  Eye,
  Edit3,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PersonalDetailsForm from "@/components/resume/PersonalDetailsForm";
import EducationForm, { type Education } from "@/components/resume/EducationForm";
import ExperienceForm, { type Experience } from "@/components/resume/ExperienceForm";
import ProjectsForm, { type Project } from "@/components/resume/ProjectsForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";


const ResumeMaker = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");

  // Form states
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
  });

  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState({
    technical: "",
    soft: "",
    languages: "",
    certifications: "",
  });
  const [summary, setSummary] = useState("");

  const handleGenerateSummary = async () => {
    setIsLoading(true);


    // TODO: Replace with your AI API call
    // Example payload to send:
    // const payload = {
    //   personalDetails,
    //   education,
    //   experience,
    //   projects,
    //   skills,
    // };

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock generated summary
    const mockSummary = `Results-driven professional with expertise in ${skills.technical || "software development"}. ${experience.length > 0
      ? `Proven track record at ${experience[0].company || "leading companies"}.`
      : ""
      } ${education.length > 0
        ? `Holds a ${education[0].degree || "degree"} from ${education[0].institution || "a prestigious institution"}.`
        : ""
      } Passionate about delivering high-quality solutions and driving innovation.`;

    setSummary(mockSummary);
    setIsLoading(false);

    toast({
      title: "Summary Generated",
      description: "AI has created a professional summary for your resume.",
    });
  };

  const handleDownloadPDF = async () => {
    // PDF generation using react-pdf
    toast({
      title: "Download Started",
      description: "Your resume PDF is being prepared...",
    });

    try {
      // Dynamically import react-pdf/renderer and the new ResumePDF component
      const [pdfModule, React, { default: ResumePDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('react'),
        import('@/components/resume/ResumePDF')
      ]);

      // Render PDF and trigger download
      const blob = await pdfModule.pdf(
        React.createElement(ResumePDF, {
          personalDetails,
          education,
          experience,
          projects,
          skills,
          summary,
        }) as any
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personalDetails.fullName || 'resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: "Your resume PDF has been downloaded.",
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    // TODO: Save to Firestore
    // const resumeData = {
    //   personalDetails,
    //   education,
    //   experience,
    //   projects,
    //   skills,
    //   summary,
    //   updatedAt: new Date(),
    // };

    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 hidden">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h1 className="md:text-xl font-bold text-foreground">
                  Resume Maker
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="edit" className="gap-2">
                <Edit3 className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="edit" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Forms */}
              <div className="space-y-6">
                <Card className="bg-card/50 border-border">
                  <CardContent className="p-6">
                    <PersonalDetailsForm
                      data={personalDetails}
                      onChange={setPersonalDetails}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border">
                  <CardContent className="p-6">
                    <EducationForm data={education} onChange={setEducation} />
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border">
                  <CardContent className="p-6">
                    <ExperienceForm data={experience} onChange={setExperience} />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - More Forms */}
              <div className="space-y-6">
                <Card className="bg-card/50 border-border">
                  <CardContent className="p-6">
                    <ProjectsForm data={projects} onChange={setProjects} />
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border">
                  <CardContent className="p-6">
                    <SkillsForm data={skills} onChange={setSkills} />
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Professional Summary</span>
                      <Button
                        size="sm"
                        onClick={handleGenerateSummary}
                        disabled={isLoading}
                        className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Generate with AI
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        placeholder="Write a brief professional summary or use AI to generate one..."
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="bg-secondary/50 border-border min-h-[150px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="bg-muted/30 p-8 rounded-xl ">
              <ResumePreview
                personalDetails={personalDetails}
                education={education}
                experience={experience}
                projects={projects}
                skills={skills}
                summary={summary}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResumeMaker;

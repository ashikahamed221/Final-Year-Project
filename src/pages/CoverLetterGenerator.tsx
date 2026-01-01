import { useState } from "react";
import { FileText, Copy, Download, Sparkles, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CoverLetterGenerator = () => {
  const [jobRole, setJobRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    // TODO: Implement AI API call here
    // Simulating API delay for UI demo
    setTimeout(() => {
      setGeneratedLetter(`Dear Hiring Manager,

I am writing to express my strong interest in the ${jobRole} position at ${companyName}. With my background in ${userSkills}, I am confident that I would be a valuable addition to your team.

[This is a placeholder - connect your AI API to generate real cover letters]

Your job description emphasizes the need for candidates who can excel in dynamic environments. Throughout my career, I have consistently demonstrated the ability to adapt quickly, learn new technologies, and deliver results that exceed expectations.

I am particularly drawn to ${companyName}'s mission and values. I believe my skills and experience align perfectly with what you're looking for, and I am excited about the opportunity to contribute to your team's success.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and skills would benefit ${companyName}.

Sincerely,
[Your Name]`);
      setIsLoading(false);
    }, 2000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${companyName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isFormValid = jobRole && companyName && jobDescription && userSkills;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Cover Letter <span className="gradient-text">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create professional, tailored cover letters in seconds. Just provide the job details and let AI craft the perfect letter for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Job Details
                </CardTitle>
                <CardDescription>
                  Fill in the details below to generate your personalized cover letter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobRole">Job Role</Label>
                  <Input
                    id="jobRole"
                    placeholder="e.g., Senior Software Engineer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Google, Microsoft, Startup Inc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userSkills">Your Skills & Experience</Label>
                  <Textarea
                    id="userSkills"
                    placeholder="Describe your relevant skills, experience, and achievements..."
                    value={userSkills}
                    onChange={(e) => setUserSkills(e.target.value)}
                    className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Cover Letter</CardTitle>
                    <CardDescription>
                      Your AI-crafted cover letter will appear here
                    </CardDescription>
                  </div>
                  {generatedLetter && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="border-border/50 hover:bg-primary/10"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="border-border/50 hover:bg-primary/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    </div>
                    <p className="mt-4 text-sm">Crafting your perfect cover letter...</p>
                  </div>
                ) : generatedLetter ? (
                  <div className="bg-background/50 rounded-lg p-6 border border-border/30">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                      {generatedLetter}
                    </pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <FileText className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-sm">Fill in the job details and click generate</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoverLetterGenerator;

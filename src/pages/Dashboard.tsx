import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  FileText,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Code,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserStats } from "@/services/api";

interface UserStats {
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  location?: string;
  bio?: string;
  skills: string[];
  education?: {
    degree: string;
    institution: string;
    year: string;
  };
  experienceLevel?: string;
  interviewsCompleted: number;
  averageScore: number;
  skillLevel?: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching user stats:", err);
        setError("Failed to load dashboard data. Please try again later.");
        // Set default data if API fails
        setStats({
          name: user?.name || "User",
          email: user?.email || "user@example.com",
          avatar: "🎓",
          joinDate: new Date().toISOString(),
          location: "Not specified",
          bio: "Career Development Platform",
          skills: [],
          experienceLevel: "Not specified",
          interviewsCompleted: 0,
          averageScore: 0,
          skillLevel: "Beginner",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Mock Interview",
      description: "Resume-based mock interviews tailored to your skills and experience",
      link: "/quiz-app",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Resume Maker",
      description: "Create professional resumes with AI-powered suggestions",
      link: "/resume-maker",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Cover Letter Generator",
      description: "Generate customized cover letters for different job positions",
      link: "/cover-letter",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Interview Prep",
      description: "Practice coding problems and prepare for technical interviews",
      link: "/interview-prep",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Career Roadmap",
      description: "Get personalized career path recommendations based on your goals",
      link: "/career-roadmap",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Interview History",
      description: "Monitor your performance and improvement over time",
      link: "/history",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Card className="max-w-md w-full border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-400 mb-2">
                  Error Loading Dashboard
                </p>
                <p className="text-sm text-red-800 dark:text-red-300 mb-4">
                  {error}
                </p>
                <Button
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-background to-background/50 px-4">
      {/* Student Profile Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Profile Card */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-primary/10 to-purple-500/10">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-5xl">
                    {stats?.avatar || "🎓"}
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {stats?.skillLevel || "Beginner"}
                  </Badge>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{stats?.name || "User"}</h1>
                  <p className="text-muted-foreground mb-4">{stats?.bio || "Career Development Platform"}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground truncate">
                        {stats?.email || "user@example.com"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {stats?.location || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {stats?.joinDate ? new Date(stats.joinDate).toLocaleDateString() : "Recently joined"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {stats?.experienceLevel || "Not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Education */}
                  {stats?.education && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Education</p>
                      <p className="text-sm font-medium">{stats.education.degree}</p>
                      <p className="text-xs text-muted-foreground">
                        {stats.education.institution} • {stats.education.year}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Interviews Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.interviewsCompleted || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Mock interviews</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.averageScore || 0}%</div>
                <p className="text-xs text-muted-foreground mt-1">Performance metric</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        {stats?.skills && stats.skills.length > 0 && (
          <Card className="border-0 shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Skills & Expertise ({stats.skills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {stats.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="px-4 py-2 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            What You Can Do
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive tools designed to help you interview better, prepare smarter,
            and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.link}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full cursor-pointer hover:scale-105 transform">
                <CardContent className="pt-8">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link to={feature.link}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-purple-600/10 overflow-hidden">
          <CardContent className="py-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take your first mock interview to discover your strengths and areas for improvement.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link to="/quiz-app">Start Mock Interview</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/history">View Interview History</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

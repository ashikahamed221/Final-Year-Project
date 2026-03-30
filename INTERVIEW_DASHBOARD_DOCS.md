# Interview Dashboard - Components Documentation

This document provides information about the newly created Interview Dashboard and its supporting components.

## Overview

The Interview Dashboard provides a comprehensive, visually appealing interface for displaying mock interview performance and detailed analysis. The dashboard shows resume-based interview mechanics, performance metrics, and areas for improvement.

## Main Component: InterviewDetails.tsx

**Location:** `src/pages/InterviewDetails.tsx`

### Features:
- **Header Section**: Interview title, domain, and download report button with back navigation
- **Performance Summary Cards**: Quick metrics overview (Score, Performance Level, Accuracy, Response Time)
- **Performance Breakdown**: Visual progress bar and statistics grid
- **Resume-Based Interview Details**: Shows experience level and skills assessed
- **Question-by-Question Review**: Expandable cards showing each question with answers and correctness
- **Right Sidebar Insights**:
  - Strengths
  - Areas to Improve
  - Recommendations
  - CTA Section for next steps

### Props/Data Structure:
```typescript
interface TestDetail {
  id: string;
  domain: string;
  score: number;
  total: number;
  performance: string;
  completionDate?: string;
  resumeSkills?: string[];
  experience?: string;
  questions: {
    id: string;
    question: string;
    selected: string;
    isCorrect: boolean;
    responseTime: number;
    correctAnswer?: string;
    difficulty?: "easy" | "medium" | "hard";
  }[];
  areasToImprove?: string[];
  strengths?: string[];
  recommendations?: string[];
}
```

## Supporting Components

### 1. InterviewStats.tsx
**Location:** `src/components/mockInterview/InterviewStats.tsx`

**Purpose**: Displays comprehensive performance statistics and difficulty breakdown

**Key Features**:
- Overall performance percentage display
- Performance level badge (Excellent/Good/Average/Needs Improvement)
- Progress bar visualization
- Score statistics (Correct/Incorrect)
- Difficulty breakdown by level (Easy/Medium/Hard)
- Key insight card with tailored feedback

**Usage**:
```typescript
<InterviewStats
  correctAnswers={15}
  totalQuestions={20}
  averageResponseTime={12.5}
  performanceLevel="Good"
  difficultyBreakdown={{
    easy: { correct: 5, total: 5 },
    medium: { correct: 8, total: 10 },
    hard: { correct: 2, total: 5 }
  }}
/>
```

### 2. ResumeInterviewInsights.tsx
**Location:** `src/components/mockInterview/ResumeInterviewInsights.tsx`

**Purpose**: Shows resume-based interview information and skill assessment

**Key Features**:
- Experience level display with emoji indicators
- Skills assessed from resume
- Skills performance mapping with relevance levels (high/medium/low)
- Missing skills recommendations
- Interview recommendations
- Domain information

**Usage**:
```typescript
<ResumeInterviewInsights
  skills={["Python", "React", "Node.js"]}
  experience="Mid-level Developer"
  domain="Full Stack Development"
  matchedSkills={[
    { skill: "React", relevance: "high", testedIn: 5 },
    { skill: "Python", relevance: "medium", testedIn: 3 }
  ]}
  missingSkills={["TypeScript", "Docker"]}
  recommendations={["Focus on TypeScript fundamentals", "Learn Docker basics"]}
/>
```

### 3. PerformanceAnalytics.tsx
**Location:** `src/components/mockInterview/PerformanceAnalytics.tsx`

**Purpose**: Provides detailed performance analytics and comparisons

**Key Features**:
- Score comparison with visual progress
- Performance vs. average score comparison
- Response speed metrics (average, fastest, slowest)
- Accuracy breakdown by category
- Actionable improvement tips

**Usage**:
```typescript
<PerformanceAnalytics
  currentScore={75}
  averageScore={65}
  maxScore={100}
  speedMetrics={{
    average: 12.5,
    fastest: 5.2,
    slowest: 28.3
  }}
  accuracyByCategory={[
    { category: "Aptitude", correct: 8, total: 10, percentage: 80 },
    { category: "Coding", correct: 6, total: 10, percentage: 60 }
  ]}
/>
```

### 4. InterviewProgress.tsx
**Location:** `src/components/mockInterview/InterviewProgress.tsx`

**Purpose**: Tracks interview progress over multiple attempts

**Key Features**:
- Current interview summary
- Trend indicator (improvement/decline)
- Overall progress statistics
- Recent interview history
- Best score tracking
- Tests taken counter

**Usage**:
```typescript
<InterviewProgress
  currentRecord={{
    id: "1",
    date: "2026-03-29",
    domain: "Full Stack",
    score: 15,
    total: 20,
    performanceLevel: "Good",
    responseTime: 12.5
  }}
  previousRecords={[
    {
      id: "2",
      date: "2026-03-20",
      domain: "Full Stack",
      score: 12,
      total: 20,
      performanceLevel: "Average",
      responseTime: 15.2
    }
  ]}
/>
```

## Color Scheme

The dashboard uses a consistent color scheme for status indicators:

- **Excellent**: Green (from-green-500 to-emerald-500)
- **Good**: Blue (from-blue-500 to-cyan-500)
- **Average**: Yellow/Orange (from-yellow-500 to-orange-500)
- **Needs Improvement**: Red/Pink (from-red-500 to-pink-500)

## Dark Mode Support

All components support dark mode through Tailwind CSS classes:
- `dark:` prefix for dark mode specific styles
- Automatic theme detection based on system preference
- Consistent background and text colors across themes

## Icons Used

The dashboard uses icons from the `lucide-react` library:
- Trophy, TrendingUp, Target, Zap, CheckCircle2, XCircle, Clock, BarChart3, AlertCircle, Lightbulb, ArrowLeft, Download, Briefcase, Code2, Award, Users, FileText

## Responsive Design

All components are fully responsive:
- **Mobile**: Single column layout (max-width: 768px)
- **Tablet**: Two column layout (768px - 1024px)
- **Desktop**: Three column layout (1024px+)

## Integration with API

The InterviewDetails page fetches data from `getTestDetails(id)` API endpoint. Ensure your API returns the complete TestDetail structure for optimal display.

## Future Enhancements

Potential additions for future versions:
1. Export/Download report as PDF
2. Comparison between multiple interviews
3. Skill proficiency chart
4. Time-based performance trends
5. Peer comparison (if available)
6. Personalized learning paths based on weak areas

## Usage Notes

1. **Data Loading**: The page includes loading and error states
2. **Expandable Questions**: Users can click on questions to expand/collapse answers
3. **Difficulty Colors**: Questions are color-coded by difficulty level
4. **Responsive Layout**: Layout adapts to screen size automatically
5. **Accessibility**: All components follow accessibility best practices

## Files Created/Modified

- ✅ [InterviewDetails.tsx](src/pages/InterviewDetails.tsx) - Main dashboard page
- ✅ [InterviewStats.tsx](src/components/mockInterview/InterviewStats.tsx) - Performance statistics
- ✅ [ResumeInterviewInsights.tsx](src/components/mockInterview/ResumeInterviewInsights.tsx) - Resume-based insights
- ✅ [PerformanceAnalytics.tsx](src/components/mockInterview/PerformanceAnalytics.tsx) - Analytics component
- ✅ [InterviewProgress.tsx](src/components/mockInterview/InterviewProgress.tsx) - Progress tracking

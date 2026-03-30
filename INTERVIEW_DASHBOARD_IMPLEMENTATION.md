# Interview Dashboard - Implementation Guide

This guide helps you integrate the new Interview Dashboard components with your existing API and data flow.

## Quick Start

### 1. Update Your API Response

Ensure your `getTestDetails()` API endpoint returns the complete data structure:

```typescript
// services/api.js
export const getTestDetails = async (testId) => {
  const response = await fetch(`/api/tests/${testId}`);
  return response.json();
  // Should return:
  // {
  //   id: string,
  //   domain: string,
  //   score: number,
  //   total: number,
  //   performance: string,
  //   completionDate?: string,
  //   resumeSkills?: string[],
  //   experience?: string,
  //   questions: Array,
  //   areasToImprove?: string[],
  //   strengths?: string[],
  //   recommendations?: string[]
  // }
};
```

### 2. Backend Data Mapper Example (Backend Integration)

```typescript
// Transform your backend response to match the expected structure
function transformTestResult(backendData) {
  const correctAnswers = backendData.answers.filter(a => a.isCorrect).length;
  
  return {
    id: backendData.id,
    domain: backendData.domain,
    score: correctAnswers,
    total: backendData.questions.length,
    performance: getPerformanceLabel(correctAnswers, backendData.questions.length),
    completionDate: backendData.completedAt,
    resumeSkills: backendData.resume?.extractedSkills || [],
    experience: backendData.resume?.experienceLevel || "Not specified",
    questions: backendData.questions.map((q, idx) => ({
      id: q.id,
      question: q.text,
      selected: backendData.answers[idx]?.selectedOption,
      isCorrect: backendData.answers[idx]?.isCorrect,
      responseTime: backendData.answers[idx]?.timeSpent,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty
    })),
    areasToImprove: generateAreasToImprove(backendData),
    strengths: generateStrengths(backendData),
    recommendations: generateRecommendations(backendData)
  };
}
```

### 3. Optional: Use Supporting Components

You can use the supporting components directly in InterviewDetails or other pages:

#### Using InterviewStats Component

```typescript
import { InterviewStats } from "@/components/mockInterview/InterviewStats";

// In your component:
<InterviewStats
  correctAnswers={test.score}
  totalQuestions={test.total}
  averageResponseTime={avgResponseTime}
  performanceLevel={performanceLabel}
  difficultyBreakdown={{
    easy: { 
      correct: test.questions.filter(q => q.difficulty === 'easy' && q.isCorrect).length,
      total: test.questions.filter(q => q.difficulty === 'easy').length
    },
    medium: { 
      correct: test.questions.filter(q => q.difficulty === 'medium' && q.isCorrect).length,
      total: test.questions.filter(q => q.difficulty === 'medium').length
    },
    hard: { 
      correct: test.questions.filter(q => q.difficulty === 'hard' && q.isCorrect).length,
      total: test.questions.filter(q => q.difficulty === 'hard').length
    }
  }}
/>
```

#### Using ResumeInterviewInsights Component

```typescript
import { ResumeInterviewInsights } from "@/components/mockInterview/ResumeInterviewInsights";

<ResumeInterviewInsights
  skills={test.resumeSkills}
  experience={test.experience}
  domain={test.domain}
  matchedSkills={test.resumeSkills?.map(skill => ({
    skill,
    relevance: calculateRelevance(skill, test.questions),
    testedIn: countQuestionsForSkill(skill, test.questions)
  }))}
  missingSkills={identifyMissingSkills(test.resumeSkills)}
  recommendations={test.recommendations}
/>
```

### 4. Generate Insights Helper Function

```typescript
// utils/interviewAnalysis.ts

export function generateAreasToImprove(test) {
  const weakAreas = [];
  const difficulties = ['easy', 'medium', 'hard'];
  
  for (const difficulty of difficulties) {
    const difQuestions = test.questions.filter(q => q.difficulty === difficulty);
    const correctCount = difQuestions.filter(q => q.isCorrect).length;
    const percentage = (correctCount / difQuestions.length) * 100;
    
    if (percentage < 70) {
      weakAreas.push(`Focus on ${difficulty} level questions (${percentage.toFixed(0)}% accuracy)`);
    }
  }
  
  return weakAreas;
}

export function generateStrengths(test) {
  const strengths = [];
  
  if (test.questions.filter(q => q.isCorrect).length > test.total * 0.7) {
    strengths.push("Strong overall understanding of concepts");
  }
  
  const avgTime = test.questions.reduce((sum, q) => sum + q.responseTime, 0) / test.total;
  if (avgTime < 15) {
    strengths.push("Quick problem-solving ability");
  }
  
  return strengths;
}

export function generateRecommendations(test) {
  const recommendations = [];
  
  // Based on performance
  const percentage = (test.score / test.total) * 100;
  if (percentage >= 80) {
    recommendations.push("Excellent work! Challenge yourself with harder problems");
  } else if (percentage >= 60) {
    recommendations.push("Good progress! Review the concepts you struggled with");
  } else {
    recommendations.push("Focus on building strong fundamentals before attempting harder questions");
  }
  
  // Based on response time
  const avgTime = test.questions.reduce((sum, q) => sum + q.responseTime, 0) / test.total;
  if (avgTime > 20) {
    recommendations.push("Practice time management - aim to solve within 15 seconds for easier questions");
  }
  
  return recommendations;
}
```

### 5. Styling Customization

All components use Tailwind CSS and support custom styling:

```typescript
// Custom theme colors can be modified in tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        performance: {
          excellent: '#10b981',
          good: '#3b82f6',
          average: '#f59e0b',
          poor: '#ef4444'
        }
      }
    }
  }
}
```

### 6. Mock Data for Testing

```typescript
// For development/testing without API
const mockTestData = {
  id: "test-123",
  domain: "Full Stack Development",
  score: 16,
  total: 20,
  performance: "Good",
  completionDate: new Date().toISOString(),
  resumeSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
  experience: "Mid-level Developer",
  questions: [
    {
      id: "q1",
      question: "What is the virtual DOM in React?",
      selected: "A lightweight representation of the real DOM",
      isCorrect: true,
      responseTime: 8.5,
      correctAnswer: "A lightweight representation of the real DOM",
      difficulty: "easy"
    },
    // ... more questions
  ],
  areasToImprove: [
    "Advanced React patterns",
    "Database optimization",
    "System design concepts"
  ],
  strengths: [
    "Strong fundamentals",
    "Good problem-solving ability",
    "Quick response time"
  ],
  recommendations: [
    "Practice more advanced React patterns",
    "Study system design principles",
    "Work on real-world projects"
  ]
};
```

### 7. Error Handling

```typescript
import { useNavigate } from "react-router-dom";

// In your component
const navigate = useNavigate();

const handleError = (error) => {
  console.error("Error loading interview details:", error);
  // Show toast notification
  toast.error("Failed to load interview details");
  // Navigate back after delay
  setTimeout(() => navigate(-1), 2000);
};
```

### 8. Performance Optimization

For large numbers of questions, consider pagination or virtualization:

```typescript
import { useCallback, useMemo } from "react";

// Paginate questions
const QUESTIONS_PER_PAGE = 10;
const [currentPage, setCurrentPage] = useState(0);

const paginatedQuestions = useMemo(() => {
  const start = currentPage * QUESTIONS_PER_PAGE;
  return test.questions.slice(start, start + QUESTIONS_PER_PAGE);
}, [test.questions, currentPage]);
```

## Integration Checklist

- [ ] Update API endpoints to return complete data structure
- [ ] Implement data mapper functions
- [ ] Add error handling for API calls
- [ ] Test with mock data
- [ ] Integrate with actual API
- [ ] Style customization (if needed)
- [ ] Add analytics tracking (optional)
- [ ] Test responsive design on mobile
- [ ] Add dark mode testing
- [ ] Performance testing with large datasets

## Troubleshooting

### Questions not showing
- Verify `test.questions` array is populated
- Check browser console for data structure

### Icons not displaying
- Ensure `lucide-react` is installed (`npm install lucide-react`)
- Check that icon names are imported correctly

### Styling issues
- Verify Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Clear Tailwind cache if needed

### Performance issues
- Implement question pagination for 100+ questions
- Use React.memo() for expensive components
- Profile with React DevTools

## Support

For additional help or custom requirements, refer to:
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Documentation](https://react.dev)

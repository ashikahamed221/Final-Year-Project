// Types
export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    keywords: string[];
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestResult {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    responseTime: number;
    wasWarned: boolean;
}

export interface TestSummary {
    domain: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    averageResponseTime: number;
    performanceLevel: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
}

// Domain definitions
export interface DomainQuestion {
    domain: string;
    label: string;
    description?: string;
    icon?: string;
    questions: Question[];
}

export interface DomainQuestions extends DomainQuestion {}

// Constants
export const MIN_RESPONSE_TIME = 3000; // 3 seconds

// Domain questions array
export const domainQuestions: DomainQuestion[] = [
    {
        domain: 'frontend',
        label: 'Frontend',
        description: 'Test your Frontend development knowledge',
        icon: '🎨',
        questions: []
    },
    {
        domain: 'backend',
        label: 'Backend',
        description: 'Test your Backend development knowledge',
        icon: '⚙️',
        questions: []
    },
    {
        domain: 'aiml',
        label: 'AI & ML',
        description: 'Test your Artificial Intelligence & Machine Learning knowledge',
        icon: '🤖',
        questions: []
    },
    {
        domain: 'dataanalyst',
        label: 'Data Analyst',
        description: 'Test your Data Analysis knowledge',
        icon: '📊',
        questions: []
    },
    {
        domain: 'devops',
        label: 'DevOps',
        description: 'Test your DevOps knowledge',
        icon: '🚀',
        questions: []
    },
    {
        domain: 'aptitude',
        label: 'Aptitude',
        description: 'Test your General Aptitude skills',
        icon: '🧠',
        questions: []
    },
    {
        domain: 'coding',
        label: 'Coding',
        description: 'Test your Problem Solving & Coding skills',
        icon: '💻',
        questions: []
    },
    {
        domain: 'hr',
        label: 'HR Interview',
        description: 'Test your HR Interview readiness',
        icon: '👔',
        questions: []
    }
];

// Performance level calculation
export const calculatePerformanceLevel = (percentage: number): 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Needs Improvement';
};

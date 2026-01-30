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
        domain: 'javascript',
        label: 'JavaScript',
        description: 'Test your JavaScript knowledge',
        icon: '📝',
        questions: []
    },
    {
        domain: 'react',
        label: 'React',
        description: 'Test your React knowledge',
        icon: '⚛️',
        questions: []
    },
    {
        domain: 'typescript',
        label: 'TypeScript',
        description: 'Test your TypeScript knowledge',
        icon: '🔷',
        questions: []
    },
    {
        domain: 'nodejs',
        label: 'Node.js',
        description: 'Test your Node.js knowledge',
        icon: '🟩',
        questions: []
    },
    {
        domain: 'sql',
        label: 'SQL',
        description: 'Test your SQL knowledge',
        icon: '🗄️',
        questions: []
    },
    {
        domain: 'python',
        label: 'Python',
        description: 'Test your Python knowledge',
        icon: '🐍',
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

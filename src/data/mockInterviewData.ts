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

// Resume Analysis type
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

// New 4-part interview structure
export interface InterviewPart {
    partNumber: number;
    title: string;
    description: string;
    icon: string;
    domain: string;
    questions?: Question[];
}

export const resumeBasedInterviewParts: InterviewPart[] = [
    {
        partNumber: 1,
        title: 'Aptitude Round',
        description: 'Quantitative, Logical Reasoning & Verbal ability',
        icon: '🧠',
        domain: 'aptitude-general',
    },
    {
        partNumber: 2,
        title: 'Coding Round',
        description: 'Data Structures, Algorithms & Problem Solving',
        icon: '💻',
        domain: 'coding-general',
    },
    {
        partNumber: 3,
        title: 'Project & Skills Round',
        description: 'Based on your resume projects and experience',
        icon: '🚀',
        domain: 'project-skills',
    },
    {
        partNumber: 4,
        title: 'HR Round',
        description: 'Behavioral & situational questions',
        icon: '👔',
        domain: 'hr',
    },
];

// Domain definitions
export interface DomainQuestion {
    domain: string;
    label: string;
    description?: string;
    icon?: string;
    questions: Question[];
}

export interface DomainQuestions extends DomainQuestion {}

// Interview round structure (4 rounds)
export interface InterviewOption {
    domain: string;
    label: string;
    description?: string;
    icon?: string;
}

export interface InterviewRound {
    id: string;
    roundNumber: number;
    title: string;
    description: string;
    icon: string;
    options: InterviewOption[];
}

// Constants
export const MIN_RESPONSE_TIME = 3000; // 3 seconds

// 4-round interview structure for domain selection UI
export const interviewRounds: InterviewRound[] = [
    {
        id: 'round-1',
        roundNumber: 1,
        title: 'Aptitude',
        description: 'Quantitative, Logical Reasoning & Verbal',
        icon: '🧠',
        options: [
            { domain: 'aptitude-quantitative', label: 'Quantitative', description: 'Math & numerical aptitude', icon: '📐' },
            { domain: 'aptitude-logical', label: 'Logical Reasoning', description: 'Analytical & logical thinking', icon: '🧩' },
            { domain: 'aptitude-verbal', label: 'Verbal', description: 'English & verbal ability', icon: '📖' },
        ],
    },
    {
        id: 'round-2',
        roundNumber: 2,
        title: 'Tech – General',
        description: 'Most asked tech questions for all companies',
        icon: '💻',
        options: [
            { domain: 'tech-general', label: 'General Tech', description: 'Common tech questions across companies', icon: '🌐' },
        ],
    },
    {
        id: 'round-3',
        roundNumber: 3,
        title: 'Tech – Domain Specific',
        description: 'Role-based technical interviews',
        icon: '⚙️',
        options: [
            { domain: 'frontend', label: 'Frontend', description: 'React, HTML, CSS, JavaScript', icon: '🎨' },
            { domain: 'backend', label: 'Backend', description: 'Node, Java, Python, APIs', icon: '🔧' },
            { domain: 'dataanalyst', label: 'Data Analyst', description: 'SQL, analytics, data tools', icon: '📊' },
            { domain: 'aiml', label: 'AI & ML', description: 'Machine learning & AI concepts', icon: '🤖' },
            { domain: 'devops', label: 'DevOps', description: 'CI/CD, cloud, infrastructure', icon: '🚀' },
        ],
    },
    {
        id: 'round-4',
        roundNumber: 4,
        title: 'HR Round',
        description: 'Most asked HR interview questions',
        icon: '👔',
        options: [
            { domain: 'hr', label: 'HR Interview', description: 'Behavioral & situational questions', icon: '🤝' },
        ],
    },
];

// Legacy flat list for backward compatibility (used for label lookup)
export const domainQuestions: DomainQuestion[] = interviewRounds.flatMap((round) =>
    round.options.map((opt) => ({
        domain: opt.domain,
        label: opt.label,
        description: opt.description,
        icon: opt.icon,
        questions: [] as Question[],
    }))
);

// Performance level calculation
export const calculatePerformanceLevel = (percentage: number): 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Needs Improvement';
};

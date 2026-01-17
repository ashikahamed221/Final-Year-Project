// TypeScript interfaces for Mock Interview Test System

export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct option
    keywords: string[]; // Keywords to detect in selected answer for behavior validation
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface DomainQuestions {
    domain: string;
    label: string;
    icon: string;
    description: string;
    questions: Question[];
}

export interface TestResult {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    responseTime: number; // in milliseconds
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

// Domain-based question sets
export const domainQuestions: DomainQuestions[] = [
    {
        domain: 'frontend',
        label: 'Frontend Developer',
        icon: '🎨',
        description: 'HTML, CSS, JavaScript, React, and UI/UX concepts',
        questions: [
            {
                id: 'fe-1',
                question: 'What is the Virtual DOM in React?',
                options: [
                    'A direct copy of the real DOM stored in memory',
                    'A lightweight JavaScript representation of the real DOM',
                    'A browser extension for debugging React',
                    'A database for storing component states'
                ],
                correctAnswer: 1,
                keywords: ['virtual', 'javascript', 'representation', 'lightweight', 'memory'],
                difficulty: 'medium'
            },
            {
                id: 'fe-2',
                question: 'Which CSS property is used to create a flexible container?',
                options: [
                    'display: block',
                    'display: inline',
                    'display: flex',
                    'display: grid'
                ],
                correctAnswer: 2,
                keywords: ['flex', 'flexible', 'flexbox'],
                difficulty: 'easy'
            },
            {
                id: 'fe-3',
                question: 'What does the useEffect hook do in React?',
                options: [
                    'Manages component state',
                    'Handles side effects in functional components',
                    'Creates new React components',
                    'Optimizes render performance'
                ],
                correctAnswer: 1,
                keywords: ['side effects', 'lifecycle', 'functional', 'effects'],
                difficulty: 'medium'
            },
            {
                id: 'fe-4',
                question: 'What is event bubbling in JavaScript?',
                options: [
                    'Events start from the target element and propagate up to ancestors',
                    'Events start from the root and go down to the target',
                    'Events only trigger on the target element',
                    'Events are queued in a bubble data structure'
                ],
                correctAnswer: 0,
                keywords: ['propagate', 'ancestors', 'parent', 'bubbling', 'up'],
                difficulty: 'medium'
            },
            {
                id: 'fe-5',
                question: 'What is the purpose of the key prop in React lists?',
                options: [
                    'To style list items differently',
                    'To encrypt list data',
                    'To help React identify which items have changed, added, or removed',
                    'To sort list items automatically'
                ],
                correctAnswer: 2,
                keywords: ['identify', 'changed', 'unique', 'reconciliation', 'track'],
                difficulty: 'easy'
            },
            {
                id: 'fe-6',
                question: 'What is the difference between == and === in JavaScript?',
                options: [
                    'There is no difference',
                    '== compares values only, === compares values and types',
                    '=== is faster than ==',
                    '== is used for strings, === is used for numbers'
                ],
                correctAnswer: 1,
                keywords: ['type', 'coercion', 'strict', 'equality', 'comparison'],
                difficulty: 'easy'
            }
        ]
    },
    {
        domain: 'backend',
        label: 'Backend Developer',
        icon: '⚙️',
        description: 'Node.js, APIs, databases, and server-side concepts',
        questions: [
            {
                id: 'be-1',
                question: 'What is RESTful API architecture?',
                options: [
                    'A database management system',
                    'An architectural style using HTTP methods for CRUD operations',
                    'A frontend framework',
                    'A type of authentication protocol'
                ],
                correctAnswer: 1,
                keywords: ['http', 'crud', 'stateless', 'resources', 'methods'],
                difficulty: 'medium'
            },
            {
                id: 'be-2',
                question: 'What is the purpose of middleware in Express.js?',
                options: [
                    'To create database connections',
                    'To execute code between request and response cycle',
                    'To render HTML templates',
                    'To compile JavaScript code'
                ],
                correctAnswer: 1,
                keywords: ['request', 'response', 'cycle', 'execute', 'between', 'intercept'],
                difficulty: 'medium'
            },
            {
                id: 'be-3',
                question: 'What is database indexing?',
                options: [
                    'A way to backup database',
                    'A data structure that improves query speed',
                    'A method to encrypt data',
                    'A way to delete duplicate records'
                ],
                correctAnswer: 1,
                keywords: ['speed', 'query', 'performance', 'lookup', 'search'],
                difficulty: 'medium'
            },
            {
                id: 'be-4',
                question: 'What is the difference between SQL and NoSQL databases?',
                options: [
                    'SQL is newer than NoSQL',
                    'SQL uses structured schemas, NoSQL uses flexible schemas',
                    'NoSQL is always faster than SQL',
                    'SQL cannot handle large data'
                ],
                correctAnswer: 1,
                keywords: ['schema', 'structured', 'flexible', 'relational', 'document'],
                difficulty: 'easy'
            },
            {
                id: 'be-5',
                question: 'What is JWT (JSON Web Token)?',
                options: [
                    'A database query language',
                    'A compact, self-contained token for secure information transmission',
                    'A JavaScript testing framework',
                    'A CSS preprocessor'
                ],
                correctAnswer: 1,
                keywords: ['token', 'authentication', 'secure', 'stateless', 'authorization'],
                difficulty: 'medium'
            },
            {
                id: 'be-6',
                question: 'What is connection pooling?',
                options: [
                    'Creating new connections for every request',
                    'Reusing existing database connections to improve performance',
                    'Connecting multiple databases together',
                    'A type of load balancing'
                ],
                correctAnswer: 1,
                keywords: ['reuse', 'performance', 'efficiency', 'connections', 'manage'],
                difficulty: 'hard'
            }
        ]
    },
    {
        domain: 'fullstack',
        label: 'Full Stack Developer',
        icon: '🔄',
        description: 'End-to-end development, architecture, and integration',
        questions: [
            {
                id: 'fs-1',
                question: 'What is the MVC architecture pattern?',
                options: [
                    'Model-View-Controller separating data, UI, and logic',
                    'Multiple Virtual Computers',
                    'Modern Visual Components',
                    'Memory, Volume, Cache'
                ],
                correctAnswer: 0,
                keywords: ['model', 'view', 'controller', 'separation', 'concerns'],
                difficulty: 'medium'
            },
            {
                id: 'fs-2',
                question: 'What is CORS and why is it important?',
                options: [
                    'A CSS framework for responsive design',
                    'Cross-Origin Resource Sharing for secure cross-domain requests',
                    'A caching mechanism for APIs',
                    'A database replication strategy'
                ],
                correctAnswer: 1,
                keywords: ['cross-origin', 'security', 'domain', 'browser', 'policy'],
                difficulty: 'medium'
            },
            {
                id: 'fs-3',
                question: 'What is the difference between SSR and CSR?',
                options: [
                    'SSR renders on server, CSR renders on client/browser',
                    'SSR is slower than CSR always',
                    'CSR is better for SEO',
                    'They are the same thing'
                ],
                correctAnswer: 0,
                keywords: ['server', 'client', 'render', 'browser', 'html'],
                difficulty: 'medium'
            },
            {
                id: 'fs-4',
                question: 'What is a microservices architecture?',
                options: [
                    'Using very small servers',
                    'Breaking application into small, independent, deployable services',
                    'Minimizing code in applications',
                    'A type of cloud computing'
                ],
                correctAnswer: 1,
                keywords: ['independent', 'services', 'deployable', 'decoupled', 'scalable'],
                difficulty: 'hard'
            },
            {
                id: 'fs-5',
                question: 'What is WebSocket used for?',
                options: [
                    'Storing data in the browser',
                    'Real-time bidirectional communication between client and server',
                    'Styling web pages',
                    'Compiling JavaScript'
                ],
                correctAnswer: 1,
                keywords: ['real-time', 'bidirectional', 'persistent', 'connection', 'communication'],
                difficulty: 'medium'
            },
            {
                id: 'fs-6',
                question: 'What is a CDN (Content Delivery Network)?',
                options: [
                    'A type of database',
                    'A distributed network of servers to deliver content faster',
                    'A code deployment tool',
                    'A programming language'
                ],
                correctAnswer: 1,
                keywords: ['distributed', 'servers', 'cache', 'faster', 'delivery', 'edge'],
                difficulty: 'easy'
            }
        ]
    },
    {
        domain: 'data-science',
        label: 'Data Scientist',
        icon: '📊',
        description: 'Machine learning, statistics, and data analysis',
        questions: [
            {
                id: 'ds-1',
                question: 'What is overfitting in machine learning?',
                options: [
                    'Model performs equally well on training and test data',
                    'Model performs too well on training data but poorly on new data',
                    'Model takes too long to train',
                    'Model uses too much memory'
                ],
                correctAnswer: 1,
                keywords: ['training', 'generalize', 'new data', 'memorize', 'variance'],
                difficulty: 'medium'
            },
            {
                id: 'ds-2',
                question: 'What is the purpose of cross-validation?',
                options: [
                    'To increase training speed',
                    'To estimate model performance on unseen data',
                    'To reduce model size',
                    'To encrypt training data'
                ],
                correctAnswer: 1,
                keywords: ['validate', 'performance', 'unseen', 'folds', 'generalization'],
                difficulty: 'medium'
            },
            {
                id: 'ds-3',
                question: 'What is the difference between classification and regression?',
                options: [
                    'Classification predicts categories, regression predicts continuous values',
                    'Regression is more accurate than classification',
                    'Classification uses neural networks only',
                    'They are the same thing'
                ],
                correctAnswer: 0,
                keywords: ['categories', 'continuous', 'discrete', 'predict', 'classes'],
                difficulty: 'easy'
            },
            {
                id: 'ds-4',
                question: 'What is feature engineering?',
                options: [
                    'Deleting features from the dataset',
                    'Creating and transforming features to improve model performance',
                    'Drawing feature diagrams',
                    'A type of neural network'
                ],
                correctAnswer: 1,
                keywords: ['creating', 'transforming', 'variables', 'improve', 'input'],
                difficulty: 'medium'
            },
            {
                id: 'ds-5',
                question: 'What is the purpose of a confusion matrix?',
                options: [
                    'To confuse the model during training',
                    'To evaluate classification model performance with TP, TN, FP, FN',
                    'To visualize data distribution',
                    'To encrypt predictions'
                ],
                correctAnswer: 1,
                keywords: ['evaluation', 'true positive', 'false negative', 'accuracy', 'classification'],
                difficulty: 'medium'
            },
            {
                id: 'ds-6',
                question: 'What is gradient descent?',
                options: [
                    'A type of neural network layer',
                    'An optimization algorithm to minimize the loss function',
                    'A data visualization technique',
                    'A database query method'
                ],
                correctAnswer: 1,
                keywords: ['optimization', 'minimize', 'loss', 'learning rate', 'weights'],
                difficulty: 'hard'
            }
        ]
    },
    {
        domain: 'devops',
        label: 'DevOps Engineer',
        icon: '🚀',
        description: 'CI/CD, containers, cloud, and infrastructure',
        questions: [
            {
                id: 'do-1',
                question: 'What is Docker containerization?',
                options: [
                    'A virtual machine technology',
                    'Packaging applications with dependencies in isolated containers',
                    'A cloud provider service',
                    'A programming language'
                ],
                correctAnswer: 1,
                keywords: ['container', 'isolated', 'dependencies', 'packaging', 'image'],
                difficulty: 'medium'
            },
            {
                id: 'do-2',
                question: 'What is CI/CD pipeline?',
                options: [
                    'A data transfer protocol',
                    'Continuous Integration and Continuous Deployment automation',
                    'A monitoring tool',
                    'A security framework'
                ],
                correctAnswer: 1,
                keywords: ['continuous', 'integration', 'deployment', 'automation', 'build'],
                difficulty: 'medium'
            },
            {
                id: 'do-3',
                question: 'What is Kubernetes used for?',
                options: [
                    'Writing code',
                    'Container orchestration and management at scale',
                    'Database management',
                    'Frontend development'
                ],
                correctAnswer: 1,
                keywords: ['orchestration', 'containers', 'scale', 'pods', 'cluster'],
                difficulty: 'medium'
            },
            {
                id: 'do-4',
                question: 'What is Infrastructure as Code (IaC)?',
                options: [
                    'Writing code that runs on servers',
                    'Managing infrastructure through code/configuration files',
                    'A type of programming language',
                    'Manual server configuration'
                ],
                correctAnswer: 1,
                keywords: ['infrastructure', 'code', 'configuration', 'terraform', 'automation'],
                difficulty: 'medium'
            },
            {
                id: 'do-5',
                question: 'What is a load balancer?',
                options: [
                    'A device that increases server weight',
                    'A system that distributes network traffic across multiple servers',
                    'A code optimization tool',
                    'A database backup system'
                ],
                correctAnswer: 1,
                keywords: ['distribute', 'traffic', 'servers', 'balance', 'availability'],
                difficulty: 'easy'
            },
            {
                id: 'do-6',
                question: 'What is the purpose of monitoring and logging in DevOps?',
                options: [
                    'To slow down the application',
                    'To track system health, performance, and debug issues',
                    'To increase code complexity',
                    'To replace testing'
                ],
                correctAnswer: 1,
                keywords: ['track', 'health', 'performance', 'debug', 'observability'],
                difficulty: 'easy'
            }
        ]
    }
];

// Helper function to get questions by domain
export const getQuestionsByDomain = (domain: string): Question[] => {
    const domainData = domainQuestions.find(d => d.domain === domain);
    return domainData ? domainData.questions : [];
};

// Helper function to calculate performance level
export const calculatePerformanceLevel = (percentage: number): TestSummary['performanceLevel'] => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Needs Improvement';
};

// Minimum response time in ms to consider answer as properly read
export const MIN_RESPONSE_TIME = 3000; // 3 seconds

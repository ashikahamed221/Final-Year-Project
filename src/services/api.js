// const API_URL = "http://localhost:5000";

// export const getUserTests = async () => {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API_URL}/user-tests`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   return res.json();
// };

// export const getTestDetails = async (id) => {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API_URL}/test/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   return res.json();
// };
const API_URL = "https://ai-backend-r57w.onrender.com";

export const getUserTests = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/user-tests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user tests");
  }

  return res.json();
};

export const getTestDetails = async (id) => {
  // Mock data for testing
  if (id === "mock-test") {
    return {
      id: "mock-test",
      domain: "Full Stack Development",
      score: 16,
      total: 20,
      performance: "Good",
      completionDate: new Date().toISOString(),
      resumeSkills: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript"],
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
        {
          id: "q2",
          question: "Explain the difference between let and const in JavaScript",
          selected: "let is mutable and const is immutable",
          isCorrect: true,
          responseTime: 7.2,
          correctAnswer: "let is mutable and const is immutable",
          difficulty: "easy"
        },
        {
          id: "q3",
          question: "What is a closure in JavaScript?",
          selected: "A function that has access to variables from another function",
          isCorrect: true,
          responseTime: 12.3,
          correctAnswer: "A function that has access to variables from another function's scope",
          difficulty: "medium"
        },
        {
          id: "q4",
          question: "How does MongoDB differ from SQL databases?",
          selected: "MongoDB is NoSQL, uses documents instead of tables",
          isCorrect: true,
          responseTime: 15.8,
          correctAnswer: "MongoDB is NoSQL, uses documents instead of tables",
          difficulty: "medium"
        },
        {
          id: "q5",
          question: "What is async/await?",
          selected: "Syntax for handling asynchronous operations",
          isCorrect: true,
          responseTime: 11.2,
          correctAnswer: "Syntax for handling asynchronous operations in JavaScript",
          difficulty: "medium"
        },
        {
          id: "q6",
          question: "Explain the event loop in JavaScript",
          selected: "A mechanism that handles callbacks and promises",
          isCorrect: false,
          responseTime: 18.5,
          correctAnswer: "A continuous process that checks for tasks in the call stack and callback queue",
          difficulty: "hard"
        },
        {
          id: "q7",
          question: "What is a microservice architecture?",
          selected: "Breaking down applications into small independent services",
          isCorrect: true,
          responseTime: 14.2,
          correctAnswer: "Breaking down applications into small independent services",
          difficulty: "hard"
        },
        {
          id: "q8",
          question: "How do you optimize database queries?",
          selected: "Using indexes and caching strategies",
          isCorrect: true,
          responseTime: 16.7,
          correctAnswer: "Using indexes, caching, and query optimization techniques",
          difficulty: "hard"
        },
        {
          id: "q9",
          question: "What is REST API?",
          selected: "Architectural style using HTTP requests",
          isCorrect: true,
          responseTime: 9.1,
          correctAnswer: "Architectural style using HTTP requests for CRUD operations",
          difficulty: "easy"
        },
        {
          id: "q10",
          question: "Explain the concept of promises in JavaScript",
          selected: "Object representing eventual completion of an async operation",
          isCorrect: true,
          responseTime: 10.8,
          correctAnswer: "Object representing eventual completion of an async operation",
          difficulty: "medium"
        },
        {
          id: "q11",
          question: "What is state management?",
          selected: "Managing application data and state",
          isCorrect: false,
          responseTime: 19.3,
          correctAnswer: "Managing application data, state changes, and data flow",
          difficulty: "medium"
        },
        {
          id: "q12",
          question: "How do you handle errors in Node.js?",
          selected: "Using try-catch blocks and error middleware",
          isCorrect: true,
          responseTime: 13.5,
          correctAnswer: "Using try-catch blocks and error middleware",
          difficulty: "medium"
        },
        {
          id: "q13",
          question: "What is JWT authentication?",
          selected: "JSON Web Token for secure authentication",
          isCorrect: true,
          responseTime: 11.2,
          correctAnswer: "JSON Web Token for stateless authentication and authorization",
          difficulty: "medium"
        },
        {
          id: "q14",
          question: "Explain the MERN stack",
          selected: "MongoDB, Express, React, Node.js",
          isCorrect: true,
          responseTime: 8.9,
          correctAnswer: "MongoDB, Express, React, Node.js",
          difficulty: "easy"
        },
        {
          id: "q15",
          question: "What is the difference between setInterval and setTimeout?",
          selected: "setTimeout runs once, setInterval runs repeatedly",
          isCorrect: true,
          responseTime: 10.5,
          correctAnswer: "setTimeout runs once after delay, setInterval runs repeatedly",
          difficulty: "easy"
        },
        {
          id: "q16",
          question: "How do you implement global state management?",
          selected: "Using Context API or Redux",
          isCorrect: true,
          responseTime: 15.2,
          correctAnswer: "Using Context API, Redux, or other state management libraries",
          difficulty: "hard"
        },
        {
          id: "q17",
          question: "What is the purpose of middleware in Express?",
          selected: "Functions that process requests and responses",
          isCorrect: true,
          responseTime: 12.8,
          correctAnswer: "Functions that process requests and responses in the HTTP pipeline",
          difficulty: "medium"
        },
        {
          id: "q18",
          question: "Explain functional programming concepts",
          selected: "Function is the primary abstraction unit",
          isCorrect: false,
          responseTime: 20.1,
          correctAnswer: "Using pure functions, immutability, and avoiding side effects",
          difficulty: "hard"
        },
        {
          id: "q19",
          question: "How do you secure your Node.js application?",
          selected: "Using HTTPS and input validation",
          isCorrect: true,
          responseTime: 14.6,
          correctAnswer: "Using HTTPS, input validation, and security headers",
          difficulty: "hard"
        },
        {
          id: "q20",
          question: "What is responsive design?",
          selected: "Design that adapts to different screen sizes",
          isCorrect: true,
          responseTime: 7.8,
          correctAnswer: "Design that adapts to different screen sizes using CSS media queries",
          difficulty: "easy"
        }
      ],
      areasToImprove: [
        "Event loop understanding - needs deeper study",
        "Functional programming concepts",
        "Advanced state management patterns",
        "System design and architecture"
      ],
      strengths: [
        "Strong fundamentals in JavaScript and React",
        "Good understanding of Node.js and MongoDB",
        "Quick problem-solving ability (average response time: 12.5s)",
        "Excellent grasp of REST APIs and authentication"
      ],
      recommendations: [
        "Practice more event loop visualization exercises",
        "Study functional programming patterns in depth",
        "Work on real-world microservice projects",
        "Review advanced system design concepts",
        "Explore performance optimization techniques"
      ]
    };
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/test/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch test details");
  }

  return res.json();
};

export const getUserStats = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/user-stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user stats");
  }

  return res.json();
};
import { Content } from "vaul";
import { callGroqAPI } from "../lib/utils";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

// Helper to generate career roadmap
export async function generateRoadmap(targetRole: string, skillLevel: string, techStack: string) {
  const endpoint = "/openai/v1/chat/completions";
  const data = {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        // content: `You are a professional career coach. Generate a detailed 12-week roadmap in JSON format.
        content: `Your task is to generate a detailed, role-based learning roadmap in valid JSON format.

        The roadmap must:
        - Span a total duration of 12 weeks by default
        - Be customized based on the given job role or domain
        - Break down learning into weekly milestones
        - Include topics, subtopics, and practical tasks for each week

        If the selected domain or role typically requires a longer learning period (for example 5 weeks, 12 weeks, 15 weeks, or more), you must:
        - Adjust the total duration accordingly
        - Clearly justify why additional time is required
        - Still maintain a week-by-week structured roadmap

        The output must:
        - Be strictly valid JSON (no explanations or extra text)
        - Be beginner-friendly but industry-relevant
        - Focus on real-world, job-ready skills
        - Provide Resource Link in famous website

        Structure: { "roadmap": [{ "id": "1", "week": "Week 1", "title": "...", "description": "...", "skills": [], "tools": [], "resources": [{"name": "...", "url": "..."}], "completed": false }] }`
      },
      {
        role: "user",
        content: `Create a 12-week roadmap for a ${skillLevel} ${targetRole} using ${techStack}.`
      }
    ]
  };
  
  try {
    const response = await callGroqAPI(endpoint, data, GROQ_API_KEY);
    return extractJSON(response);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e);
    return { roadmap: [] };
  }
}

// Helper for interview practice
export async function generateInterviewResponse(messages: { role: string; content: string }[], role: string) {
  const endpoint = "/openai/v1/chat/completions";
  const data = {
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are an expert technical interviewer and interview coach for a ${role} position.
        When the user pastes an interview question, respond in the following structured format:

         1. ✅ IDEAL ANSWER
         - Give a clear, correct, and interview-ready answer.
         - Keep it concise and beginner-friendly.
         
         2. 🗣️ HOW TO EXPLAIN THIS IN AN INTERVIEW
         - Explain how the candidate should speak this answer confidently.
         - Use simple language and real-world examples if possible.
         - Include tips like pauses, keywords, and confidence tricks.
         
         3. ❓ FOLLOW-UP QUESTIONS INTERVIEWER MAY ASK
         - List 3–5 realistic follow-up questions.
         - Increase difficulty gradually (basic → intermediate → advanced).
         
         4. 💻 IF THIS IS A CODING QUESTION
         - Explain the approach step by step.
         - Provide a clean and easy-to-understand solution.
         - Mention time and space complexity.
         - Explain how to describe the solution to the interviewer verbally.
         
         Rules:
         - Use bullet points.
         - Avoid unnecessary theory.
         - Assume the candidate is a student or fresher.
         - Be encouraging and practical.
        `

      },
      ...messages
    ]
  };
  return await callGroqAPI(endpoint, data, GROQ_API_KEY);
}

// Helper for mock interview question explanations
export async function generateQuestionExplanation(
  question: string,
  correctAnswer: string,
  domain: string
): Promise<string> {
  const endpoint = "/openai/v1/chat/completions";
  const data = {
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are an expert technical interviewer for ${domain} positions. 
Provide clear, concise explanations for interview questions. 
Keep your response focused and interview-ready - something a candidate could quickly understand and remember.
Format: Start with the key concept, then explain why it matters, and optionally mention a real-world use case.
Maximum 3-4 sentences.`
      },
      {
        role: "user",
        content: `Explain why this is the correct answer for an interview question:

Question: ${question}
Correct Answer: ${correctAnswer}

Provide a clear, interview-focused explanation.`
      }
    ]
  };
  return await callGroqAPI(endpoint, data, GROQ_API_KEY);
}

// Helper to build context-aware prompt based on domain/round type
function getInterviewPromptContext(domain: string, domainLabel: string): { system: string; user: string } {
  // Round 1: Aptitude
  if (domain.startsWith("aptitude-")) {
    const typeMap: Record<string, string> = {
      "aptitude-quantitative": "quantitative aptitude (math, percentages, ratios, speed, time, algebra)",
      "aptitude-logical": "logical reasoning (patterns, sequences, deductions, syllogisms)",
      "aptitude-verbal": "verbal ability (English grammar, vocabulary, comprehension, analogies)",
    };
    const focus = typeMap[domain] || "aptitude";
    return {
      system: `You are an expert aptitude test designer. Generate exactly 5 MCQ questions for ${focus}.

IMPORTANT: You MUST return ONLY valid JSON with no markdown formatting, no backticks, and no extra text.

Return a JSON object with this exact structure:
{
  "questions": [
    {
      "id": "q1",
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "keywords": ["keyword1", "keyword2", "keyword3"],
      "difficulty": "easy"
    }
  ]
}

Requirements:
- Generate exactly 5 questions
- Mix difficulties: 3 easy, 1 medium, 1 hard
- Each question must have exactly 4 options; correctAnswer is 0-3 (index)
- Include 3-5 relevant keywords for each question
- Questions should match placement/competitive exam style`,
      user: `Generate 5 aptitude questions for ${domainLabel}. Return only valid JSON.`,
    };
  }

  // Round 2: General Tech (most asked across companies)
  if (domain === "tech-general") {
    return {
      system: `You are an expert technical interviewer. Generate exactly 5 MCQ questions that are the MOST FREQUENTLY ASKED technical interview questions across all companies (FAANG, startups, product companies).

Include: OOP, DSA basics, databases, networks, OS, system design basics, coding best practices.

IMPORTANT: You MUST return ONLY valid JSON with no markdown, no backticks.

Return: { "questions": [{ "id": "q1", "question": "...", "options": ["A","B","C","D"], "correctAnswer": 0, "keywords": [], "difficulty": "easy" }] }

Requirements: 5 questions, mix difficulties, 4 options each, correctAnswer 0-3, 3-5 keywords per question.`,
      user: `Generate 5 most-asked general tech interview questions. Return only valid JSON.`,
    };
  }

  // Round 4: HR
  if (domain === "hr") {
    return {
      system: `You are an expert HR interviewer. Generate exactly 5 MCQ questions based on the MOST FREQUENTLY ASKED HR/behavioral interview questions (Tell me about yourself, strengths, weaknesses, conflict resolution, teamwork, leadership, etc.).

IMPORTANT: You MUST return ONLY valid JSON with no markdown, no backticks.

Return: { "questions": [{ "id": "q1", "question": "...", "options": ["A","B","C","D"], "correctAnswer": 0, "keywords": [], "difficulty": "easy" }] }

Requirements: 5 questions, mix difficulties, 4 options each, correctAnswer 0-3, 3-5 keywords per question.`,
      user: `Generate 5 most-asked HR interview questions. Return only valid JSON.`,
    };
  }

  // Round 3: Domain-specific tech (frontend, backend, dataanalyst, aiml, devops)
  return {
    system: `You are an expert technical interviewer for ${domainLabel} positions. Generate exactly 5 MCQ interview questions for ${domainLabel} roles.

IMPORTANT: You MUST return ONLY valid JSON with no markdown formatting, no backticks, and no extra text.

Return a JSON object with this exact structure:
{
  "questions": [
    {
      "id": "q1",
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "keywords": ["keyword1", "keyword2", "keyword3"],
      "difficulty": "easy"
    }
  ]
}

Requirements:
- Generate exactly 5 questions
- Mix difficulties: 3 easy, 1 medium, 1 hard
- Each question must have exactly 4 options; correctAnswer is 0-3 (index)
- Include 3-5 relevant keywords for each question
- Questions should be industry-relevant and interview-focused`,
    user: `Generate 5 interview questions for a ${domainLabel} position. Return only valid JSON.`,
  };
}

// Helper to generate interview questions for a domain
export async function generateInterviewQuestions(domain: string, domainLabel: string) {
  const { system, user } = getInterviewPromptContext(domain, domainLabel);
  const endpoint = "/openai/v1/chat/completions";
  const data = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ]
  };

  try {
    const response = await callGroqAPI(endpoint, data, GROQ_API_KEY);
    const parsed = extractJSON(response);
    
    // Validate questions format
    if (parsed.questions && Array.isArray(parsed.questions)) {
      return parsed;
    }
    
    throw new Error("Invalid questions response structure");
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", e);
    return { questions: [] };
  }
}

// Helper to analyze resume and extract information
// Helper function to extract JSON from response (handles markdown code blocks)
function extractJSON(response: string): any {
  try {
    // Try parsing directly first
    return JSON.parse(response);
  } catch (e) {
    // Try removing markdown code blocks
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1].trim());
      } catch (e2) {
        console.error("Failed to parse JSON from markdown block:", e2);
      }
    }
    
    // Try finding JSON object pattern
    const objectMatch = response.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
      } catch (e3) {
        console.error("Failed to parse JSON from object match:", e3);
      }
    }
    
    throw e;
  }
}

// AI Code Evaluator - Evaluates and provides feedback on code
export async function evaluateCode(
  code: string,
  language: string,
  description?: string
) {
  const endpoint = "/openai/v1/chat/completions";
  const data = {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an expert code reviewer and software engineer. Analyze the provided ${language} code and provide comprehensive feedback in valid JSON format (no markdown, no code blocks).

Return exactly this JSON structure:
{
  "codeQuality": "excellent|good|average|needs-improvement",
  "logicExplanation": "Brief explanation of what the code does",
  "timeComplexity": "Explanation and Big O notation",
  "spaceComplexity": "Explanation and Big O notation",
  "bestPractices": [
    {
      "category": "Naming|Performance|Structure|Error Handling|etc",
      "suggestion": "Specific improvement suggestion",
      "severity": "critical|major|minor"
    }
  ],
  "mistakes": [
    {
      "issue": "Description of the issue",
      "impact": "What could go wrong",
      "fix": "How to fix it"
    }
  ],
  "improvedCode": "Refactored version of the code with all fixes applied - include code comments",
  "performance": {
    "score": 1-10,
    "bottlenecks": ["bottleneck1", "bottleneck2"],
    "optimizations": ["optimization1", "optimization2"]
  },
  "readability": {
    "score": 1-10,
    "issues": ["issue1", "issue2"],
    "suggestions": ["suggestion1", "suggestion2"]
  },
  "overallScore": 1-10,
  "strengths": ["strength1", "strength2"],
  "keyTakeaways": ["takeaway1", "takeaway2", "takeaway3"]
}`
      },
      {
        role: "user",
        content: `Review this ${language} code and provide comprehensive feedback.
${description ? `Problem Description: ${description}` : ''}

Code to review:
\`\`\`${language}
${code}
\`\`\`

Return only valid JSON with no additional text.`
      }
    ]
  };

  try {
    const response = await callGroqAPI(endpoint, data, GROQ_API_KEY);
    const parsed = extractJSON(response);
    
    // Ensure all required fields exist with defaults
    return {
      codeQuality: parsed.codeQuality || "good",
      logicExplanation: parsed.logicExplanation || "Code analyzed successfully",
      timeComplexity: parsed.timeComplexity || "Not specified",
      spaceComplexity: parsed.spaceComplexity || "Not specified",
      bestPractices: Array.isArray(parsed.bestPractices) ? parsed.bestPractices : [],
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      improvedCode: parsed.improvedCode || code,
      performance: parsed.performance || { score: 7, bottlenecks: [], optimizations: [] },
      readability: parsed.readability || { score: 7, issues: [], suggestions: [] },
      overallScore: parsed.overallScore || 7,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      keyTakeaways: Array.isArray(parsed.keyTakeaways) ? parsed.keyTakeaways : []
    };
  } catch (e) {
    console.error("Failed to evaluate code:", e);
    return {
      codeQuality: "good",
      logicExplanation: "Code uploaded for evaluation",
      timeComplexity: "Analysis pending",
      spaceComplexity: "Analysis pending",
      bestPractices: [],
      mistakes: [],
      improvedCode: code,
      performance: { score: 0, bottlenecks: [], optimizations: [] },
      readability: { score: 0, issues: [], suggestions: [] },
      overallScore: 0,
      strengths: [],
      keyTakeaways: []
    };
  }
}

// Generate code snippets for learning
export async function generateCodeSnippets(
  topic: string,
  language: string,
  difficulty: "beginner" | "intermediate" | "advanced"
) {
  const endpoint = "/openai/v1/chat/completions";
  const data = {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an expert ${language} programmer. Generate 3 code snippets for learning purposes. Return ONLY valid JSON (no markdown, no code blocks).

Return exactly this JSON structure:
{
  "snippets": [
    {
      "name": "Snippet Name",
      "description": "What this snippet demonstrates",
      "code": "Complete working code",
      "explanation": "Line-by-line explanation",
      "keyPoints": ["point1", "point2", "point3"],
      "commonMistakes": ["mistake1", "mistake2"]
    }
  ]
}`
      },
      {
        role: "user",
        content: `Generate 3 ${difficulty} level code snippets for "${topic}" in ${language}.
Each snippet should:
1. Be practical and useful
2. Include detailed comments
3. Demonstrate best practices
4. Be copy-paste ready

Return only valid JSON.`
      }
    ]
  };

  try {
    const response = await callGroqAPI(endpoint, data, GROQ_API_KEY);
    const parsed = extractJSON(response);
    return {
      snippets: Array.isArray(parsed.snippets) ? parsed.snippets : []
    };
  } catch (e) {
    console.error("Failed to generate code snippets:", e);
    return { snippets: [] };
  }
}


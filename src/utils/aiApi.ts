import { Content } from "vaul";
import { callOpenRouterAPI } from "../lib/utils";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";

// Helper to generate career roadmap
export async function generateRoadmap(targetRole: string, skillLevel: string, techStack: string) {
  const endpoint = "/v1/chat/completions";
  const data = {
    model: "nvidia/nemotron-nano-9b-v2:free",
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
    ],
    response_format: { type: "json_object" }
  };
  const response = await callOpenRouterAPI(endpoint, data, OPENROUTER_API_KEY);
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", response);
    return { roadmap: [] };
  }
}

// Helper for interview practice
export async function generateInterviewResponse(messages: { role: string; content: string }[], role: string) {
  const endpoint = "/v1/chat/completions";
  const data = {
    // model: "nvidia/nemotron-3-nano-30b-a3b:free",
    model: "nvidia/nemotron-nano-9b-v2:free",
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
  return await callOpenRouterAPI(endpoint, data, OPENROUTER_API_KEY);
}

// Helper for cover letter generation
export async function generateCoverLetter(jobDetails: {
  role: string;
  company: string;
  description: string;
  skills: string;
}) {
  const endpoint = "/v1/chat/completions";
  const data = {
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    messages: [
      {
        role: "system",
        content: "You are a professional resume writer specializing in ATS-friendly cover letters."
      },
      {
        role: "user",
        content: `Generate a tailored cover letter for a ${jobDetails.role} position at ${jobDetails.company}.
        Job Description: ${jobDetails.description}
        My Skills: ${jobDetails.skills}`
      }
    ]
  };
  return await callOpenRouterAPI(endpoint, data, OPENROUTER_API_KEY);
}

// Helper for mock interview question explanations
export async function generateQuestionExplanation(
  question: string,
  correctAnswer: string,
  domain: string
): Promise<string> {
  const endpoint = "/v1/chat/completions";
  const data = {
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
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
  return await callOpenRouterAPI(endpoint, data, OPENROUTER_API_KEY);
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
  const endpoint = "/v1/chat/completions";
  const data = {
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: { type: "json_object" }
  };

  const response = await callOpenRouterAPI(endpoint, data, OPENROUTER_API_KEY);
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", response);
    return { questions: [] };
  }
}

// Helper to analyze resume and extract information
export async function analyzeResume(resumeContent: string) {
  const endpoint = "/v1/chat/completions";
  const data = {
    model: "anthropic/claude-3.7-sonnet",
    messages: [
      {
        role: "system",
        content: `You are an expert career counselor and resume analyst. Analyze the provided resume and return a detailed JSON analysis.

IMPORTANT: You MUST return ONLY valid JSON with no markdown formatting, no backticks, and no extra text.

Return a JSON object with this exact structure:
{
  "overallFeedback": "Summary of the resume",
  "strengths": ["strength1", "strength2", "strength3"],
  "areasToImprove": ["area1", "area2", "area3"],
  "missingSkills": ["skill1", "skill2"],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description",
      "technologies": ["tech1", "tech2"]
    }
  ],
  "internships": [
    {
      "company": "Company Name",
      "role": "Role Title",
      "duration": "Duration",
      "description": "Brief description"
    }
  ],
  "suggestedFocusAreas": ["area1", "area2", "area3", "area4"]
}

Requirements:
- Extract all projects mentioned in the resume
- Extract all internship/work experience
- Identify key skills and technologies
- Provide constructive feedback on areas for improvement
- Suggest 4 focus areas for interview preparation based on the resume`
      },
      {
        role: "user",
        content: `Please analyze this resume and provide detailed feedback:

${resumeContent}

Return only valid JSON with the structure specified.`
      }
    ],
    response_format: { type: "json_object" }
  };

  try {
    const response = await callOpenRouterAPI(endpoint, data, OPENROUTER_API_KEY);
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse resume analysis response as JSON:", e);
    return {
      overallFeedback: "Analysis in progress...",
      strengths: ["Technical skills", "Project experience", "Problem-solving ability"],
      areasToImprove: ["Communication", "Leadership experience", "System design knowledge"],
      missingSkills: ["Cloud platforms", "Advanced frameworks"],
      projects: [],
      internships: [],
      suggestedFocusAreas: ["Core Programming Concepts", "Data Structures & Algorithms", "System Design", "Behavioral Questions"]
    };
  }
}

// Helper to generate project-based interview questions
export async function generateProjectBasedQuestions(resumeAnalysis: any) {
  const endpoint = "/v1/chat/completions";
  
  const projectsList = resumeAnalysis.projects.map((p: any) => 
    `- ${p.name}: ${p.description} (Tech: ${p.technologies.join(', ')})`
  ).join('\n');
  
  const skillsList = resumeAnalysis.suggestedFocusAreas.join(', ');

  const data = {
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    messages: [
      {
        role: "system",
        content: `You are an expert technical interviewer. Generate exactly 5 MCQ questions based on the candidate's projects and mentioned experience.

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
- Questions should be based on the candidate's specific projects and technologies
- Ask about design decisions, technical challenges, and implementation details`
      },
      {
        role: "user",
        content: `Generate 5 interview questions based on these candidate projects and skill areas:

Projects:
${projectsList}

Key Skills to ask about:
${skillsList}

Return only valid JSON with the structure specified.`
      }
    ],
    response_format: { type: "json_object" }
  };

  try {
    const response = await callOpenRouterAPI(endpoint, data, OPENROUTER_API_KEY);
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse project questions response as JSON:", e);
    return { questions: [] };
  }
}


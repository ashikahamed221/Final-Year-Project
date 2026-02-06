import { Content } from "vaul";
import { callOpenRouterAPI } from "../lib/utils";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";

// Helper to generate career roadmap
export async function generateRoadmap(targetRole: string, skillLevel: string, techStack: string) {
  const endpoint = "/v1/chat/completions";
  const data = {
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
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
        content: `You are an expert interviewer for a ${role} position. Provide helpful, concise feedback and follow-up questions with clear bullet points.`
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
    model: "tngtech/deepseek-r1t-chimera:free",
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

// Helper to generate 30 interview questions for a domain
export async function generateInterviewQuestions(domain: string, domainLabel: string) {
  const endpoint = "/v1/chat/completions";
  const data = {
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    messages: [
      {
        role: "system",
        content: `You are an expert technical interviewer. Generate exactly 5 interview questions for ${domainLabel} positions.

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
- Each question must have exactly 4 options
- correctAnswer is 0-3 (index of correct option)
- Include 3-5 relevant keywords for each question
- Questions should be industry-relevant and interview-focused
- Vary question types (conceptual, practical, best practices)`
      },
      {
        role: "user",
        content: `Generate 5 interview questions for a ${domainLabel} position. Return only valid JSON.`
      }
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


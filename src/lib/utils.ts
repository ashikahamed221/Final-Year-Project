import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";

/**
 * Sends a request to the Groq API.
 * @param {string} endpoint - The Groq API endpoint (e.g., "/openai/v1/chat/completions").
 * @param {object} data - The request payload.
 * @param {string} apiKey - Your Groq API key.
 * @returns {Promise<any>} - The API response data.
 */
export async function callGroqAPI(endpoint: string, data: object, apiKey: string): Promise<any> {
  const baseUrl = "https://api.groq.com";
  
  if (!apiKey) {
    console.error("API Key is missing. Please check your .env file for VITE_GROQ_API_KEY");
    throw new Error("Groq API key is not configured. Please add VITE_GROQ_API_KEY to your .env file.");
  }
  
  try {
    const response = await axios.post(
      `${baseUrl}${endpoint}`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        }
      }
    );

    // Check if the response matches OpenAI's structure (which Groq also uses)
    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.error?.message || error.message;
    
    console.error("Groq API Error:", {
      status,
      message: errorMessage,
      data: error.response?.data
    });
    
    if (status === 401) {
      throw new Error("Groq API Error: Unauthorized - Your API key is invalid or expired. Please check your API key at console.groq.com");
    } else if (status === 429) {
      throw new Error("Groq API Error: Rate limited - Too many requests. Please try again later.");
    } else if (status === 404) {
      throw new Error("Groq API Error: Model not found - The specified model is not available.");
    }
    
    throw new Error(`Groq API Error (${status}): ${errorMessage}`);
  }
}

// Backward compatibility alias
export const callOpenRouterAPI = callGroqAPI;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

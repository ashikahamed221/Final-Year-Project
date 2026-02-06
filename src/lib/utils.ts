import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";

/**
 * Sends a request to the OpenRouter API.
 * @param {string} endpoint - The OpenRouter API endpoint (e.g., "/v1/chat/completions").
 * @param {object} data - The request payload.
 * @param {string} apiKey - Your OpenRouter API key.
 * @returns {Promise<any>} - The API response data.
 */
export async function callOpenRouterAPI(endpoint: string, data: object, apiKey: string): Promise<any> {
  const baseUrl = "https://openrouter.ai/api";
  
  if (!apiKey) {
    console.error("API Key is missing. Please check your .env file for VITE_OPENROUTER_API_KEY");
    throw new Error("OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.");
  }
  
  try {
    const response = await axios.post(
      `${baseUrl}${endpoint}`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "AI Resume Analyser",
        }
      }
    );

    // Check if the response matches OpenRouter's structure
    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.error?.message || error.message;
    
    console.error("OpenRouter API Error:", {
      status,
      message: errorMessage,
      data: error.response?.data
    });
    
    if (status === 401) {
      throw new Error("OpenRouter API Error: Unauthorized - Your API key is invalid or expired. Please check your API key at openrouter.ai");
    } else if (status === 429) {
      throw new Error("OpenRouter API Error: Rate limited - Too many requests. Please try again later.");
    } else if (status === 404) {
      throw new Error("OpenRouter API Error: Model not found - The specified model is not available.");
    }
    
    throw new Error(`OpenRouter API Error (${status}): ${errorMessage}`);
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

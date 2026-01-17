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
  try {
    const response = await axios.post(
      `${baseUrl}${endpoint}`,
      data,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin, // Optional: OpenRouter likes this for rankings
          "X-Title": "AI Resume Analyser", // Optional: OpenRouter likes this
        }
      }
    );

    // Check if the response matches OpenRouter's structure
    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }

    return response.data;
  } catch (error: any) {
    console.error("OpenRouter API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

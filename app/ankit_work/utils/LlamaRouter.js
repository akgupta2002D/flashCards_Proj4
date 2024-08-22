/**
 * Author: Ankit Gupta
 * Project: Nepal Constitution AI - Flashcard Generator
 *
 * Configuration and utility functions for Llama model via OpenRouter.
 */

import { OpenAI } from 'openai'

// Initialize OpenAI client with OpenRouter configuration
const llamaOpenRouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    // Optional headers
    // 'HTTP-Referer': process.env.YOUR_SITE_URL,
    // 'X-Title': process.env.YOUR_SITE_NAME
  }
})

// Specify the Llama model to be used
export const LLAMA_MODEL_NAME = 'meta-llama/llama-3.1-8b-instruct:free'

// Function to create a chat completion with Llama model
export async function createLlamaChatCompletion (messages) {
  try {
    const response = await llamaOpenRouter.chat.completions.create({
      model: LLAMA_MODEL_NAME,
      messages,
      max_tokens: 500 // Adjust based on your needs
    })
    return response
  } catch (error) {
    throw new Error(`Failed to generate chat completion: ${error.message}`)
  }
}

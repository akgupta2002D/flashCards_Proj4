/**
 * Author: Ankit Gupta
 * Project: General AI Inquiry System
 *
 * Configuration and utility functions for Llama model via OpenRouter.
 */

import { OpenAI } from 'openai'

// Initialize OpenAI client with OpenRouter configuration
const llamaOpenRouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    // 'HTTP-Referer': process.env.YOUR_SITE_URL,
    // 'X-Title': process.env.YOUR_SITE_NAME
  }
})

// Specify the Llama model to be used
export const LLAMA_MODEL_NAME = 'meta-llama/llama-3.1-8b-instruct:free'

// Function to generate response using Llama model with context
export async function generateResponseWithContext (userPrompt, context) {
  const fullPrompt = createFullPrompt(userPrompt, context)
  try {
    const response = await llamaOpenRouter.Completion.create({
      model: LLAMA_MODEL_NAME,
      prompt: fullPrompt,
      max_tokens: 500,
      stop: null,
      temperature: 0.5
    })
    return response.choices[0].text.trim()
  } catch (error) {
    console.error('Error generating response:', error)
    return 'There was an error in processing your request.'
  }
}

// Create a full prompt with the user's question and context
function createFullPrompt (userPrompt, context) {
  const contextString = context
    .map((doc, index) => `Context ${index + 1}: ${doc}`)
    .join('\n\n')
  return `
Context:
${contextString}

User's Question:
${userPrompt}

Guidance for Response:
- Provide a concise and structured answer.
- Use bullet points or numbered lists to clarify points.
- Use appropriate terminology as relevant to the topic.
- If the question relates to a specific detail, reference it directly.
- If the context provided is insufficient, state this clearly and provide any general knowledge that might be relevant.
- Ensure your response is informed and thoughtful.`
}

export default llamaOpenRouter

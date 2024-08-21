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

// Function to generate flashcards using Llama model with context
export async function generateFlashcardsWithContext (userPrompt, embeddings) {
  const fullPrompt = createFullPrompt(userPrompt, embeddings)
  try {
    const response = await llamaOpenRouter.Completion.create({
      model: LLAMA_MODEL_NAME,
      prompt: fullPrompt,
      max_tokens: 500,
      stop: null,
      temperature: 0.5
    })
    return parseFlashcards(response.choices[0].text)
  } catch (error) {
    console.error('Error generating flashcards:', error)
    return 'There was an error in processing your request.'
  }
}

// Create a full prompt with the user's question and embeddings
function createFullPrompt (userPrompt, embeddings) {
  const embeddingsString = embeddings
    .map((embedding, index) => `Embedding ${index + 1}: ${embedding}`)
    .join('\n\n')
  return `
Embeddings:
${embeddingsString}

User's Question:
${userPrompt}

Guidance for Flashcards:
- Generate 5 flashcards based on the context provided by the embeddings.
- Each flashcard should have a title and description.
- Ensure the flashcards are informative and relevant to the context.`
}

// Function to parse the response into flashcards
function parseFlashcards (responseText) {
  // Assuming the response is formatted with each flashcard separated by newlines
  const flashcards = responseText.split('\n\n').map((cardText, index) => {
    const [title, description] = cardText.split('\n')
    return {
      title: title || `Flashcard ${index + 1}`,
      description: description || 'No description provided.'
    }
  })
  return flashcards
}

export default llamaOpenRouter

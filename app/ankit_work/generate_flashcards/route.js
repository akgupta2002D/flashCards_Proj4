import { createLlamaChatCompletion } from '../utils/LlamaRouter'

export async function POST (req) {
  try {
    const { userText } = await req.json()

    // Create the prompt using user text directly
    const prompt = `
      You are a flashcard creator. Based on the following user input, create exactly 5 flashcards.
      Each flashcard should have a "front" and a "back", and both should be in JSON format.
      Additionally, provide a unified title that represents the theme of these flashcards.
      Return ONLY the JSON object without any additional text or formatting.

      User's Input Text:
      ${userText}

      Example JSON Format:
      {
        "title": "Geography and Culture of Nepal",
        "flashcards": [
          {
            "front": "What is the capital of Nepal?",
            "back": "Kathmandu."
          },
          {
            "front": "What is the official language of Nepal?",
            "back": "Nepali."
          }
        ]
      }
    `

    // Make the API request to the Llama model
    const response = await createLlamaChatCompletion([
      { role: 'user', content: prompt }
    ])

    // Attempt to directly parse the response as JSON
    const jsonResponse = response.choices[0].message.content.trim()

    // Parse the cleaned JSON
    const parsedFlashcards = JSON.parse(jsonResponse)

    // Return the parsed flashcards as a response
    return new Response(
      JSON.stringify({
        title: parsedFlashcards.title,
        flashcards: parsedFlashcards.flashcards
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error generating flashcards:', error)

    // Retry or handle the situation where JSON was not generated
    return new Response(
      JSON.stringify({
        error: 'Failed to generate flashcards. Please try again.'
      }),
      { status: 500 }
    )
  }
}

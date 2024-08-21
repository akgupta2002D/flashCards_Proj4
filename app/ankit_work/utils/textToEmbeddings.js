import { pipeline } from '@xenova/transformers'

let embeddingPipeline

// Initializes the Hugging Face embedding pipeline
async function initEmbeddingPipeline () {
  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    )
  }
  return embeddingPipeline
}

// Converts the input text into embeddings
export async function textToEmbeddings (text) {
  const createEmbedding = await initEmbeddingPipeline()

  // Split text into chunks if necessary
  const chunks = splitTextIntoChunks(text, 2000) // Adjust chunk size as needed
  const embeddings = []

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const embedding = await createEmbedding(chunk)

    // Flatten the embedding since transformers.js returns an array of arrays
    const flattenedEmbedding = embedding.data[0].flat()
    embeddings.push(flattenedEmbedding)
  }

  return embeddings
}

// Helper function to split text into manageable chunks with an attempt to preserve complete sentences
function splitTextIntoChunks (text, maxChunkLength) {
  const chunks = []
  let start = 0

  while (start < text.length) {
    let end = start + maxChunkLength
    if (end > text.length) end = text.length

    if (end < text.length) {
      const naturalBreak = text.lastIndexOf('.', end)
      if (naturalBreak > start) end = naturalBreak + 1
    }

    chunks.push(text.slice(start, end).trim())
    start = end
  }

  return chunks
}

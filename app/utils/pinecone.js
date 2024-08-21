import { Pinecone } from '@pinecone-database/pinecone'
import { pipeline } from '@xenova/transformers'

let pinecone
let embeddingPipeline

// Initializes a single Pinecone connection instance
export async function initPinecone () {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    })
  }
  return pinecone
}

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

// Adds a document to the Pinecone index by splitting the text into chunks and creating embeddings for each
export async function addDocument (text, metadata = {}) {
  const pinecone = await initPinecone()
  const index = pinecone.index(process.env.PINECONE_INDEX_NAME)

  const createEmbedding = await initEmbeddingPipeline()
  const chunks = splitTextIntoChunks(text, 2000) // Adjust chunk size as needed

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const embedding = await createEmbedding(chunk)

    // Flatten the embedding since transformers.js returns an array of arrays
    const flattenedEmbedding = embedding.data[0].flat()

    await index.upsert([
      {
        id: `doc_${Date.now()}_chunk_${i}`,
        values: flattenedEmbedding,
        metadata: {
          ...metadata,
          text: chunk,
          chunk_index: i,
          total_chunks: chunks.length
        }
      }
    ])
  }
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

// Queries the Pinecone index with a given text query and returns the best matching document texts
export async function queryPinecone (query, topK = 3) {
  const pinecone = await initPinecone()
  const index = pinecone.index(process.env.PINECONE_INDEX_NAME)

  const createEmbedding = await initEmbeddingPipeline()
  const queryEmbedding = await createEmbedding(query)

  // Flatten the embedding since transformers.js returns an array of arrays
  const flattenedEmbedding = queryEmbedding.data[0].flat()

  const results = await index.query({
    vector: flattenedEmbedding,
    topK,
    includeMetadata: true
  })

  return results.matches.map(match => match.metadata.text)
}

// Lists all documents in the Pinecone index, useful for administrative purposes
export async function listDocuments () {
  const pinecone = await initPinecone()
  const index = pinecone.index(process.env.PINECONE_INDEX_NAME)

  const queryResponse = await index.query({
    vector: Array(1536).fill(0), // Assuming 1536 is your vector dimension
    topK: 10000, // Adjust based on your needs
    includeMetadata: true
  })

  return queryResponse.matches.map(match => ({
    id: match.id,
    text: match.metadata.text
    // Add any other metadata fields you want to include
  }))
}

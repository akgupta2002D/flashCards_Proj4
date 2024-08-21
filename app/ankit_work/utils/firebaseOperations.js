import { db } from '../../firebase'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore'

/**
 * Function to create or get a FlashCardsContainer.
 * @param {string} containerName - The name of the FlashCardsContainer.
 * @returns {DocumentReference} - Reference to the FlashCardsContainer document.
 */
async function getOrCreateFlashCardsContainer (containerName) {
  const containerRef = doc(db, 'FlashCardsContainer', containerName)
  const containerSnapshot = await getDocs(containerRef)

  if (!containerSnapshot.exists()) {
    await setDoc(containerRef, {
      createdAt: new Date(),
      name: containerName
    })
    console.log(`Created FlashCardsContainer: ${containerName}`)
  } else {
    console.log(`Using existing FlashCardsContainer: ${containerName}`)
  }

  return containerRef
}

/**
 * Function to add a Topic to the FlashCardsContainer.
 * @param {DocumentReference} containerRef - Reference to the FlashCardsContainer document.
 * @param {string} topicName - The name of the topic to add.
 * @returns {DocumentReference} - Reference to the Topic document.
 */
async function addTopicToContainer (containerRef, topicName) {
  const topicRef = doc(collection(containerRef, 'Topics'), topicName)
  await setDoc(topicRef, {
    createdAt: new Date(),
    name: topicName
  })
  console.log(`Added Topic: ${topicName}`)

  return topicRef
}

/**
 * Function to add flashcards to a specific topic.
 * @param {DocumentReference} topicRef - Reference to the Topic document.
 * @param {Array} flashcards - Array of flashcard objects with title and definition.
 */
async function addFlashcardsToTopic (topicRef, flashcards) {
  for (const flashcard of flashcards) {
    await addDoc(collection(topicRef, 'flashcards'), {
      title: flashcard.title,
      definition: flashcard.definition
    })
    console.log(`Added Flashcard: ${flashcard.title}`)
  }
}

/**
 * Function to generate flashcards from a document.
 * @param {string} containerName - Name of the FlashCardsContainer.
 * @param {string} topicName - Name of the Topic.
 * @param {string} documentText - Text content from which flashcards will be generated.
 * @param {number} numFlashcards - Number of flashcards to generate.
 */
async function generateFlashcards (
  containerName,
  topicName,
  documentText,
  numFlashcards
) {
  // Step 1: Get or create the FlashCardsContainer
  const containerRef = await getOrCreateFlashCardsContainer(containerName)

  // Step 2: Add a new Topic under the container
  const topicRef = await addTopicToContainer(containerRef, topicName)

  // Step 3: Generate flashcards (Mockup data, replace with your actual logic)
  const flashcards = Array.from({ length: numFlashcards }, (_, index) => ({
    title: `Flashcard Title ${index + 1}`,
    definition: `Definition for flashcard ${index + 1}`
  }))

  // Step 4: Add the generated flashcards to the topic
  await addFlashcardsToTopic(topicRef, flashcards)
}

/**
 * Function to update a flashcard's title and definition.
 * @param {DocumentReference} topicRef - Reference to the Topic document.
 * @param {string} flashcardId - ID of the flashcard to update.
 * @param {string} updatedTitle - New title for the flashcard.
 * @param {string} updatedDefinition - New definition for the flashcard.
 */
async function updateFlashcard (
  topicRef,
  flashcardId,
  updatedTitle,
  updatedDefinition
) {
  const flashcardRef = doc(topicRef, 'flashcards', flashcardId)
  await updateDoc(flashcardRef, {
    title: updatedTitle,
    definition: updatedDefinition,
    updatedAt: new Date()
  })
  console.log(`Updated Flashcard ID: ${flashcardId}`)
}

/**
 * Function to delete a flashcard.
 * @param {DocumentReference} topicRef - Reference to the Topic document.
 * @param {string} flashcardId - ID of the flashcard to delete.
 */
async function deleteFlashcard (topicRef, flashcardId) {
  const flashcardRef = doc(topicRef, 'flashcards', flashcardId)
  await deleteDoc(flashcardRef)
  console.log(`Deleted Flashcard ID: ${flashcardId}`)
}

/**
 * Function to delete a topic.
 * @param {DocumentReference} containerRef - Reference to the FlashCardsContainer document.
 * @param {string} topicName - Name of the topic to delete.
 */
async function deleteTopic (containerRef, topicName) {
  const topicRef = doc(containerRef, 'Topics', topicName)
  await deleteDoc(topicRef)
  console.log(`Deleted Topic: ${topicName}`)
}

/**
 * Function to delete an entire FlashCardsContainer.
 * @param {string} containerName - Name of the FlashCardsContainer to delete.
 */
async function deleteFlashCardsContainer (containerName) {
  const containerRef = doc(db, 'FlashCardsContainer', containerName)
  await deleteDoc(containerRef)
  console.log(`Deleted FlashCardsContainer: ${containerName}`)
}

/**
 * Example function to handle document upload and generate flashcards.
 * @param {string} documentText - Text content from the uploaded document.
 */
// async function onDocumentUpload (documentText) {
//   const containerName = 'MyFlashcards'
//   const topicName = 'Sample Topic'
//   const numFlashcards = 5

//   await generateFlashcards(
//     containerName,
//     topicName,
//     documentText,
//     numFlashcards
//   )
// }

// Example call to onDocumentUpload when a document is uploaded
onDocumentUpload('Sample document text...')

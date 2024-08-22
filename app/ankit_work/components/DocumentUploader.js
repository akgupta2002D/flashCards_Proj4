'use client'
import React, { useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Input,
  CssBaseline,
  Container,
  Divider,
  IconButton
} from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import SendIcon from '@mui/icons-material/Send'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from 'next/navigation'

import { db } from '../utils/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'

export default function DocumentUploader () {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [flashcards, setFlashcards] = useState([]) // State to hold flashcards
  const [title, setTitle] = useState('')

  const router = useRouter()

  const saveFlashcardsToFirebase = async (title, flashcards) => {
    try {
      console.log('Saving flashcards:', { title, flashcards })

      // Step 1: Get or create the FlashCardsContainer
      const containerRef = doc(db, 'FlashCardsContainer', title)

      // Step 2: Add flashcards directly under the title
      for (const flashcard of flashcards) {
        const flashcardRef = doc(collection(containerRef, 'flashcards'))
        console.log('Saving flashcard:', flashcard)

        await setDoc(flashcardRef, {
          front: flashcard.front,
          back: flashcard.back,
          createdAt: new Date()
        })

        console.log('Flashcard saved:', flashcard)
      }

      console.log('Flashcards saved successfully!')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      throw error
    }
  }

  const handleTextSubmit = async () => {
    console.log('Generate Flashcards button clicked!')
    console.log('Text:', text)

    try {
      const response = await fetch('/ankit_work/generate_flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userText: text })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Generated Flashcards:', data.flashcards)
        setFlashcards(data.flashcards) // Update state with the generated flashcards
        setTitle(data.title) // Update state with the generated flashcards
      } else {
        console.error('Error generating flashcards:', response.statusText)
      }
    } catch (error) {
      console.error('Error generating flashcards:', error)
    }
  }

  const [error, setError] = useState('')

  const handleFileChange = event => {
    setFile(event.target.files[0])
    setError('') // Clear any previous errors
  }

  const handleFileSubmit = async () => {}

  const handleSave = async () => {
    if (!title || flashcards.length === 0) {
      console.log('Title and flashcards are required.')
      return
    }

    try {
      await saveFlashcardsToFirebase(title, flashcards)
    } catch (error) {
      console.error('Error during saving:', error)
    }
  }

  const handleRegenerate = () => {
    console.log('Regenerate button clicked!')
    setText('') // Clear the text input
    setFlashcards([]) // Clear the flashcards
    setTitle('') // Clear the title
  }

  const handleEnhance = async () => {
    console.log('Enhance button clicked!')

    try {
      const enhancedText = `Enhance it. ${text}`
      const response = await fetch('/ankit_work/generate_flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userText: enhancedText })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Enhanced Flashcards:', data.flashcards)
        setFlashcards(data.flashcards) // Update state with the enhanced flashcards
        setTitle(data.title) // Update state with the enhanced title
      } else {
        console.error('Error enhancing flashcards:', response.statusText)
      }
    } catch (error) {
      console.error('Error enhancing flashcards:', error)
    }
  }

  const handleViewFlashcards = () => {
    router.push('/ankit_work/view_flashcards')
  }

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', flexDirection: 'row', gap: 4, mt: 4 }}
      >
        <Box flex={1}>
          <Typography
            variant='h5'
            gutterBottom
            color='#003893'
            textAlign='center'
            fontWeight='600'
          >
            LET&apos;S GENERATE FLASHCARDS!
          </Typography>
          <Paper
            elevation={3}
            sx={{ p: 4, gap: 2, display: 'flex', flexDirection: 'column' }}
          >
            {/* Text Input Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography fontSize='18px' color='#003893'>
                Enter Text
              </Typography>
              <TextField
                label='Type something...'
                multiline
                rows={4}
                fullWidth
                value={text}
                onChange={e => setText(e.target.value)}
                variant='outlined'
                color='secondary'
              />
              <Button
                variant='contained'
                endIcon={<SendIcon />}
                color='primary'
                sx={{ backgroundColor: '#003893' }}
                onClick={handleTextSubmit}
              >
                Generate Flashcards
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* File Upload Section */}
            <Typography fontSize='18px' color='#CC0000'>
              Upload Files
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Input
                accept='application/pdf,image/*'
                id='contained-button-file'
                type='file'
                onChange={handleFileChange}
                sx={{ display: 'none' }}
              />
              <label htmlFor='contained-button-file'>
                <Button
                  variant='contained'
                  component='span'
                  startIcon={<UploadFileIcon sx={{ color: '#ffffff' }} />}
                  sx={{
                    backgroundColor: '#CC0000',
                    '&:hover': { backgroundColor: '#B20000' }
                  }}
                >
                  Choose File
                </Button>
              </label>
              <Button
                variant='contained'
                endIcon={<SendIcon />}
                color='primary'
                onClick={handleFileSubmit}
                fullWidth
                sx={{ backgroundColor: '#003893' }}
              >
                Submit File
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Flashcards Output Section */}
        <Box flex={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant='h5'
              gutterBottom
              color='#003893'
              fontWeight='600'
            >
              YOUR OUTPUT
            </Typography>
            <IconButton
              color='primary'
              aria-label='view flashcards'
              onClick={handleViewFlashcards}
            >
              <VisibilityIcon />
            </IconButton>
          </Box>
          <Paper
            elevation={3}
            sx={{ p: 4, gap: 2, display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant='h6'>{title}</Typography>
            {flashcards.length > 0 ? (
              flashcards.map((card, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography>
                    <strong>Front:</strong> {card.front}
                  </Typography>
                  <Typography>
                    <strong>Back:</strong> {card.back}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No flashcards generated yet.</Typography>
            )}

            {/* New Buttons */}
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}
            >
              <Button
                variant='contained'
                color='primary'
                sx={{ backgroundColor: '#003893' }}
                onClick={handleSave}
              >
                Save the Cards
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleRegenerate}
              >
                Regenerate
              </Button>
              <Button
                variant='contained'
                sx={{ backgroundColor: '#FF8C00' }}
                onClick={handleEnhance}
              >
                Enhance
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

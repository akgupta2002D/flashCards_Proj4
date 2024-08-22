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
  Divider
} from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import SendIcon from '@mui/icons-material/Send'

export default function DocumentUploader () {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [flashcards, setFlashcards] = useState([]) // State to hold flashcards
  const [title, setTitle] = useState('')

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

  const handleFileSubmit = () => {
    if (file) {
      console.log('File name:', file.name)
      // Additional logic for file processing can be added here
    }
  }

  const handleSave = () => {
    console.log('Save the cards button clicked!')
    // Logic to save the flashcards
  }

  const handleRegenerate = () => {
    console.log('Regenerate button clicked!')
    handleTextSubmit() // Regenerate the flashcards using the current text input
  }

  const handleEnhance = () => {
    console.log('Enhance button clicked!')
    // Logic to enhance the flashcards, could involve modifying the current flashcards
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
                accept='*/*'
                id='contained-button-file'
                type='file'
                onChange={e => setFile(e.target.files[0])}
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
          <Typography
            variant='h5'
            gutterBottom
            color='#003893'
            textAlign='center'
            fontWeight='600'
          >
            YOUR OUTPUT
          </Typography>
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

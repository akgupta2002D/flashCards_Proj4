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
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

function DocumentUploader () {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)

  const handleTextSubmit = () => {
    console.log('Text:', text)
  }

  const handleFileSubmit = () => {
    if (file) {
      console.log('File name:', file.name)
    }
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ mt: 4 }}>
        <Typography
          variant='h5'
          gutterBottom
          color='#003893'
          textAlign={'center'}
          fontWeight={'600'}
        >
          LET&apos;S CREATE SOME FLASHCARDS!
        </Typography>
        <Paper
          elevation={3}
          sx={{ p: 4, gap: 2, display: 'flex', flexDirection: 'column' }}
        >
          {/* Text Input Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography fontSize={'18px'} color='#003893'>
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
              Submit Text
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* File Upload Section */}
          <Typography fontSize={'18px'} color='#CC0000'>
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
      </Container>
    </>
  )
}

export default DocumentUploader

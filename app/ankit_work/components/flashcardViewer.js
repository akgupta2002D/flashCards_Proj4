'use client'
import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  CssBaseline,
  Toolbar,
  AppBar
} from '@mui/material'
import { db } from '../utils/firebase' // Adjust the import to match your project structure
import { collection, getDocs } from 'firebase/firestore'

const drawerWidth = 240

function FlashcardViewer () {
  const [flashcardsData, setFlashcardsData] = useState([])
  const [selectedTitle, setSelectedTitle] = useState('')
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

  useEffect(() => {
    const fetchFlashcards = async () => {
      const flashcardsCollectionRef = collection(db, 'FlashCardsContainer')
      const querySnapshot = await getDocs(flashcardsCollectionRef)

      const fetchedData = []
      querySnapshot.forEach(async doc => {
        const title = doc.id
        const flashcardsRef = collection(
          db,
          `FlashCardsContainer/${title}/flashcards`
        )
        const flashcardsSnapshot = await getDocs(flashcardsRef)
        const flashcards = flashcardsSnapshot.docs.map(flashcardDoc => ({
          id: flashcardDoc.id,
          ...flashcardDoc.data()
        }))

        fetchedData.push({ title, flashcards })
        setFlashcardsData(fetchedData)

        if (!selectedTitle && fetchedData.length > 0) {
          setSelectedTitle(fetchedData[0].title)
        }
      })
    }

    fetchFlashcards()
  }, [selectedTitle])

  const handleTitleClick = title => {
    setSelectedTitle(title)
    setCurrentFlashcardIndex(0)
  }

  const handleNext = () => {
    setCurrentFlashcardIndex(prevIndex =>
      prevIndex <
      flashcardsData.find(fc => fc.title === selectedTitle).flashcards.length -
        1
        ? prevIndex + 1
        : prevIndex
    )
  }

  const handlePrevious = () => {
    setCurrentFlashcardIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    )
  }

  const selectedFlashcards = flashcardsData.find(
    fc => fc.title === selectedTitle
  )?.flashcards

  const currentFlashcard = selectedFlashcards?.[currentFlashcardIndex]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#003893'
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Flashcard Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {flashcardsData.map((flashcardsCollection, index) => (
              <ListItem
                button
                key={index}
                selected={flashcardsCollection.title === selectedTitle}
                onClick={() => handleTitleClick(flashcardsCollection.title)}
              >
                <ListItemText primary={flashcardsCollection.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography
          variant='h6'
          color='#003893'
          textAlign={'center'}
          fontWeight={'600'}
        >
          {selectedTitle} - Flashcard Viewer
        </Typography>
        {currentFlashcard ? (
          <Box sx={{ mt: 4 }}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6' color='textPrimary'>
                  {currentFlashcard.front}
                </Typography>
              </CardContent>
            </Card>
            <Grid
              container
              spacing={2}
              sx={{ mt: 2, justifyContent: 'center' }}
            >
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handlePrevious}
                  disabled={currentFlashcardIndex === 0}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  disabled={
                    currentFlashcardIndex === selectedFlashcards.length - 1
                  }
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography variant='body1' color='textSecondary'>
            No flashcards available for this title.
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default FlashcardViewer

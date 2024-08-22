import React from 'react'
import { Card, CardContent, Typography, Box, Grid } from '@mui/material'

function FlashcardViewer ({ flashcards }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant='h6'
        color='#003893'
        textAlign={'center'}
        fontWeight={'600'}
      >
        Generated Flashcards
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6' color='textPrimary'>
                  {flashcard.title}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {flashcard.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FlashcardViewer

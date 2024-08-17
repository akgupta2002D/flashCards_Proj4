import React from 'react'
import { Box, Button, Typography } from "@mui/material";
import { UserButton } from '@clerk/nextjs';
import TemporaryDrawer from './TemporaryDrawer';


export const Navbar = () => {
  return (
    <Box  display={'flex'} gap={'80%'} padding={'12px 16px'} >
        <Box display={'flex'} ><TemporaryDrawer />
         <Typography variant='h5' color={'#4255FF'}>Flashcards AI</Typography></Box>
         <UserButton />
    </Box>
  )
}

'use client'

// This is the /generate route. 

import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import { Typography, Box, TextField, Button, Drawer } from "@mui/material";
import { Navbar } from "../baazil_work/components/Navbar";
import { useState } from "react"; 


export default function GeneratePage() {
    
    const [text, setText] = useState('')
  return (
    <>
    <Box bgcolor={'#DBDFFF'}>
      <SignedIn >
 
        <Box height={'100vh'} width={'100vw'} >
            
            <Navbar />
            <Box display={'flex'} justifyContent={'center'} marginTop={'2%'}/*marginLeft={'33%'} marginTop={'3%'}*/>
                <Typography variant="h4">Enter text to generate flashcards!</Typography>
            </Box>
            <Box display={'flex'} gap={'5%'} marginLeft={'35%'} marginTop={'5%'}>
                <TextField placeholder="Enter Text"  value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        id="outlined-basic" 
                        variant="outlined" />
                <Button variant="contained">Send</Button>
                <Button variant="contained">Save</Button>
            </Box>
        </Box> 
      </SignedIn>
      </Box>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

'use client'

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignIn
} from '@clerk/nextjs'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { Navbar } from './baazil_work/components/Navbar'
import DocumentUploader from './ankit_work/components/DocumentUploader' // Adjust the path as necessary
// For each route, create a folder inside app with the name you want your route to be, and then a file called 'page.js' inside that folder.

export default function Home () {
  return (
    /* This is the home route. SignedIn component displays the content shown when the user is signed in. Same goes for SignedOut */
    <>
      <SignedIn>
        <Navbar />
        <DocumentUploader />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

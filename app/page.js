import { SignInButton, SignedIn, SignedOut, UserButton, RedirectToSignIn } from "@clerk/nextjs";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

// For each route, create a folder inside app with the name you want your route to be, and then a file called 'page.js' inside that folder.


export default function Home() {
  return (
   /* This is the home route. SignedIn component displays the content shown when the user is signed in. Same goes for SignedOut */
   <>
    <SignedIn> 
      <Typography variant="h3"> Welcome to Flashcard SaaS</Typography>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
   
   </>
  );
}

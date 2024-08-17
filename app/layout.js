import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  </ClerkProvider>
  );
}

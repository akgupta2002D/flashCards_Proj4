# Project Overview
Flashcard SaaS is a web application designed to help students and professionals efficiently create, manage, and study flashcards. Built using Next.js, React, Firebase, and Stripe, this project integrates OpenAI for AI-powered flashcard generation and provides a seamless subscription experience via Stripe.

## Features
1. Flashcard Generation: Users can generate flashcards from text input using OpenAI's API, creating a set of 10 flashcards with concise front and back content.
2. User Authentication: Secure user authentication and account management powered by Clerk.
3. Subscription Management: Monetize the service through a Pro subscription plan, with payment processing handled by Stripe.
4. Flashcard Management: Users can save generated flashcards to their account and access them later for study and review.
5. Responsive Design: The application is mobile-friendly and optimized for various screen sizes.
6. We may add a RAG database to customize the flashcard creation.

## Tech Stack
Frontend: Next.js, React, Material-UI
Backend: Firebase for database and storage, Stripe for payment processing
AI Integration: OpenAI API for generating flashcards from text
Authentication: Clerk for user sign-up and sign-in processes



# Default Readme File:
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

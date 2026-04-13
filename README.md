# Mobile E-commerce Web App

A full-stack mobile-first e-commerce web application built with Next.js App Router, NextAuth, Prisma, MongoDB, Material UI, and Framer Motion.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB and OAuth credentials.

4. Push Prisma schema to the database:

```bash
npm run db:push
```

5. Seed the database:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

## Command to create the app (documentation reference)

```bash
npm create-next-app@latest
```

## Important dependencies

- next
- react
- next-auth
- @prisma/client
- prisma
- bcrypt
- @mui/material
- @mui/icons-material
- framer-motion

## Project structure

- `app/` - Next.js app routes and pages
- `app/api/` - Backend route handlers
- `components/` - Shared UI components
- `context/` - Global state and theme context
- `lib/` - Database and authentication helpers
- `prisma/` - Prisma schema and seed data

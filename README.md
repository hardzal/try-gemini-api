# TypeScript Node.js Starter

A minimal starter template for Node.js projects using TypeScript, ESLint, and Prettier.

## Features

- TypeScript configuration
- ESLint for code linting
- Prettier for code formatting
- Nodemon for development
- Basic project structure
- Environment variables support with dotenv
- Google AI integration ready (@google/generative-ai)

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/typescript-node-starter.git
   cd typescript-node-starter
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Available Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run start`: Run the compiled JavaScript
- `npm run dev`: Run development server with hot-reload
- `npm run lint`: Run ESLint
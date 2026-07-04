# Tribesman Fashion Design

A modern, full-stack e-commerce framework for Tribesman Fashion, featuring an Express & SQLite backend intertwined with a high-performance React (Vite) frontend.

## Features
- Complete custom Backend API securely utilizing JWT Auth
- Fast embedded SQLite Database 
- Built-in localized Image Uploader
- High performance Single Page Application frontend utilizing React and React-Router
- Beautiful curated styles utilizing native CSS variables

## Prerequisites

- Node.js (v20+ recommended)
- npm or yarn

## Getting Started

### 1. Backend Setup

From the root project directory, run the initialization to install the backend dependencies:

```bash
npm install
```

Copy the `.env.example` into a local `.env` and fill the variables:
```bash
cp .env.example .env
```

Start the backend API and database local instance:
```bash
npm run dev
```
> The API Server will start listening on `http://localhost:3000`

### 2. Frontend Setup

In a new terminal, navigate into the React application directory:
```bash
cd frontend
npm install
```

Start the frontend Vite development server:
```bash
npm run dev
```
> The React SPA will instantly launch, pointing to `http://localhost:5173`

*(Note: Ensure your `.env` contains standard API tokens so your Auth panel correctly manages administrative features from port 3000).*

---
*Created meticulously with care. Elegance redefined.*
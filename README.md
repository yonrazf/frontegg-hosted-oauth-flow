![React Hosted Login Banner](/public/assets/react-banner.png)

# React Hosted Login Sample

This sample demonstrates how to add authentication to a React application using Frontegg's Hosted Login solution.

## Requirements

- [Node.js](https://nodejs.org)
- npm (comes with Node.js)
- A Frontegg account. [Sign up for free](https://portal.frontegg.com/signup).

## Setup

### 1. Configure Frontegg Application

1. Go to [Frontegg Portal](https://portal.frontegg.com/)
2. Configure your application settings
3. Get your Client ID and API key from the Frontegg Portal

### 2. Configuration

This project comes with pre-configured test credentials in `/src/config/sanboxContextOptions.js`. These credentials are set up for demonstration purposes, allowing you to test the authentication flow immediately.

When deploying to production, make sure to replace these test credentials with your own Frontegg application credentials.

### 3. Install Dependencies

Run the following commands:

```bash
npm install
```

### 4. Run the Application

To start the application, run:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## What is Happening?

This application demonstrates:
- Implementing Frontegg's Hosted Login
- Managing user authentication state
- Accessing user profile information

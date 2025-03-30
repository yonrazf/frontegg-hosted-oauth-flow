![React Hosted Login Banner](/public/assets/react-banner.png)

# React hosted login sample

This sample showcases how to seamlessly add authentication and user management to your React app using Frontegg’s hosted login method.

## This app showcases -

- Redirect users to Frontegg’s hosted login
- Enable a fully integrated self-service portal
- Manage and track user authentication state
- Access and display user profile details
- Handle account state and data with ease
- Implement seamless account switching functionality

## Requirements - 

- [Node.js](https://nodejs.org)
- npm (comes with Node.js)
- You'll need a Frontegg account. [Sign up for free](https://frontegg-prod.us.frontegg.com/oauth/account/sign-up).
This project includes preconfigured sandbox credentials, but we recommend using your own Frontegg account if you have one.

## Setup -

If you don’t have a Frontegg account or prefer to use the sandbox credentials, feel free to skip to step **2**.

If you're using your own credentials, follow the guidelines below.

### 1. Frontegg application -

1. Go to [Frontegg Portal](https://portal.frontegg.com/)
2. Get your application ID from [ENVIRONMENT] → Applications
3. Get your Frontegg domain from the Frontegg Portal → [ENVIRONMENT] → Keys & domains
4. This sample runs on `http://localhost:3000`. If your application uses a different port, make sure to add `http://localhost:3000` under → [ENVIRONMENT] → Authentication → Login method → Redirect URLs.
5. This sample runs on `http://localhost:3000`. You may need to add `http://localhost:3000` under → [ENVIRONMENT] → Keys & domains → Allowed origins.

### 2. Install dependencies -

Run the following commands:

```bash
npm install
```

### 3. Run the application -

To start the application, run:

```bash
npm start
```

That’s it — you're all set!

The app will be available at [http://localhost:3000](http://localhost:3000).

### Experience Frontegg in action!
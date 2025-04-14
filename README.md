![React Hosted Login Banner](/public/assets/react-banner.png)

# React hosted OAuth login sample

This sample showcases how to seamlessly add authentication via OAuth to your React app using Frontegg’s hosted login method - please refer to [our integration guide](https://developers.frontegg.com/guides/management/frontegg-idp/native-hosted) for details on the full implementation

## This app showcases

- Redirect users to Frontegg’s hosted login
- Manage and track user authentication state
- Use either __PKCE__ or __Auth Code__ flows
- Access and display user profile details
- Handle account state and data with ease

## What you’ll need

- [Node.js](https://nodejs.org)
- npm (comes with Node.js)

You’ll also need a Frontegg account. [Sign up for free](https://frontegg-prod.us.frontegg.com/oauth/account/sign-up) to get started.

Don’t have an account yet? No worries. This project includes **sandbox credentials** so you can test it right away!

## Get started in 3 simple steps

If you don’t have a Frontegg account or prefer to use the sandbox credentials, feel free to skip to step **2**.

If you're using your own credentials, follow the guidelines below.

### 1. Configure your Frontegg application (if using your own account) -

1. Go to [Frontegg Portal](https://portal.frontegg.com/)
2. Get your application ID from [ENVIRONMENT] → Applications
3. Get your Frontegg domain from the Frontegg Portal → [ENVIRONMENT] → Keys & domains
4. This sample runs on `http://localhost:3000`. If your application uses a different port, make sure to add `http://localhost:3000` under → [ENVIRONMENT] → Authentication → Login method → Redirect URLs
5. This sample runs on `http://localhost:3000`. You may need to add `http://localhost:3000` under → [ENVIRONMENT] → Keys & domains → Allowed origins
6. Update your application's credentials under `sanboxContextOptions`

### 2. Clone the repository -

Run the following command:

```bash
npm clone <repo>
```

### 3. Install dependencies -

Run the following command:

```bash
npm install
```

### 4. Run the application -

To start the application, run:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

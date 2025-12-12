# Skyline IT Consulting - Digital Company Website

A modern, responsive website for Skyline IT Consulting built with Vite, React, TypeScript, and shadcn/ui.

## Features

- ⚡️ Vite for fast development and building
- ⚛️ React 18 with TypeScript
- 🎨 shadcn/ui components with Tailwind CSS
- 🌐 React Router for navigation
- ☁️ Ready for Netlify deployment with serverless functions
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. In Netlify:
   - Go to "Add new site" > "Import an existing project"
   - Connect your repository
   - Build settings will be automatically detected from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. For serverless functions, they are located in `netlify/functions/` directory (automatically deployed). The API endpoint `/api/test` will be redirected to the function via `netlify.toml`.

4. Click "Deploy site"

## Project Structure

```
├── netlify/
│   └── functions/
│       └── test.ts              # Serverless function example
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── ApiTestButton.tsx   # API test button component
│   │   └── Layout.tsx           # Main layout component
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── pages/
│   │   └── Home.tsx            # Home page
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── netlify.toml                # Netlify configuration
└── package.json
```

## API Testing

The website includes an API test button that calls `/api/test`. This endpoint is handled by a Netlify serverless function located at `netlify/functions/test.ts`.

## JavaScript Code Execution Methods

This project implements **two no-setup methods** to execute JavaScript code:

- **Extension Method:** Browser extension (one-time install, runs locally in browser)
- **Cloud Method:** Cloud-based execution (zero setup, works everywhere)

### ✅ Recommended Solution

**See [NEW_SOLUTION.md](./NEW_SOLUTION.md) for the latest no-setup solution!**

The new solution provides:
- ✅ **No setup required** on user's PC (except one-time extension install)
- ✅ Works on **all platforms** (Windows, Mac, Linux)
- ✅ **Cloud execution** works immediately
- ✅ **Extension** runs code locally in browser

### Legacy Methods

The previous 4 methods (protocol handler, native messaging, local server, PowerShell) required setup or had platform limitations. See [METHODS_SETUP.md](./METHODS_SETUP.md) for reference (not recommended for production).

## Technologies Used

- **Vite** - Build tool and dev server
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality component library
- **React Router** - Client-side routing

## License

MIT


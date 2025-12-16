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
│   │   ├── FormWithPDF.tsx     # Form with PDF generation component
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

## Features

### Form with PDF Generation

The website includes a form submission feature that allows users to:
- Fill out a form with name, email, phone, and message
- Download the form data as a PDF file
- Optionally download a ZIP package containing:
  - The PDF file
  - Python script to process the form data
  - JavaScript/Node.js script to process the form data
  - README with instructions

The FormWithPDF component uses:
- **jsPDF** - PDF generation library
- **JSZip** - ZIP file creation library

## Technologies Used

- **Vite** - Build tool and dev server
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality component library
- **React Router** - Client-side routing

## License

MIT


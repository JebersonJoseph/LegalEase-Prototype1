# LegalEase - AI-Powered Legal Document Assistant

LegalEase is a comprehensive legal document analysis and generation platform powered by AI. It helps users understand complex legal documents, generate legal documents, and test their legal knowledge.

## Features

- **Document Analyzer**: Translate dense legal text into plain English
- **Document Scanner**: Use your camera to scan physical documents and get AI-powered insights
- **Custom Document Generator**: Generate tailored legal documents like NDAs or lease agreements
- **Legal Knowledge Testing**: Interactive, AI-generated quizzes to test your legal knowledge
- **Document Comparator**: Spot changes between two versions of a document
- **Legal Learning Center**: Curated articles on various legal topics

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Google AI API key
- Firebase project (optional, for authentication)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Google AI API Configuration (Required)
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Firebase Configuration (Optional - already configured in firebase.ts)
# FIREBASE_PROJECT_ID=your_firebase_project_id
# FIREBASE_API_KEY=your_firebase_api_key
# FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
# FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
# FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
# FIREBASE_APP_ID=your_firebase_app_id
```

### 3. Get Google AI API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new project or select an existing one
3. Generate an API key
4. Add the API key to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Run AI Development Server (Optional)

For AI flow development and testing:

```bash
npm run genkit:dev
```

## Available Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit AI development server with watch mode

## Project Structure

```
src/
├── ai/                    # AI flows and configuration
│   ├── flows/            # Individual AI flow implementations
│   ├── genkit.ts         # Genkit AI configuration
│   └── dev.ts           # AI development server
├── app/                  # Next.js app router pages
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── common/          # Common components
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions and configurations
```

## Troubleshooting

### Common Issues

1. **AI features not working**: Ensure you have set the `GOOGLE_AI_API_KEY` environment variable
2. **TypeScript errors**: Run `npm run typecheck` to identify and fix type issues
3. **Build errors**: Check that all dependencies are installed with `npm install`

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Ensure all environment variables are properly set
3. Verify that your Google AI API key is valid and has the necessary permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

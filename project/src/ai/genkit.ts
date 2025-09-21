import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';

enableFirebaseTelemetry();

// Validate required environment variables
const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.warn('Warning: GOOGLE_AI_API_KEY environment variable is not set. AI features may not work properly.');
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: apiKey || 'your_google_ai_api_key_here',
  })],
  model: 'googleai/gemini-2.5-flash',
});

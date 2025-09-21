import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

import '@/ai/flows/simplify-legal-jargon.ts';
import '@/ai/flows/generate-legal-mcq.ts';
import '@/ai/flows/generate-article.ts';
import '@/ai/flows/chat-with-document.ts';
import '@/ai/flows/generate-legal-document.ts';
import '@/ai/flows/get-text-insights.ts';
import '@/ai/flows/edit-document.ts';

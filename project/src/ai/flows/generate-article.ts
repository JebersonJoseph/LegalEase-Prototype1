'use server';

/**
 * @fileOverview Generates a legal article on a given topic.
 *
 * - generateArticle - A function that generates a legal article.
 * - GenerateArticleInput - The input type for the generateArticle function.
 * - GenerateArticleOutput - The return type for the generateArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleInputSchema = z.object({
  topic: z.string().describe('The legal topic for the article.'),
});
export type GenerateArticleInput = z.infer<typeof GenerateArticleInputSchema>;

const GenerateArticleOutputSchema = z.object({
  title: z.string().describe('The title of the article.'),
  excerpt: z
    .string()
    .describe('A short excerpt or summary of the article, around 20-30 words.'),
  content: z
    .string()
    .describe(
      'The full content of the article, formatted as simple HTML using h2, p, ul, and li tags.'
    ),
  imageHint: z
    .string()
    .describe(
      'One or two keywords for generating a relevant stock photo for the article.'
    ),
});
export type GenerateArticleOutput = z.infer<typeof GenerateArticleOutputSchema>;

export async function generateArticle(
  input: GenerateArticleInput
): Promise<GenerateArticleOutput> {
  return generateArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticlePrompt',
  input: {schema: GenerateArticleInputSchema},
  output: {schema: GenerateArticleOutputSchema},
  prompt: `You are a legal expert and writer. Generate a well-structured and informative article on the legal topic of {{{topic}}}.

The article should be easy for a layperson to understand.
The content should be formatted in simple HTML, using only <h2>, <p>, <ul>, and <li> tags.
The excerpt should be a concise summary of about 20-30 words.
The image hint should be one or two keywords that are relevant for finding a stock photo for the article.`,
});

const generateArticleFlow = ai.defineFlow(
  {
    name: 'generateArticleFlow',
    inputSchema: GenerateArticleInputSchema,
    outputSchema: GenerateArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

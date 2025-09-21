'use server';

/**
 * @fileOverview An AI agent that simplifies complex legal jargon.
 *
 * - simplifyLegalJargon - A function that simplifies legal jargon in a document.
 * - SimplifyLegalJargonInput - The input type for the simplifyLegalJargon function.
 * - SimplifyLegalJargonOutput - The return type for the simplifyLegalJargon function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyLegalJargonInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document to simplify.'),
});
export type SimplifyLegalJargonInput = z.infer<typeof SimplifyLegalJargonInputSchema>;

const SimplifiedExplanationSchema = z.object({
  term: z.string().describe('The legal term that was simplified.'),
  simplifiedExplanation: z.string().describe('The simplified explanation of the legal term.'),
  start: z.number().describe('The starting index of the term in the document.'),
  end: z.number().describe('The ending index of the term in the document.'),
});

const SimplifyLegalJargonOutputSchema = z.array(SimplifiedExplanationSchema);
export type SimplifyLegalJargonOutput = z.infer<typeof SimplifyLegalJargonOutputSchema>;

export async function simplifyLegalJargon(input: SimplifyLegalJargonInput): Promise<SimplifyLegalJargonOutput> {
  return simplifyLegalJargonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyLegalJargonPrompt',
  input: {schema: SimplifyLegalJargonInputSchema},
  output: {schema: SimplifyLegalJargonOutputSchema},
  prompt: `You are a legal expert skilled at simplifying complex legal jargon into plain language.

  Analyze the provided legal document and identify key legal terms and clauses that would be difficult for a layperson to understand. Provide simplified explanations for each of these terms.

  The output should be an array of JSON objects. Each object should contain the original legal term, a simplified explanation, and the start and end index of the term in the document.

  Document:
  {{documentText}}`,
});

const simplifyLegalJargonFlow = ai.defineFlow(
  {
    name: 'simplifyLegalJargonFlow',
    inputSchema: SimplifyLegalJargonInputSchema,
    outputSchema: SimplifyLegalJargonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

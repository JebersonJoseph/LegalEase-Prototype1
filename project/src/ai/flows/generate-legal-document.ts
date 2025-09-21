'use server';

/**
 * @fileOverview An AI agent that generates custom legal documents.
 *
 * - generateLegalDocument - A function that generates a legal document based on user input.
 * - GenerateLegalDocumentInput - The input type for the generateLegalDocument function.
 * - GenerateLegalDocumentOutput - The return type for the generateLegalDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLegalDocumentInputSchema = z.object({
  documentType: z.string().describe('The type of legal document to generate (e.g., NDA, Lease Agreement).'),
  parties: z.array(z.string()).describe('The names of the parties involved in the document.'),
  keyTerms: z.string().describe('A summary of the key terms, clauses, and conditions to be included in the document.'),
});
export type GenerateLegalDocumentInput = z.infer<typeof GenerateLegalDocumentInputSchema>;

const GenerateLegalDocumentOutputSchema = z.object({
  title: z.string().describe('The title of the generated legal document.'),
  content: z.string().describe('The full content of the legal document, formatted as simple HTML using h2, h3, p, and ul/li tags.'),
});
export type GenerateLegalDocumentOutput = z.infer<typeof GenerateLegalDocumentOutputSchema>;

export async function generateLegalDocument(
  input: GenerateLegalDocumentInput
): Promise<GenerateLegalDocumentOutput> {
  return generateLegalDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLegalDocumentPrompt',
  input: {schema: GenerateLegalDocumentInputSchema},
  output: {schema: GenerateLegalDocumentOutputSchema},
  prompt: `You are an expert legal assistant. Generate a professional legal document based on the following specifications.

Document Type: {{{documentType}}}

Parties Involved:
{{#each parties}}
- {{{this}}}
{{/each}}

Key Terms & Conditions:
{{{keyTerms}}}

The generated document should be comprehensive, well-structured, and use standard legal language. Format the output in simple HTML using only <h2>, <h3>, <p>, <ul>, and <li> tags. Do not include any introductory text before the document itself. The title should be the official title of the legal document.`,
});

const generateLegalDocumentFlow = ai.defineFlow(
  {
    name: 'generateLegalDocumentFlow',
    inputSchema: GenerateLegalDocumentInputSchema,
    outputSchema: GenerateLegalDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

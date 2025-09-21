'use server';

/**
 * @fileOverview An AI agent that edits a document based on user instructions.
 *
 * - editDocument - A function that modifies a document based on a given instruction.
 * - EditDocumentInput - The input type for the editDocument function.
 * - EditDocumentOutput - The return type for the editDocument function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EditDocumentInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The current text content of the legal document.'),
  instruction: z
    .string()
    .describe('The user\'s instruction on how to edit the document.'),
});
export type EditDocumentInput = z.infer<typeof EditDocumentInputSchema>;

const EditDocumentOutputSchema = z.object({
  editedContent: z
    .string()
    .describe(
      'The full, updated content of the document after applying the instruction.'
    ),
});
export type EditDocumentOutput = z.infer<typeof EditDocumentOutputSchema>;

export async function editDocument(
  input: EditDocumentInput
): Promise<EditDocumentOutput> {
  return editDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'editDocumentPrompt',
  input: { schema: EditDocumentInputSchema },
  output: { schema: EditDocumentOutputSchema },
  prompt: `You are an AI legal assistant. Your task is to edit the provided document based on the user's instruction.

Carefully analyze the document and the instruction, then return the ENTIRE document with the requested changes applied. Do not add any extra commentary or explanations, only the modified document content.

DOCUMENT:
---
{{{documentContent}}}
---

INSTRUCTION: "{{{instruction}}}"

Apply the changes and provide the full edited document in the 'editedContent' field.
`,
});

const editDocumentFlow = ai.defineFlow(
  {
    name: 'editDocumentFlow',
    inputSchema: EditDocumentInputSchema,
    outputSchema: EditDocumentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

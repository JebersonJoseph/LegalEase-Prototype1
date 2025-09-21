'use server';

/**
 * @fileOverview An AI agent that answers questions about a document.
 *
 * - chatWithDocument - A function that answers questions about a document.
 * - ChatWithDocumentInput - The input type for the chatWithDocument function.
 * - ChatWithDocumentOutput - The return type for the chatWithDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithDocumentInputSchema = z.object({
  document: z
    .object({
      content: z.string().describe('The text content of the document, or a data URI for media.'),
      isText: z.boolean(),
    })
    .describe('The document to ask questions about.'),
  question: z.string().describe('The question to ask about the document.'),
});
export type ChatWithDocumentInput = z.infer<typeof ChatWithDocumentInputSchema>;

const ChatWithDocumentOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type ChatWithDocumentOutput = z.infer<
  typeof ChatWithDocumentOutputSchema
>;

export async function chatWithDocument(
  input: ChatWithDocumentInput
): Promise<ChatWithDocumentOutput> {
  return chatWithDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithDocumentPrompt',
  input: {schema: ChatWithDocumentInputSchema},
  output: {schema: ChatWithDocumentOutputSchema},
  prompt: `You are a helpful legal assistant. Analyze the following document and answer the user's question based on its content.

  If the document is an image or video, describe the contents and answer the question based on what you see.
  If the document is text, analyze the text to answer the question.

  Document:
  {{#if document.isText}}
  {{document.content}}
  {{else}}
  {{media url=document.content}}
  {{/if}}

  Question: {{{question}}}

  Provide a clear and concise answer.
  `,
});

const chatWithDocumentFlow = ai.defineFlow(
  {
    name: 'chatWithDocumentFlow',
    inputSchema: ChatWithDocumentInputSchema,
    outputSchema: ChatWithDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

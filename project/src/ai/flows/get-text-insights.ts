'use server';

/**
 * @fileOverview An AI agent that analyzes a document and provides insights.
 *
 * - getTextInsights - A function that returns a summary and key points from a document.
 * - GetTextInsightsInput - The input type for the getTextInsights function.
 * - GetTextInsightsOutput - The return type for the getTextInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetTextInsightsInputSchema = z.object({
  documentText: z.string().describe("The text of a document."),
});
export type GetTextInsightsInput = z.infer<typeof GetTextInsightsInputSchema>;

const GetTextInsightsOutputSchema = z.object({
  summary: z
    .string()
    .describe("A concise summary of the document's content and purpose."),
  keyPoints: z
    .array(z.string())
    .describe(
      "A list of the most important terms, clauses, or takeaways from the document."
    ),
});
export type GetTextInsightsOutput = z.infer<typeof GetTextInsightsOutputSchema>;

export async function getTextInsights(
  input: GetTextInsightsInput
): Promise<GetTextInsightsOutput> {
  return getTextInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: "getTextInsightsPrompt",
  input: { schema: GetTextInsightsInputSchema },
  output: { schema: GetTextInsightsOutputSchema },
  prompt: `You are an expert legal assistant. Analyze the following document.
  
  Based on the text, provide a clear summary of the document and extract the most important key points.
  
  Document Text:
  {{documentText}}
  
  Provide a concise summary and a bulleted list of key takeaways.
  `,
});

const getTextInsightsFlow = ai.defineFlow(
  {
    name: "getTextInsightsFlow",
    inputSchema: GetTextInsightsInputSchema,
    outputSchema: GetTextInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

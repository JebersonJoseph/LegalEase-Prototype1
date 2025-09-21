// src/ai/flows/generate-legal-mcq.ts
'use server';

/**
 * @fileOverview Generates multiple-choice questions (MCQs) on legal terms using AI.
 *
 * - generateLegalMCQ - A function that generates legal MCQs.
 * - GenerateLegalMCQInput - The input type for the generateLegalMCQ function.
 * - GenerateLegalMCQOutput - The return type for the generateLegalMCQ function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLegalMCQInputSchema = z.object({
  topic: z.string().describe('The legal topic for which to generate MCQs.'),
  numQuestions: z.number().describe('The number of MCQs to generate.'),
});

export type GenerateLegalMCQInput = z.infer<typeof GenerateLegalMCQInputSchema>;

const GenerateLegalMCQOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The MCQ question.'),
      options: z.array(z.string()).describe('The multiple-choice options.'),
      answer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('An array of multiple-choice questions and answers.'),
});

export type GenerateLegalMCQOutput = z.infer<typeof GenerateLegalMCQOutputSchema>;

export async function generateLegalMCQ(input: GenerateLegalMCQInput): Promise<GenerateLegalMCQOutput> {
  return generateLegalMCQFlow(input);
}

const generateLegalMCQPrompt = ai.definePrompt({
  name: 'generateLegalMCQPrompt',
  input: {schema: GenerateLegalMCQInputSchema},
  output: {schema: GenerateLegalMCQOutputSchema},
  prompt: `You are a legal expert. Generate {{numQuestions}} multiple-choice questions on the topic of {{{topic}}}.

  Each question must have exactly 4 distinct options.
  One of the options must be the single correct answer.
  Ensure the provided answer exactly matches one of the options.
  The output must be valid JSON that conforms to the specified schema. Do not include any text or markdown formatting before or after the JSON object.

  Example Format:
  {
    "questions": [
      {
        "question": "What is a tort?",
        "options": [
          "A civil wrong",
          "A criminal act",
          "A type of contract",
          "A government regulation"
        ],
        "answer": "A civil wrong"
      },
      {
        "question": "What is the burden of proof in a criminal trial?",
        "options": [
          "Beyond a reasonable doubt",
          "Preponderance of the evidence",
          "Clear and convincing evidence",
          "Probable cause"
        ],
        "answer": "Beyond a reasonable doubt"
      }
    ]
  }
`,
});

const generateLegalMCQFlow = ai.defineFlow(
  {
    name: 'generateLegalMCQFlow',
    inputSchema: GenerateLegalMCQInputSchema,
    outputSchema: GenerateLegalMCQOutputSchema,
  },
  async input => {
    const {output} = await generateLegalMCQPrompt(input);
    return output!;
  }
);

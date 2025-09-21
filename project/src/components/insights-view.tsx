
'use client';

import { GetTextInsightsOutput } from '@/ai/flows/get-text-insights';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface InsightsViewProps {
  insights: GetTextInsightsOutput | null;
  isLoading: boolean;
}

export default function InsightsView({ insights, isLoading }: InsightsViewProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Analyzing your document...</p>
        <p className="text-muted-foreground">
          The AI is reading and extracting insights from the image.
        </p>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-center p-4">
        <p>
          Capture an image of a document and click &quot;Get Insights&quot; to see the AI analysis here.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg mb-2">Summary</h3>
          <p className="text-muted-foreground">{insights.summary}</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Key Points</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {insights.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
}

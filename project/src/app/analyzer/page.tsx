"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getTextInsights } from "@/ai/flows/get-text-insights";
import InsightsView from "@/components/insights-view";
import { GetTextInsightsOutput } from "@/ai/flows/get-text-insights";

export default function AnalyzerPage() {
  const [documentText, setDocumentText] = useState("");
  const [insights, setInsights] = useState<GetTextInsightsOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!documentText) return;
    setIsLoading(true);
    try {
      const result = await getTextInsights({ documentText: documentText });
      setInsights(result);
    } catch (error) {
      console.error("Error analyzing document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-4">Document Analyzer</h1>
      <p className="text-muted-foreground mb-6">
        Paste your legal document into the text area below and click "Analyze"
        to get AI-powered insights.
      </p>
      <div className="space-y-4">
        <Textarea
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          placeholder="Paste your document here..."
          rows={15}
        />
        <Button onClick={handleAnalyze} disabled={isLoading || !documentText}>
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>
      <div className="mt-8">
        <InsightsView insights={insights} isLoading={isLoading} />
      </div>
    </div>
  );
}

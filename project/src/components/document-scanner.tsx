
'use client';

import { useState } from 'react';
import {
  getTextInsights,
  GetTextInsightsOutput,
} from '@/ai/flows/get-text-insights';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import CameraView from './camera-view';
import InsightsView from './insights-view';

export default function DocumentScanner() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [insights, setInsights] = useState<GetTextInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setInsights(null);
  };

  const handleGetInsights = async () => {
    if (!capturedImage) return;
    setIsLoading(true);
    setInsights(null);
    try {
      const result = await getTextInsights({ documentImage: capturedImage });
      setInsights(result);
    } catch (error) { 
      console.error('Error getting insights:', error);
      toast({
        title: 'AI Error',
        description: 'Failed to analyze the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-[80vh] flex flex-col">
          <CardHeader>
            <CardTitle>Camera</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <CameraView
              onCapture={handleCapture}
              onRetake={handleRetake}
              capturedImage={capturedImage}
            />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="h-[80vh] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>AI Insights</CardTitle>
            {capturedImage && (
              <Button onClick={handleGetInsights} disabled={isLoading} size="sm">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get Insights
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-grow">
            <InsightsView insights={insights} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

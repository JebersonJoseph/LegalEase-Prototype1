// src/app/articles/custom/_components/custom-article.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  generateArticle,
  GenerateArticleOutput,
} from '@/ai/flows/generate-article';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type CustomArticleProps = {
  topic: string;
};

export default function CustomArticle({ topic }: CustomArticleProps) {
  const [article, setArticle] = useState<GenerateArticleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const result = await generateArticle({ topic });
        setArticle(result);
      } catch (error) {
        console.error('Failed to generate article:', error);
        toast({
          title: 'AI Error',
          description: 'Failed to generate the article. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [topic, toast]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Generating your article on &quot;{topic}&quot;...</p>
        <p className="text-muted-foreground">The AI is researching and writing for you!</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
         <p className="text-muted-foreground">Could not generate an article on this topic.</p>
      </div>
    )
  }

  const imageUrl = `https://picsum.photos/seed/${topic.replace(/\s+/g, '-')}/800/400`;

  return (
    <article>
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={article.imageHint}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white text-center px-4">
            {article.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Card>
            <CardContent className="p-6">
                <p className="text-lg italic text-muted-foreground">{article.excerpt}</p>
            </CardContent>
        </Card>
        <div
          className="prose dark:prose-invert max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}

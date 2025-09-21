// src/app/articles/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getArticles } from '@/lib/articles';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ArticlesPage() {
  const articles = getArticles();
  const [customTopic, setCustomTopic] = useState('');
  const router = useRouter();

  const handleGenerateArticle = () => {
    if (!customTopic.trim()) return;
    router.push(`/articles/custom?topic=${encodeURIComponent(customTopic.trim())}`);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground">
          Legal Learning Center
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Expand your knowledge with our collection of articles on legal topics.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary-foreground flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            Generate a Custom Article
          </CardTitle>
          <CardDescription>
            Have a specific topic in mind? Let our AI write an article for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Enter any legal topic..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateArticle()}
            />
            <Button onClick={handleGenerateArticle} disabled={!customTopic.trim()}>
              Generate Article <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <Link href={`/articles/${article.slug}`} key={article.slug} className="group">
            <Card className="h-full overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  data-ai-hint={article.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="pt-2">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-semibold text-primary">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

// src/app/articles/custom/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CustomArticle from './_components/custom-article';

function CustomArticlePageContent() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');

  if (!topic) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Missing Topic</h1>
        <p className="mt-2 text-muted-foreground">
          Please provide a topic to generate an article.
        </p>
      </div>
    );
  }

  return <CustomArticle topic={topic} />;
}


export default function CustomArticlePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomArticlePageContent />
    </Suspense>
  )
}

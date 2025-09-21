import { getArticleBySlug, getArticles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

// Generate static pages for all articles at build time
export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={article.imageUrl}
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
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}

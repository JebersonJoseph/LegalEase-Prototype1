
'use client';

import BlankDocumentCard from '@/components/blank-document-card';
import TemplateCard from '@/components/template-card';
import { getTemplateList } from '@/lib/document-templates';

export default function CustomDocumentPage() {
  const templates = getTemplateList();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground">
          Custom Legal Document Editor
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose a template or start from scratch with our AI-powered editor.
        </p>
      </div>

      <BlankDocumentCard />

      <h2 className="text-2xl font-headline font-bold mb-4 text-center">
        Or start with a template
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

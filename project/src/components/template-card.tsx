
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronRight, FileText } from 'lucide-react';
import { LegalDocumentTemplate } from '@/lib/document-templates';

interface TemplateCardProps {
  template: LegalDocumentTemplate;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();

  const handleTemplateClick = () => {
    sessionStorage.setItem('editorTemplate', JSON.stringify(template));
    router.push('/custom-document/editor');
  };

  return (
    <Card
      className="flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleTemplateClick}
    >
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary-foreground flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          {template.title}
        </CardTitle>
        <CardDescription className="pt-2">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm font-semibold text-primary">
          Open Editor <ChevronRight className="ml-2 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}

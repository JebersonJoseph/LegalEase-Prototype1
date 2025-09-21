
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, FilePlus } from 'lucide-react';
import { getTemplate } from '@/lib/document-templates';

export default function BlankDocumentCard() {
  const router = useRouter();
  const [customTopic, setCustomTopic] = useState('');

  const handleCustomRedirect = () => {
    if (!customTopic.trim()) return;
    const blankTemplate = getTemplate('blank');
    if (blankTemplate) {
      blankTemplate.title = customTopic.trim();
      sessionStorage.setItem('editorTemplate', JSON.stringify(blankTemplate));
      router.push('/custom-document/editor');
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary-foreground flex items-center">
          <FilePlus className="mr-2 h-6 w-6" />
          Start a Blank Document
        </CardTitle>
        <CardDescription>
          Have a unique document in mind? Name your document and start writing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="e.g., Freelance Work Agreement..."
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomRedirect()}
          />
          <Button
            onClick={handleCustomRedirect}
            disabled={!customTopic.trim()}
          >
            Create Document <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

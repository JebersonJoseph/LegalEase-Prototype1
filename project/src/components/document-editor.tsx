
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  ArrowLeft,
  Copy,
  Download,
  Share2,
} from 'lucide-react';
import {
  editDocument,
} from '@/ai/flows/edit-document';
import { LegalDocumentTemplate } from '@/lib/document-templates';
import EditorPanel from './editor-panel';
import AiAssistant from './ai-assistant';
import DiffModal from './diff-modal';

type Message = {
  role: 'user' | 'bot' | 'system';
  content: string;
};

export default function DocumentEditor() {
  const [template, setTemplate] = useState<LegalDocumentTemplate | null>(null);
  const [documentContent, setDocumentContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [proposedContent, setProposedContent] = useState('');

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedTemplate = sessionStorage.getItem('editorTemplate');
    if (storedTemplate) {
      const parsedTemplate = JSON.parse(storedTemplate);
      setTemplate(parsedTemplate);
      setDocumentContent(parsedTemplate.content);
    } else {
      router.push('/custom-document');
    }
  }, [router]);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userInput },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const result = await editDocument({
        documentContent,
        instruction: userInput,
      });

      setOriginalContent(documentContent);
      setProposedContent(result.editedContent);
      setIsDiffModalOpen(true);

      setMessages((prev) => [
        ...prev,
        {
          role: 'system',
          content: 'AI has suggested changes. Please review and apply or discard them.',
        },
      ]);
    } catch (error) {
      console.error('Failed to edit document:', error);
      toast({
        title: 'AI Error',
        description: 'Failed to get edits from the AI. Please try again.',
        variant: 'destructive',
      });
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptChanges = () => {
    setDocumentContent(proposedContent);
    setIsDiffModalOpen(false);
    toast({ title: 'Success', description: 'AI changes have been applied.' });
  };

  const handleRejectChanges = () => {
    setIsDiffModalOpen(false);
    toast({
      title: 'Discarded',
      description: 'AI changes have been discarded.',
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent);
    toast({
      title: 'Copied!',
      description: 'The document content has been copied to your clipboard.',
    });
  };

  const handleDownload = () => {
    const blob = new Blob([documentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = template?.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'document';
    link.download = `${fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'Your document has been downloaded.' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: template?.title || 'Legal Document',
          text: documentContent,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
          title: 'Sharing Error',
          description: 'Could not share the document.',
          variant: 'destructive',
        });
      }
    } else {
      handleCopy();
      toast({
        title: 'Copied to Clipboard',
        description: 'Share API not available. Document copied instead.',
      });
    }
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <Button variant="outline" onClick={() => router.push('/custom-document')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>
        <h1 className="text-2xl font-headline font-bold text-center text-primary-foreground flex-1 min-w-[200px]">
          {template.title}
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleDownload} aria-label="Download document">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share document">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy document">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[80vh] flex flex-col">
            <CardHeader>
              <CardTitle>Document Editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <EditorPanel
                content={documentContent}
                onContentChange={setDocumentContent}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-[80vh] flex flex-col">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col space-y-4">
              <AiAssistant
                messages={messages}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <DiffModal
        isOpen={isDiffModalOpen}
        onClose={() => setIsDiffModalOpen(false)}
        originalContent={originalContent}
        proposedContent={proposedContent}
        onAccept={handleAcceptChanges}
        onReject={handleRejectChanges}
      />
    </div>
  );
}


'use client';

import { diffChars } from 'diff';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Check } from 'lucide-react';

interface DiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalContent: string;
  proposedContent: string;
  onAccept: () => void;
  onReject: () => void;
}

export default function DiffModal({
  isOpen,
  onClose,
  originalContent,
  proposedContent,
  onAccept,
  onReject,
}: DiffModalProps) {
  const diffResult = diffChars(originalContent, proposedContent);

  const renderDiff = () => {
    return (
      <pre className="text-sm whitespace-pre-wrap font-body overflow-auto rounded-md border p-4 bg-background">
        {diffResult.map((part, index) => {
          const className = cn({
            'bg-red-500/20 line-through': part.removed,
            'bg-green-500/20': part.added,
          });

          return (
            <span key={index} className={className}>
              {part.value}
            </span>
          );
        })}
      </pre>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Review AI Suggestions</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            {renderDiff()}
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={onReject}>
            <X className="mr-2 h-4 w-4" />
            Discard
          </Button>
          <Button onClick={onAccept}>
            <Check className="mr-2 h-4 w-4" />
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

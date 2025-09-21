
'use client';

import { Textarea } from '@/components/ui/textarea';

interface EditorPanelProps {
  content: string;
  onContentChange: (content: string) => void;
}

export default function EditorPanel({ content, onContentChange }: EditorPanelProps) {
  return (
    <Textarea
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      className="h-full resize-none bg-white text-black"
      placeholder="Start writing your document..."
    />
  );
}

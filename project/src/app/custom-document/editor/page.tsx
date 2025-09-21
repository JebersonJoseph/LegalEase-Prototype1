// src/app/custom-document/editor/page.tsx
'use client';
import { Suspense } from 'react';
import DocumentEditor from '@/components/document-editor';

function EditorPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-4">Loading Editor...</div>}>
      <DocumentEditor />
    </Suspense>
  )
}

export default EditorPage;

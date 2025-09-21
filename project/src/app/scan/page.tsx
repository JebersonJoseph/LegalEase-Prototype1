// src/app/scan/page.tsx
import DocumentScanner from '@/components/document-scanner';

export default function ScanPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground">
          Scan Document
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Use your camera to scan a legal document and get instant insights from our AI.
        </p>
      </div>
      <DocumentScanner />
    </div>
  );
}

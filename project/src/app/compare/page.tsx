import DiffViewer from "@/components/diff-viewer";

export default function ComparePage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground">
          Document Comparison Tool
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Paste two versions of a document to see the differences highlighted.
        </p>
      </div>
      <DiffViewer />
    </div>
  );
}

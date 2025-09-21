
'use client';

import { cn } from '@/lib/utils';
import { type Change } from 'diff';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DiffOutputProps {
  diffResult: Change[] | null;
}

export default function DiffOutput({ diffResult }: DiffOutputProps) {
  const renderDiff = () => {
    if (!diffResult) {
      return (
        <p className="text-muted-foreground">
          Click &quot;Compare Documents&quot; to see the differences.
        </p>
      );
    }

    return (
      <pre className="text-sm whitespace-pre-wrap font-body overflow-auto rounded-md border p-4">
        {diffResult.map((part, index) => {
          const className = cn({
            'bg-red-500/10 text-red-800 dark:text-red-300': part.removed,
            'bg-green-500/10 text-green-800 dark:text-green-300': part.added,
            'text-muted-foreground': !part.added && !part.removed,
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
    <Card>
      <CardHeader>
        <CardTitle>Comparison Result</CardTitle>
      </CardHeader>
      <CardContent>{renderDiff()}</CardContent>
    </Card>
  );
}


'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { diffLines, type Change } from 'diff';
import DiffInput from './diff-input';
import DiffOutput from './diff-output';

const sampleTextA = `Key Terms:
1. Confidentiality: The receiving party shall hold in strict confidence any proprietary information.
2. Term: This agreement is effective for a period of one (1) year.
3. Payment: Payment is due within 30 days of receipt of invoice.`;

const sampleTextB = `Key Terms and Conditions:
1. Confidentiality: The receiving party shall hold in strict confidence any and all proprietary information.
2. Term: This agreement is effective for a period of two (2) years from the effective date.
4. Governing Law: This agreement shall be governed by the laws of the State of Delaware.`;

export default function DiffViewer() {
  const [textA, setTextA] = useState(sampleTextA);
  const [textB, setTextB] = useState(sampleTextB);
  const [diffResult, setDiffResult] = useState<Change[] | null>(null);

  const handleCompare = () => {
    const result = diffLines(textA, textB);
    setDiffResult(result);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <DiffInput
          title="Document A"
          value={textA}
          onChange={setTextA}
          placeholder="Paste original document text here..."
        />
        <DiffInput
          title="Document B"
          value={textB}
          onChange={setTextB}
          placeholder="Paste revised document text here..."
        />
      </div>

      <div className="text-center">
        <Button onClick={handleCompare}>Compare Documents</Button>
      </div>

      <DiffOutput diffResult={diffResult} />
    </div>
  );
}

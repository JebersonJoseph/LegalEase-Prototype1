
'use client';

import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DiffInputProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}

export default function DiffInput({ title, value, onChange, placeholder, rows = 15 }: DiffInputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      </CardContent>
    </Card>
  );
}

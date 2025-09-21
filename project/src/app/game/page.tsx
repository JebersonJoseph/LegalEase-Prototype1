// src/app/game/page.tsx
'use client';
import { useState } from 'react';
import McqGame, { type LegalTopic } from '@/components/mcq-game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Gavel,
  Lightbulb,
  Banknote,
  Shield,
  Home,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const levels: LegalTopic[] = [
  {
    topic: 'Contract Law',
    description: 'The fundamentals of legally binding agreements.',
    color: 'bg-blue-500',
    icon: <FileText className="h-8 w-8" />,
  },
  {
    topic: 'Criminal Law',
    description: 'Understanding crimes and their punishments.',
    color: 'bg-red-500',
    icon: <Gavel className="h-8 w-8" />,
  },
  {
    topic: 'Intellectual Property',
    description: 'Protecting creations of the mind.',
    color: 'bg-yellow-500',
    icon: <Lightbulb className="h-8 w-8" />,
  },
  {
    topic: 'Corporate Law',
    description: 'The legal aspects of running a business.',
    color: 'bg-green-500',
    icon: <Banknote className="h-8 w-8" />,
  },
  {
    topic: 'Torts',
    description: 'Civil wrongs and liabilities.',
    color: 'bg-purple-500',
    icon: <Shield className="h-8 w-8" />,
  },
  {
    topic: 'Real Estate Law',
    description: 'The law governing land and property.',
    color: 'bg-orange-500',
    icon: <Home className="h-8 w-8" />,
  },
];

export default function GamePage() {
  const [selectedTopic, setSelectedTopic] = useState<LegalTopic | null>(null);
  const [customTopic, setCustomTopic] = useState('');

  const handleStartQuiz = (level: LegalTopic) => {
    setSelectedTopic(level);
  };

  const handleStartCustomQuiz = () => {
    if (!customTopic.trim()) return;
    const customLevel: LegalTopic = {
      topic: customTopic.trim(),
      description: `A custom quiz on "${customTopic.trim()}"`,
      color: 'bg-gray-500',
      icon: <Sparkles className="h-8 w-8" />,
    };
    setSelectedTopic(customLevel);
  };

  const handleGoBack = () => {
    setSelectedTopic(null);
    setCustomTopic('');
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground">
          Legal Knowledge Challenge
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Test your understanding of legal terms with our AI-powered quiz.
        </p>
      </div>

      {selectedTopic ? (
        <McqGame topic={selectedTopic} onBack={handleGoBack} />
      ) : (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary-foreground">Create Your Own Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  placeholder="Enter any legal topic..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartCustomQuiz()}
                />
                <Button onClick={handleStartCustomQuiz} disabled={!customTopic.trim()}>
                  Start Custom Quiz <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="relative">
            {/* Dotted line for the path */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1 border-l-2 border-dashed border-border"
              aria-hidden="true"
            ></div>
            <div className="space-y-8">
              {levels.map((level) => (
                <div
                  key={level.topic}
                  className="relative flex items-center group"
                >
                  <div
                    className={`z-10 w-20 h-20 rounded-full flex items-center justify-center text-white ${level.color} shadow-lg`}
                  >
                    {level.icon}
                  </div>
                  <Card className="flex-1 ml-4 p-4 transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-headline font-bold text-primary-foreground">
                          {level.topic}
                        </h3>
                        <p className="text-muted-foreground">
                          {level.description}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleStartQuiz(level)}
                        aria-label={`Start quiz on ${level.topic}`}
                      >
                        Start <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

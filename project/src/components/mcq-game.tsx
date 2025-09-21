'use client';

import { useState } from 'react';
import {
  generateLegalMCQ,
  GenerateLegalMCQOutput,
} from '@/ai/flows/generate-legal-mcq';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, Trophy, ArrowLeft } from 'lucide-react';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import React from 'react';

type Question = GenerateLegalMCQOutput['questions'][0];
export type LegalTopic = {
  topic: string;
  description: string;
  color: string;
  icon: React.ReactNode;
};

type McqGameProps = {
  topic: LegalTopic;
  onBack: () => void;
};

export default function McqGame({ topic, onBack }: McqGameProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const { toast } = useToast();
  const numQuestions = 5;

  React.useEffect(() => {
    const generateQuestions = async () => {
      setIsLoading(true);
      try {
        const result = await generateLegalMCQ({ topic: topic.topic, numQuestions });
        if (result.questions && result.questions.length > 0) {
          setQuestions(result.questions);
          resetGameState();
        } else {
          toast({ title: 'Error', description: 'Could not generate questions for this topic.', variant: 'destructive' });
          onBack();
        }
      } catch (error) {
        console.error('Failed to generate MCQ:', error);
        toast({ title: 'AI Error', description: 'Failed to generate quiz questions. Please try again.', variant: 'destructive' });
        onBack();
      } finally {
        setIsLoading(false);
      }
    };

    generateQuestions();
  }, [topic, onBack, toast]);

  const resetGameState = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg shadow-sm">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Generating your quiz on {topic.topic}...</p>
        <p className="text-muted-foreground">The AI is crafting some tricky questions for you!</p>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
          <p className="text-2xl font-bold">You scored {score} out of {questions.length}</p>
          <p className="text-4xl font-bold text-primary">{percentage}%</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Levels
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return null;
  }
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
        <p className="pt-2 text-lg font-semibold">{currentQuestion.question}</p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={isAnswered}
        >
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = option === selectedAnswer;
            return (
              <div key={index} className={cn(
                "flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-all",
                isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
              )}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
                {isAnswered && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex-col items-stretch space-y-4">
        {isAnswered ? (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
          </Button>
        ) : (
          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="w-full">
            Submit Answer
          </Button>
        )}
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Quit to Levels
        </Button>
      </CardFooter>
    </Card>
  );
}

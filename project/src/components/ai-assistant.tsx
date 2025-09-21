
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Wand2, Bot, User } from 'lucide-react';

type Message = {
  role: 'user' | 'bot' | 'system';
  content: string;
};

interface AiAssistantProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export default function AiAssistant({ messages, isLoading, onSendMessage }: AiAssistantProps) {
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    onSendMessage(userInput);
    setUserInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow pr-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground text-center p-4">
              <p>
                You can ask the AI to make changes for you. For example: &quot;Add a clause about a 5-day review period.&quot;
              </p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : ''
              } ${msg.role === 'system' ? 'justify-center' : ''}`}
            >
              {msg.role === 'bot' && (
                <div className="p-2 bg-primary rounded-full text-primary-foreground">
                  <Bot size={20} />
                </div>
              )}
              <div
                className={`p-3 rounded-lg max-w-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : msg.role === 'system'
                    ? 'bg-yellow-500/10 border border-yellow-500/50 text-center text-sm'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="p-2 bg-muted rounded-full text-foreground">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center space-x-2">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Tell the AI what to change..."
          onKeyDown={(e) =>
            e.key === 'Enter' && !isLoading && handleSendMessage()
          }
          disabled={isLoading}
        />
        <Button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

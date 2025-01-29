import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  type: 'user' | 'system';
  content: string;
  timestamp: string;
}

export const ChatMessage = ({ 
  type, 
  content, 
  timestamp
}: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 p-4 ${
      type === 'user' ? 'bg-white' : 'bg-doc-background'
    } rounded-lg mb-4 animate-fadeIn`}>
      <div className="flex-shrink-0">
        {type === 'user' ? (
          <User className="w-6 h-6 text-doc-primary" />
        ) : (
          <Bot className="w-6 h-6 text-doc-secondary" />
        )}
      </div>
      <div className="flex-grow">
        <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
        <span className="text-xs text-gray-400 mt-2 block">{timestamp}</span>
      </div>
    </div>
  );
};
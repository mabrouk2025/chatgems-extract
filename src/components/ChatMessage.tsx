import { useState } from 'react';
import { User, Bot, Trash2, Edit2, Check, X } from 'lucide-react';

interface ChatMessageProps {
  type: 'user' | 'system';
  content: string;
  timestamp: string;
  onDelete?: () => void;
  onEdit?: (newContent: string) => void;
}

export const ChatMessage = ({ 
  type, 
  content, 
  timestamp,
  onDelete,
  onEdit 
}: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    onEdit?.(editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

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
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-doc-primary"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
              >
                <Check className="w-4 h-4" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
            {type === 'user' && (
              <div className="absolute top-0 right-0 hidden group-hover:flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-doc-primary"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
        <span className="text-xs text-gray-400 mt-2 block">{timestamp}</span>
      </div>
    </div>
  );
};
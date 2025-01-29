import { useState } from 'react';
import { X, Edit2, Check } from 'lucide-react';

interface ExtractedFieldProps {
  label: string;
  value: string;
  confidence: number;
  onDelete: () => void;
  onEdit: (newValue: string) => void;
}

export const ExtractedField = ({
  label,
  value,
  confidence,
  onDelete,
  onEdit,
}: ExtractedFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800';
    if (score >= 0.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 animate-fadeIn">
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(confidence)}`}>
            {Math.round(confidence * 100)}%
          </span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-doc-primary"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-doc-primary"
          />
          <button
            onClick={handleSave}
            className="p-2 text-doc-primary hover:text-doc-primary/80"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <p className="text-gray-600">{value}</p>
      )}
    </div>
  );
};
import { X } from 'lucide-react';

interface ExtractedFieldProps {
  label: string;
  value: string;
  confidence: number;
  onDelete: () => void;
  onEdit: (newValue: string) => void; // Keeping for compatibility
}

export const ExtractedField = ({
  label,
  value,
  confidence,
  onDelete,
}: ExtractedFieldProps) => {
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
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{value}</p>
    </div>
  );
};
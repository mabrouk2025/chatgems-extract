import { useState } from 'react';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  boundingBoxes?: Array<{
    id: string;
    label: string;
    coordinates: { x: number; y: number; width: number; height: number };
  }>;
}

export const ImagePreview = ({ imageUrl, boundingBoxes }: ImagePreviewProps) => {
  const [scale, setScale] = useState(1);
  const [showLabels, setShowLabels] = useState(true);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <ZoomIn className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <ZoomOut className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="relative w-full h-full overflow-auto">
        <div style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}>
          <img
            src={imageUrl}
            alt="Document preview"
            className="max-w-full h-auto"
          />
          
          {showLabels && boundingBoxes?.map(box => (
            <div
              key={box.id}
              style={{
                position: 'absolute',
                left: `${box.coordinates.x}px`,
                top: `${box.coordinates.y}px`,
                width: `${box.coordinates.width}px`,
                height: `${box.coordinates.height}px`,
                border: '2px solid #3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              }}
            >
              <span className="absolute -top-6 left-0 bg-doc-primary text-white px-2 py-1 text-xs rounded">
                {box.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
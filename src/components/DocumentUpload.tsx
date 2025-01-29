import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
}

export const DocumentUpload = ({ onFileUpload }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('image/')) {
        onFileUpload(file);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file.",
        });
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full h-64 border-2 border-dashed rounded-lg transition-colors duration-200 flex flex-col items-center justify-center p-6 cursor-pointer
        ${isDragging 
          ? 'border-doc-primary bg-doc-accent/10' 
          : 'border-gray-300 hover:border-doc-primary hover:bg-gray-50'
        }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-doc-primary mb-4" />
      <p className="text-lg font-medium text-gray-700">
        Drag & drop your document here
      </p>
      <p className="text-sm text-gray-500 mt-2">
        or click to select a file
      </p>
      <p className="text-xs text-gray-400 mt-4">
        Supports PNG, JPG, JPEG, GIF, BMP
      </p>
    </div>
  );
};
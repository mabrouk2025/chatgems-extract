import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentUpload } from '@/components/DocumentUpload';
import { ChatMessage } from '@/components/ChatMessage';
import { ExtractedField } from '@/components/ExtractedField';
import { ImagePreview } from '@/components/ImagePreview';

// Mock data for demonstration
const mockExtraction = {
  fields: [
    { id: '1', label: 'Invoice Number', value: 'INV-2024-001', confidence: 0.95 },
    { id: '2', label: 'Date', value: '2024-02-20', confidence: 0.88 },
    { id: '3', label: 'Total Amount', value: '$1,234.56', confidence: 0.75 },
  ],
  boundingBoxes: [
    { 
      id: '1', 
      label: 'Invoice Number',
      coordinates: { x: 100, y: 50, width: 200, height: 30 }
    },
    {
      id: '2',
      label: 'Date',
      coordinates: { x: 100, y: 100, width: 150, height: 30 }
    },
    {
      id: '3',
      label: 'Total Amount',
      coordinates: { x: 100, y: 150, width: 180, height: 30 }
    },
  ],
};

const Index = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [messages, setMessages] = useState<Array<{
    type: 'user' | 'system';
    content: string;
    timestamp: string;
  }>>([]);
  const [extractedFields, setExtractedFields] = useState(mockExtraction.fields);
  const [boundingBoxes, setBoundingBoxes] = useState(mockExtraction.boundingBoxes);

  const handleFileUpload = useCallback((file: File) => {
    setCurrentFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    
    // Add upload message to chat
    setMessages(prev => [...prev, {
      type: 'user',
      content: `Uploaded document: ${file.name}`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    // Mock system response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: 'Document processed successfully. I've extracted the following information.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  }, []);

  const handleDeleteField = (id: string) => {
    setExtractedFields(prev => prev.filter(field => field.id !== id));
    setBoundingBoxes(prev => prev.filter(box => box.id !== id));
    
    // Add deletion message to chat
    setMessages(prev => [...prev, {
      type: 'system',
      content: `Field deleted: ${extractedFields.find(f => f.id === id)?.label}`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleEditField = (id: string, newValue: string) => {
    setExtractedFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, value: newValue } : field
      )
    );
    
    // Add edit message to chat
    setMessages(prev => [...prev, {
      type: 'system',
      content: `Field updated: ${extractedFields.find(f => f.id === id)?.label}`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="min-h-screen bg-doc-background">
      <div className="container mx-auto py-8">
        {!currentFile ? (
          <DocumentUpload onFileUpload={handleFileUpload} />
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {/* Left Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Extracted Data
                </h2>
                {extractedFields.map(field => (
                  <ExtractedField
                    key={field.id}
                    label={field.label}
                    value={field.value}
                    confidence={field.confidence}
                    onDelete={() => handleDeleteField(field.id)}
                    onEdit={(newValue) => handleEditField(field.id, newValue)}
                  />
                ))}
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Chat History
                </h2>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      type={message.type}
                      content={message.content}
                      timestamp={message.timestamp}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview">Image Preview</TabsTrigger>
                  <TabsTrigger value="original">Original Image</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="h-[600px]">
                  <ImagePreview
                    imageUrl={imageUrl}
                    boundingBoxes={boundingBoxes}
                  />
                </TabsContent>
                <TabsContent value="original" className="h-[600px]">
                  <div className="w-full h-full overflow-auto">
                    <img
                      src={imageUrl}
                      alt="Original document"
                      className="max-w-full h-auto"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
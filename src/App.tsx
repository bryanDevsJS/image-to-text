import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import toast, { Toaster } from 'react-hot-toast';
import { ImageDropzone } from './components/ImageDropzone';
import { TextEditor } from './components/TextEditor';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  const processImage = async (file: File) => {
    setIsProcessing(true);
    try {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      
      const { data: { text } } = await worker.recognize(file);
      setExtractedText(text);
      await worker.terminate();
      
      toast.success('Text extracted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Image to Text Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your images into editable text with our advanced OCR technology
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
            <ImageDropzone onImageUpload={processImage} />
          </div>

          {isProcessing && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
              <p className="mt-4 text-lg font-medium text-gray-600">Processing your image...</p>
              <p className="text-sm text-gray-500">This may take a few moments</p>
            </div>
          )}

          {extractedText && (
            <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
              <TextEditor
                text={extractedText}
                onChange={setExtractedText}
              />
            </div>
          )}
        </div>
      </div>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4F46E5',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
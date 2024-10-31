import React from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface TextEditorProps {
  text: string;
  onChange: (text: string) => void;
}

export function TextEditor({ text, onChange }: TextEditorProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Extracted Text</h2>
        <button
          onClick={copyToClipboard}
          className={`
            inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${copied
              ? 'bg-green-50 text-green-700 ring-green-500'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 ring-indigo-500'
            }
          `}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 mr-2" />
          ) : (
            <ClipboardDocumentIcon className="w-4 h-4 mr-2" />
          )}
          {copied ? 'Copied!' : 'Copy text'}
        </button>
      </div>
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[300px] p-4 text-gray-800 bg-gray-50 border border-gray-200 
            rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            transition-all duration-300 resize-y"
          placeholder="Your extracted text will appear here..."
          aria-label="Extracted text editor"
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          {text.length} characters
        </div>
      </div>
    </div>
  );
}
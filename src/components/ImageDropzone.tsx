import React from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface ImageDropzoneProps {
  onImageUpload: (file: File) => void;
}

export function ImageDropzone({ onImageUpload }: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    onDrop: files => files[0] && onImageUpload(files[0])
  });

  return (
    <div
      {...getRootProps()}
      className={`relative group cursor-pointer transition-all duration-300
        ${isDragActive ? 'scale-102' : 'hover:scale-[1.01]'}`}
    >
      <div className={`
        p-8 sm:p-12 rounded-xl border-2 border-dashed transition-colors
        ${isDragActive 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 group-hover:border-indigo-400 group-hover:bg-indigo-50/50'
        }
      `}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          {isDragActive ? (
            <PhotoIcon className="w-16 h-16 text-indigo-500 mb-4" />
          ) : (
            <ArrowUpTrayIcon className="w-16 h-16 text-gray-400 group-hover:text-indigo-500 transition-colors mb-4" />
          )}
          <p className="text-lg font-medium text-gray-700 mb-2 text-center">
            {isDragActive
              ? 'Drop your image here'
              : 'Drag and drop your image here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse files
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 bg-gray-100 rounded-full">PNG</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">JPEG</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">GIF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
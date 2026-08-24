'use client';

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Trash2, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Link as LinkIcon, 
  Loader2, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ImageUploadZoneProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
}

/**
 * Client-side image compressor:
 * Resizes large smartphone/DSLR photos (e.g. 5-10MB) to crisp, web-optimized JPEG data URLs (<200KB).
 */
async function compressImageFile(file: File, maxWidth = 1600, maxHeight = 1600, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image file, reject
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File is not an image'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Draw image with smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-efficiency JPEG Data URL
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  images = [],
  onChange,
  maxImages = 20,
  label = 'Property Photos & Layout Drawings'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState<{ current: number; total: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      setErrorMessage('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    if (images.length + fileArray.length > maxImages) {
      setErrorMessage(`Maximum ${maxImages} images allowed per property.`);
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingProgress({ current: 0, total: fileArray.length });

    const newCompressedList: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      try {
        setProcessingProgress({ current: i + 1, total: fileArray.length });
        const compressed = await compressImageFile(fileArray[i]);
        newCompressedList.push(compressed);
      } catch (err) {
        console.error('Error compressing image:', err);
      }
    }

    onChange([...images, ...newCompressedList]);
    setIsProcessing(false);
    setProcessingProgress(null);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleMoveLeft = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleMoveRight = (index: number) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const target = updated.splice(index, 1)[0];
    updated.unshift(target);
    onChange(updated);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    onChange([...images, customUrl.trim()]);
    setCustomUrl('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-[#142334] text-xs">
          {label} <span className="text-[#a67d64]">({images.length} uploaded)</span>
        </label>
        
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center gap-1 text-[11px] text-[#715343] hover:text-[#142334] font-medium transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL link option' : 'Paste web URL link instead'}</span>
        </button>
      </div>

      {/* Manual URL Input Option (Optional fallback) */}
      {showUrlInput && (
        <div className="p-3 bg-[#f9f6ee] rounded-xl border border-[#eae3e0] flex gap-2">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Paste image link, e.g. https://... or /projects/sample.jpg"
            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#eae3e0] text-xs text-[#142334] focus:outline-none focus:border-[#c9ad98]"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="btn-primary py-1.5 px-3 text-xs shrink-0"
          >
            Add Link
          </button>
        </div>
      )}

      {/* Drag & Drop Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#a67d64] bg-[#f4f0ea] scale-[0.99]'
            : 'border-[#c9ad98]/70 hover:border-[#a67d64] bg-[#f9f6ee]/70 hover:bg-[#f4f0ea]/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <Loader2 className="w-8 h-8 text-[#a67d64] animate-spin" />
            <p className="text-xs font-semibold text-[#142334]">
              Optimizing & uploading photo {processingProgress?.current} of {processingProgress?.total}...
            </p>
            <p className="text-[11px] text-[#715343]">Auto-compressing to high-res web format</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#ffffff] border border-[#eae3e0] flex items-center justify-center mx-auto text-[#a67d64] shadow-sm group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#142334]">
                <span className="text-[#a67d64] underline underline-offset-2">Click to browse</span> or drag and drop photos here
              </p>
              <p className="text-[11px] text-[#715343] mt-0.5">
                Supports multiple JPG, PNG, WebP photos directly from your phone or PC
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffffff] border border-[#eae3e0] text-[10px] font-medium text-[#715343]">
              <CheckCircle2 className="w-3 h-3 text-[#a67d64]" />
              <span>Auto-optimized for ultra fast loading</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Thumbnail Gallery & Management Grid */}
      {images.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[11px] text-[#715343]">
            <span>Arrangement Preview (First image is Cover Photo):</span>
            <span>{images.length} / {maxImages} slots</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgSrc, idx) => (
              <div
                key={idx}
                className={`relative group rounded-xl overflow-hidden border bg-[#ffffff] shadow-sm transition-all ${
                  idx === 0 ? 'ring-2 ring-[#a67d64] border-[#a67d64]' : 'border-[#eae3e0]'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[4/3] bg-[#f4f0ea] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={`Property upload ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Primary Cover Badge */}
                  {idx === 0 ? (
                    <div className="absolute top-2 left-2 bg-[#142334] text-[#ffffff] font-semibold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-[#c9ad98] text-[#c9ad98]" />
                      <span>Main Cover</span>
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </div>
                  )}

                  {/* Delete Button Overlay */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    title="Remove this photo"
                    className="absolute top-2 right-2 w-6 h-6 rounded-md bg-red-600/90 text-white flex items-center justify-center opacity-90 hover:opacity-100 hover:bg-red-700 transition-all shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Control Actions Bar */}
                <div className="p-1.5 bg-[#f9f6ee] border-t border-[#eae3e0] flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveLeft(idx)}
                      title="Move Left"
                      className="p-1 rounded bg-white hover:bg-[#eae3e0] text-[#142334] border border-[#eae3e0] disabled:opacity-30"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMoveRight(idx)}
                      title="Move Right"
                      className="p-1 rounded bg-white hover:bg-[#eae3e0] text-[#142334] border border-[#eae3e0] disabled:opacity-30"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className="text-[#715343] hover:text-[#142334] font-semibold flex items-center gap-0.5 hover:underline"
                    >
                      <Star className="w-2.5 h-2.5 text-[#a67d64]" />
                      <span>Set Cover</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

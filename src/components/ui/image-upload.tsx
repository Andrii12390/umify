'use client';

import type { MouseEvent } from 'react';

import { X, Upload } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/utils';

import { Button } from './button';

interface Props {
  value?: string | File;
  onChange: (file: File | undefined) => void;
  disabled?: boolean;
}

const MAX_SIZE_MB = 10;

export const ImageUpload = ({ value, onChange, disabled }: Props) => {
  const [preview, setPreview] = useState<string | null>(typeof value === 'string' ? value : null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
    disabled,
  });

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange(undefined);
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="border-border relative h-50 overflow-hidden rounded-lg border-2 border-dashed">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'border-border hover:border-primary hover:bg-primary/5 flex h-50 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
            isDragActive && 'border-primary bg-primary/5',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <input {...getInputProps()} />
          <Upload className="text-muted-foreground mb-2 size-6" />
          <p className="text-foreground text-center text-sm">
            {isDragActive ? (
              'Drop the image here'
            ) : (
              <>
                Drag & drop or <span className="font-semibold">browse</span>
                <br />
                <span className="text-muted-foreground text-xs">Max {MAX_SIZE_MB}MB</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

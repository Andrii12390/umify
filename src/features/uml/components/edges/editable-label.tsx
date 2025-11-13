import type { RefObject } from 'react';

import { useCallback, type KeyboardEvent as ReactKeyboardEvent } from 'react';

import { useEditableValue } from '@/features/uml/hooks';
import { cn } from '@/lib/utils';

type EditableLabelProps = {
  value?: string;
  fallback?: string;
  onCommit: (value: string) => void;
  classNames?: {
    wrapperClassName?: string;
    inputClassName?: string;
  };
  rows?: number;
  placeholder?: string;
  asInput?: boolean;
  allowEmpty?: boolean;
};

export const EditableLabel = ({
  value,
  fallback = '',
  onCommit,
  classNames = {},
  rows = 2,
  placeholder,
  asInput = false,
  allowEmpty = false,
}: EditableLabelProps) => {
  const {
    isEditing,
    setIsEditing,
    value: localValue,
    setValue,
    inputRef,
    startEdit,
  } = useEditableValue(value, { fallback });

  const { wrapperClassName = '', inputClassName = '' } = classNames;

  const handleCommit = useCallback(() => {
    const finalValue = allowEmpty ? localValue : localValue || fallback;
    setIsEditing(false);
    setValue(finalValue);
    onCommit(finalValue);
  }, [localValue, fallback, allowEmpty, setIsEditing, setValue, onCommit]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setValue(value ?? fallback);
  }, [value, fallback, setIsEditing, setValue]);

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter' && asInput) {
        e.preventDefault();
        handleCommit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    },
    [asInput, handleCommit, handleCancel],
  );

  if (isEditing) {
    if (asInput) {
      return (
        <input
          ref={inputRef as RefObject<HTMLInputElement>}
          className={cn('h-auto border-none bg-transparent p-0 shadow-none', inputClassName)}
          value={localValue}
          onChange={e => setValue(e.target.value)}
          onBlur={handleCommit}
          placeholder={placeholder}
          onPointerDown={e => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return (
      <textarea
        ref={inputRef as RefObject<HTMLTextAreaElement>}
        className={cn(
          'w-full resize-none border-none bg-transparent p-0 outline-none',
          inputClassName,
        )}
        value={localValue}
        onChange={e => setValue(e.target.value)}
        onBlur={handleCommit}
        onPointerDown={e => e.stopPropagation()}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        rows={rows}
      />
    );
  }

  return (
    <div
      className={cn('cursor-text wrap-break-word whitespace-pre-wrap', wrapperClassName)}
      onClick={e => e.stopPropagation()}
      onDoubleClick={startEdit}
    >
      {localValue || fallback}
    </div>
  );
};

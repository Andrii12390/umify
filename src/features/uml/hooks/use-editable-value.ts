import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from 'react';

type Config = {
  fallback?: string;
  selectOnEdit?: boolean;
};

export const useEditableValue = (
  externalValue: string | undefined,
  { fallback = '', selectOnEdit = true }: Config = {},
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(() => externalValue ?? fallback);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isEditing && externalValue !== undefined) {
      const timeoutId = setTimeout(() => {
        setValue(externalValue || fallback);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [externalValue, fallback, isEditing, setValue]);

  useEffect(() => {
    if (isEditing && selectOnEdit && inputRef.current && 'select' in inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing, selectOnEdit]);

  const startEdit = useCallback((e: ReactMouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  return {
    isEditing,
    setIsEditing,
    value,
    setValue,
    inputRef,
    startEdit,
  };
};

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useStudio } from '@/store/studio';

export interface InlineEditableTextProps {
  value: string;
  sectionId?: string;
  fieldPath?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
  onChange?: (val: string) => void;
  children?: React.ReactNode;
}

export function InlineEditableText({
  value,
  sectionId,
  fieldPath,
  as: Component = 'span',
  className,
  style,
  placeholder = 'Click to edit...',
  multiline = false,
  disabled = false,
  onChange,
  children,
}: InlineEditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);
  const initialValRef = useRef(value);
  const elementRef = useRef<HTMLElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with incoming prop when not actively editing
  useEffect(() => {
    if (!isEditing) {
      setCurrentVal(value);
      initialValRef.current = value;
      if (elementRef.current) {
        elementRef.current.textContent = value || '';
      }
    }
  }, [value, isEditing]);

  const commitToStore = useCallback(
    (nextText: string) => {
      if (onChange) {
        onChange(nextText);
      } else if (sectionId && fieldPath) {
        useStudio.getState().mutate((draft) => {
          for (const page of draft.pages) {
            const sec = page.sections.find((s) => s.id === sectionId);
            if (sec && sec.props) {
              const props = sec.props as Record<string, unknown>;
              // Support nested dot paths (e.g. 'heading.title')
              const parts = fieldPath.split('.');
              let target: Record<string, unknown> = props;
              for (let i = 0; i < parts.length - 1; i++) {
                if (target[parts[i]] && typeof target[parts[i]] === 'object') {
                  target = target[parts[i]] as Record<string, unknown>;
                } else {
                  return;
                }
              }
              target[parts[parts.length - 1]] = nextText;
              return;
            }
          }
        });
      }
    },
    [onChange, sectionId, fieldPath],
  );

  const handleStartEdit = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    initialValRef.current = currentVal;
    setIsEditing(true);

    // Notify studio / CanvasFloatingHUD of active element
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('canvas:elementSelect', {
          detail: {
            sectionId,
            fieldPath,
            rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
          },
        }),
      );
    }

    setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.focus();
        const sel = window.getSelection();
        if (sel) {
          const range = document.createRange();
          range.selectNodeContents(elementRef.current);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }, 20);
  };

  const handleInput = () => {
    if (!elementRef.current) return;
    const nextVal = elementRef.current.textContent || '';
    setCurrentVal(nextVal);

    // Debounced update to the studio store
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      commitToStore(nextVal);
    }, 350);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    const finalVal = elementRef.current?.textContent?.trim() || '';
    setCurrentVal(finalVal);
    commitToStore(finalVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!multiline || e.metaKey || e.ctrlKey) {
        e.preventDefault();
        elementRef.current?.blur();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Revert to initial value
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      setCurrentVal(initialValRef.current);
      if (elementRef.current) {
        elementRef.current.textContent = initialValRef.current;
      }
      setIsEditing(false);
      commitToStore(initialValRef.current);
      elementRef.current?.blur();
    }
  };

  return React.createElement(
    Component,
    {
      ref: elementRef,
      onClick: handleStartEdit,
      contentEditable: isEditing,
      suppressContentEditableWarning: true,
      onInput: handleInput,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      role: isEditing ? 'textbox' : undefined,
      'aria-multiline': multiline,
      'data-editable-field': fieldPath,
      'data-section-id': sectionId,
      style,
      className: cn(
        'transition-all duration-150 outline-none',
        !disabled && 'cursor-text hover:outline-dashed hover:outline-1 hover:outline-primary/50 rounded-xs',
        isEditing && 'outline-2 outline-primary ring-2 ring-primary/20 bg-primary/5 rounded-xs p-0.5',
        !currentVal && !isEditing && 'text-muted-foreground/60 italic',
        className,
      ),
    },
    currentVal || (!isEditing ? placeholder : children),
  );
}

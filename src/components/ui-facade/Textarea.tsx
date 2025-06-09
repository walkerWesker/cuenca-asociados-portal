
import React from 'react';
import { Textarea as NextUITextarea } from '@nextui-org/react';
import { cn } from '@/lib/utils';

/**
 * Facade Pattern para Textarea - Unifica la interfaz de NextUI Textarea
 */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  errorMessage?: string;
  minRows?: number;
  maxRows?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    description,
    errorMessage,
    minRows = 3,
    maxRows = 8,
    ...props 
  }, ref) => {
    return (
      <NextUITextarea
        ref={ref}
        label={label}
        description={description}
        errorMessage={errorMessage}
        minRows={minRows}
        maxRows={maxRows}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { type TextareaProps };

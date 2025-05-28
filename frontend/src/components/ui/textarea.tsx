import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`block w-full rounded-xl border border-gray-500 bg-transparent px-4 py-2 focus:border-indigo-500 sm:text-sm ${className}`}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };

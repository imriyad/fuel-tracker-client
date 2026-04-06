import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand">
            <span className="text-slate-400 group-focus-within:text-brand transition-colors">{icon}</span>
          </div>
        )}
        <input
          id={inputId}
          className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white ${
            error 
              ? 'border-rose-100 dark:border-rose-900/30 bg-rose-50/30 dark:bg-rose-900/10 focus:border-rose-500 focus:ring-rose-200' 
              : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-brand focus:ring-brand/10'
          } focus:outline-none focus:ring-4 ${
            icon ? 'pl-11' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`mt-2 text-xs font-medium ${error ? 'text-rose-500' : 'text-slate-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

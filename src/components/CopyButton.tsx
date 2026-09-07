import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  /** text copied to the clipboard */
  text: string;
  /** visually-hidden announcement, e.g. "email address copied" */
  announcement?: string;
  label?: string;
  className?: string;
};

/**
 * Copy-to-clipboard button (§8.9). On success the icon swaps Copy→Check and
 * the label reads "copied" for 1.8s; an aria-live region announces it.
 */
export function CopyButton({
  text,
  announcement = 'copied to clipboard',
  label = 'copy',
  className,
}: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable (permissions / non-secure context) */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn('btn-ghost', className)}
        aria-label={`${label} ${text}`}
      >
        {copied ? (
          <>
            <Check size={14} aria-hidden="true" /> copied
          </>
        ) : (
          <>
            <Copy size={14} aria-hidden="true" /> {label}
          </>
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? announcement : ''}
      </span>
    </>
  );
}

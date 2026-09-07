import type { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Props = {
  /** accessible + visible label, e.g. "discord" */
  label: string;
  icon?: ReactNode;
  /** visual treatment: round icon chip (default) or inline pill */
  variant?: 'icon' | 'pill';
  className?: string;
};

/**
 * Honest "coming soon" state (§8.6). Never a dead <a href="#">:
 * a non-interactive element with cursor-not-allowed, 50% opacity,
 * and a tooltip on hover/focus reading "brewing… soon."
 * Focusable via tabIndex so keyboard users get the tooltip too.
 */
export function ComingSoon({ label, icon, variant = 'icon', className }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          role="button"
          aria-disabled="true"
          aria-label={`${label} — coming soon`}
          className={cn(
            'cursor-not-allowed opacity-50',
            variant === 'icon' && 'btn-icon',
            variant === 'pill' && 'btn-ghost inline-flex items-center gap-2',
            className,
          )}
        >
          {icon}
          {variant === 'pill' ? <span>{label}</span> : null}
        </span>
      </TooltipTrigger>
      <TooltipContent>brewing… soon.</TooltipContent>
    </Tooltip>
  );
}

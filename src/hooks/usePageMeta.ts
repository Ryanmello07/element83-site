import { useEffect } from 'react';

const DEFAULT_TITLE = 'element 83 — brewing your favorite games';
const DEFAULT_DESCRIPTION =
  'element 83 — a two-person indie studio brewing quiet, unsettling games.';

/**
 * Sets per-route <title> and meta description.
 * Pass a short suffix, e.g. usePageMeta('games') → "element 83 — games".
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `element 83 — ${title}` : DEFAULT_TITLE;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description ?? DEFAULT_DESCRIPTION;

    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.content = DEFAULT_DESCRIPTION;
    };
  }, [title, description]);
}

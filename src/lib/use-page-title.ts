import { useEffect } from 'react';

export const BASE_TITLE = 'Charlie Carvajal | Quantitative Finance Portfolio';

/**
 * Sets document.title for the current route leaf and restores BASE_TITLE on
 * unmount. Assumes a single instance is mounted per route leaf — nesting
 * multiple usePageTitle calls (e.g. a layout and a page both calling it)
 * would break the restoration, since the inner unmount would reset the title
 * out from under the still-mounted outer instance.
 */
export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} | Charlie Carvajal` : BASE_TITLE;

    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}

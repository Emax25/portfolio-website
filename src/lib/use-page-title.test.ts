import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePageTitle, BASE_TITLE } from './use-page-title';

describe('usePageTitle', () => {
  it('sets document.title on mount when a title is given', () => {
    const { unmount } = renderHook(() => usePageTitle('Some Project'));
    expect(document.title).toBe('Some Project | Charlie Carvajal');
    unmount();
  });

  it('restores BASE_TITLE on unmount', () => {
    const { unmount } = renderHook(() => usePageTitle('Some Project'));
    expect(document.title).toBe('Some Project | Charlie Carvajal');
    unmount();
    expect(document.title).toBe(BASE_TITLE);
  });

  it('sets BASE_TITLE when called with no argument', () => {
    const { unmount } = renderHook(() => usePageTitle());
    expect(document.title).toBe(BASE_TITLE);
    unmount();
  });
});

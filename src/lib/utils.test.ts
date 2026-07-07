import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('drops falsy inputs', () => {
    expect(cn('px-2', undefined, null, 'text-sm')).toBe('px-2 text-sm')
  })

  it('resolves conflicting tailwind classes to the last one', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})

import { describe, expect, it } from 'vitest'
import { projectsRegistry } from '@/content/projects'
import { getChartData } from './loaders'

describe('getChartData', () => {
  it('throws on an unknown data source', () => {
    expect(() => getChartData('nonexistent')).toThrow('Unknown data source')
  })

  it('returns a non-empty dataset with an illustrative flag for known sources', () => {
    for (const src of [
      'pmcmc-posterior',
      'trading-equity',
      'trading-returns-dist',
      'aladdin-confusion',
    ]) {
      const dataset = getChartData(src)
      expect(typeof dataset.illustrative).toBe('boolean')
      expect(dataset.data.length).toBeGreaterThan(0)
    }
  })
})

describe('projects registry integrity', () => {
  it('every chart dataSrc in every project resolves to a dataset', () => {
    for (const project of projectsRegistry) {
      for (const chart of project.charts) {
        expect(() => getChartData(chart.dataSrc), `${project.slug}: ${chart.dataSrc}`).not.toThrow()
      }
    }
  })

  it('project slugs are unique', () => {
    const slugs = projectsRegistry.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

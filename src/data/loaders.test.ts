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
      'aladdin-model-comparison',
    ]) {
      const dataset = getChartData(src)
      expect(typeof dataset.illustrative).toBe('boolean')
      expect(dataset.data.length).toBeGreaterThan(0)
    }
  })
})

describe('pmcmc-posterior real data', () => {
  it('is real data, not illustrative', () => {
    const dataset = getChartData('pmcmc-posterior')
    expect(dataset.illustrative).toBe(false)
  })

  it('is downsampled to at most 200 rows and non-empty', () => {
    const dataset = getChartData('pmcmc-posterior')
    expect(dataset.data.length).toBeGreaterThan(0)
    expect(dataset.data.length).toBeLessThanOrEqual(200)
  })

  it('every row has exactly iteration, suspiciousWallet, normalWallet as numbers', () => {
    const dataset = getChartData('pmcmc-posterior')
    for (const row of dataset.data) {
      expect(Object.keys(row).sort()).toEqual(['iteration', 'normalWallet', 'suspiciousWallet'])
      expect(typeof row.iteration).toBe('number')
      expect(typeof row.suspiciousWallet).toBe('number')
      expect(typeof row.normalWallet).toBe('number')
    }
  })
})

describe('aladdin-model-comparison real data', () => {
  it('is real data, not illustrative', () => {
    const dataset = getChartData('aladdin-model-comparison')
    expect(dataset.illustrative).toBe(false)
  })

  it('every row has a model name and an accuracy between 0 and 100', () => {
    const dataset = getChartData('aladdin-model-comparison')
    for (const row of dataset.data) {
      expect(typeof row.model).toBe('string')
      expect(row.accuracy).toBeGreaterThan(0)
      expect(row.accuracy).toBeLessThanOrEqual(100)
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

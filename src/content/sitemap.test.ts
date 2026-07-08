/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { projectsRegistry } from '@/content/projects'
import { journey } from '@/content/journey'
import { howIBuild } from '@/content/how-i-build'
import { pmcmcInsiderDetection } from '@/content/projects/pmcmc-insider-detection'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sitemap = readFileSync(resolve(__dirname, '../../public/sitemap.xml'), 'utf-8')

describe('sitemap <-> project registry integrity', () => {
  it('contains a <loc> for the site root and static pages', () => {
    expect(sitemap).toMatch(/<loc>https:\/\/charlie-carvajal\.vercel\.app\/<\/loc>/)
    expect(sitemap).toMatch(/<loc>https:\/\/charlie-carvajal\.vercel\.app\/journey<\/loc>/)
    expect(sitemap).toMatch(/<loc>https:\/\/charlie-carvajal\.vercel\.app\/how-i-build<\/loc>/)
  })

  it('contains a <loc> for every project slug', () => {
    for (const project of projectsRegistry) {
      expect(sitemap, `missing sitemap entry for ${project.slug}`).toContain(
        `<loc>https://charlie-carvajal.vercel.app/projects/${project.slug}</loc>`
      )
    }
  })
})

describe('journey content integrity', () => {
  it('has non-empty sections with unique ids', () => {
    expect(journey.sections.length).toBeGreaterThan(0)
    const ids = journey.sections.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every section has a non-empty heading and body', () => {
    for (const section of journey.sections) {
      expect(section.heading.length).toBeGreaterThan(0)
      expect(section.body.length).toBeGreaterThan(0)
    }
  })
})

describe('how-i-build content integrity', () => {
  it('has non-empty toolchain and workflow', () => {
    expect(howIBuild.toolchain.length).toBeGreaterThan(0)
    expect(howIBuild.workflow.length).toBeGreaterThan(0)
  })

  it('every toolchain entry has a non-empty name and role', () => {
    for (const entry of howIBuild.toolchain) {
      expect(entry.name.length).toBeGreaterThan(0)
      expect(entry.role.length).toBeGreaterThan(0)
    }
  })
})

describe('pmcmc-insider-detection retrospective and timeline', () => {
  it('is marked active', () => {
    expect(pmcmcInsiderDetection.status).toBe('active')
  })

  it('has a non-empty retrospective with limitations and nowDifferent', () => {
    expect(pmcmcInsiderDetection.retrospective).toBeDefined()
    expect(pmcmcInsiderDetection.retrospective!.limitations.length).toBeGreaterThan(0)
    expect(pmcmcInsiderDetection.retrospective!.nowDifferent.length).toBeGreaterThan(0)
  })

  it('has a non-empty timeline with date and title on each entry', () => {
    expect(pmcmcInsiderDetection.timeline).toBeDefined()
    expect(pmcmcInsiderDetection.timeline!.length).toBeGreaterThan(0)
    for (const entry of pmcmcInsiderDetection.timeline!) {
      expect(entry.date.length).toBeGreaterThan(0)
      expect(entry.title.length).toBeGreaterThan(0)
    }
  })
})

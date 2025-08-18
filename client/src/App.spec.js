import { mount } from '@vue/test-utils'
import { vi, describe, it, expect } from 'vitest'
import App from './App.vue'

// Small helper to let pending microtasks resolve (e.g. await response.json())
const flushPromises = () => new Promise((r) => setTimeout(r, 0))

describe('App.vue', () => {
  it('calls fetch and logs data on success', async () => {
    const mockData = [{ id: 1, name: 'App A' }]

    // Mock fetch BEFORE mounting
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    })
    vi.stubGlobal('fetch', mockFetch)

    const logSpy = vi.spyOn(console, 'log')

    mount(App)

    await flushPromises()

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8000/api/apps')
    expect(logSpy).toHaveBeenCalledWith(mockData)
  })

  it('logs an error when fetch returns non-OK', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    })
    vi.stubGlobal('fetch', mockFetch)

    const errorSpy = vi.spyOn(console, 'error')

    mount(App)

    await flushPromises()

    // At least one error call happened:
    expect(errorSpy).toHaveBeenCalled()
    // Optionally check message content:
    const calledWithProblem = errorSpy.mock.calls.some(
      (args) => String(args[0]).includes('There has been a problem with your fetch operation')
    )
    expect(calledWithProblem).toBe(true)
  })
})
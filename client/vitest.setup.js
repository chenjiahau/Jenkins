// vitest.setup.js
import { vi } from 'vitest'

// Silence console noise during tests (you can remove if you want logs)
vi.spyOn(console, 'log').mockImplementation(() => { })
vi.spyOn(console, 'error').mockImplementation(() => { })
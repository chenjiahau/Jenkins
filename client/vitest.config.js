// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,

    // write machine-readable test output:
    reporters: ['default', 'junit', 'json'],
    // write each reporter to a file
    outputFile: {
      junit: './artifacts/junit.xml',
      json: './artifacts/results.json',
    },

    // coverage output (HTML + JSON) into artifacts dir
    coverage: {
      enabled: true,
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './artifacts/coverage',
    },
  },
})
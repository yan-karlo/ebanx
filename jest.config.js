/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
  ],
  coverageThreshold: {
      global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
      },
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testTimeout: 120000,
  coverageDirectory: './tests/__coverage__',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  testMatch: ['**/tests/**/*.(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
      '@/tests/(.*)': '<rootDir>/tests/$1',
      '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },

};
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/application/interfaces/**/*.ts",
    "!<rootDir>/src/domain/entities/**/*.ts",
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
      '@/(.*)': '<rootDir>/src/$1',
      '@/tests/(.*)': '<rootDir>/tests/$1',
  },
  transform: {
      // '^.+\\.(t|j)sx?$': ['@swc/jest'],
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },

  include: ["src/**/*", "tests/**/*"],
  exclude: [".build/**/*", "__coverage__/**/*", "webpack.config.js"]
};
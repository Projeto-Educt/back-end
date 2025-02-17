module.exports = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            decoratorMetadata: true,
          },
        },
      },
    ],
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/type/*.ts',
    '!<rootDir>/**/types/*.ts',
    '!<rootDir>/**/config/*.ts',
    '!<rootDir>/**/configs/*.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/nest/main.ts',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  verbose: true,
  passWithNoTests: true,
  noStackTrace: true,
  testSequencer: './test-sequencer.js',
  testMatch: ['**/*.spec.ts'],
};

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
    '!<rootDir>/**/type/**/*.ts',
    '!<rootDir>/**/types/**/*.ts',
    '!<rootDir>/**/contract/**/*.ts',
    '!<rootDir>/**/contracts/**/*.ts',
    '!<rootDir>/**/config/**/*.ts',
    '!<rootDir>/**/configs/**/*.ts',
    '!<rootDir>/**/factory/**/*.ts',
    '!<rootDir>/**/factories/**/*.ts',
    '!<rootDir>/**/template/**/*.ts',
    '!<rootDir>/**/templates/**/*.ts',
    '!<rootDir>/**/events/**/*.event.ts',
    '!<rootDir>/**/events/**/*.events.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/nest/main.ts',
    '!<rootDir>/src/nest/**/dto/**',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  verbose: true,
  passWithNoTests: true,
  noStackTrace: true,
  testSequencer: './test-sequencer.js',
  testMatch: ['**/*.unit.spec.ts', '**/*.int.spec.ts', '**/*.e2e.spec.ts'],
};

const config = require('./jest.config');
config.testMatch = ['**/*.int.spec.ts', '**/*.unit.spec.ts'];
module.exports = config;

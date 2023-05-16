/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset         : 'ts-jest',
  testEnvironment: 'node',
  clearMocks     : true,
  testMatch      : ['**/*/*.spec.ts'],
  testTimeout    : 10000,

  moduleNameMapper: {
    '@database'        : '<rootDir>/src/database',
    '@modules/(.*)'    : '<rootDir>/src/modules/$1',
    '@routes'          : '<rootDir>/src/routes',
    '@config'          : '<rootDir>/src/config',
    '@exceptions/(.*)' : '<rootDir>/src/exceptions/$1',
    '@utils/(.*)'      : '<rootDir>/src/utils/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@enums/(.*)'      : '<rootDir>/src/enums/$1',
  },
};

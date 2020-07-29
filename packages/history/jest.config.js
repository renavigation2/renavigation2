module.exports = {
  preset: 'react-native',
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['src/**/*.ts?(x)'],
  cacheDirectory: '.jest/cache',
  testMatch: ['**/__tests__/**/*.test.ts?(x)']
}

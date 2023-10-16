module.exports = {
  testEnvironment: 'node', // Run tests in a Node.js environment
  roots: ['<rootDir>/src'], // Define the root directory for your tests
  testMatch: ['**/__tests__/**/*.test.ts'], // Match test files using this pattern
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  preset: 'ts-jest',
};



// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   // cacheDirectory: '.tmp/jestCache',
//   silent: true,
//   moduleNameMapper: {
//     '^@server/(.*)$': '<rootDir>/server/src/$1',
//   },
// };


// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     cacheDirectory: '.tmp/jestCache'
//   };
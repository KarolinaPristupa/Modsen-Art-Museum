module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/__mocks__/fileMock.js",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1", //
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{js,ts,tsx}",
    "!src/**/index.ts",
  ],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

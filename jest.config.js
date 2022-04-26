module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "jsdom",
  setupFiles: ["jest-canvas-mock"],
};

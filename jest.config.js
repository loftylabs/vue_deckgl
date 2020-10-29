module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  }
}

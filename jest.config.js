/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    projects: [
        {
            displayName: 'default-tests',
            preset: 'ts-jest',
            testEnvironment: 'node',
        },
        {
            displayName: 'serial-tests',
            preset: 'ts-jest',
            testEnvironment: 'node',
            runner: 'jest-serial-runner',
            watchPathIgnorePatterns: ['package.json'],
            testMatch: ['**/?(*.)+(serial-test).[jt]s?(x)'],
        },
    ],
};

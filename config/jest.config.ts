import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    rootDir: "..",
    testMatch: ['**/__tests__/**/*.test.ts'],
    // collectCoverageFrom: [
    //     'src/**/*.ts',
    //     '!src/**/*.d.ts',
    // ],
}

export default config;
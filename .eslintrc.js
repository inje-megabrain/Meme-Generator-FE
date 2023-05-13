module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'airbnb/hooks',
        "airbnb-typescript",
    ],
    env: {
        browser: true,
        es2021: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 2,
        '@typescript-eslint/explicit-function-return-type': 'on',
        '@typescript-eslint/explicit-module-boundary-types': 'on',
        '@typescript-eslint/no-explicit-any': 'on',
    },
}
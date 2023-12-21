module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    globals: {
        // "vue": true,
        // "dayjs": true,
    },
    overrides: [
        {
            files: ['*.{ts,tsx}'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended-type-checked',
                'plugin:prettier/recommended',
            ],
        },
    ],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: [],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: true,
            impliedStrict: false,
            jsx: true,
        },
    },

    rules: {
        // 和 vscode 配置中需要一致
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'avoid',
                endOfLine: 'auto',
                htmlWhitespaceSensitivity: 'ignore',
                singleQuote: true,
                jsxSingleQuote: true,
                useTabs: false,
                tabWidth: 4,
                printWidth: 120,
            },
        ],
    },
};

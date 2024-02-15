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
            rules: {
                '@typescript-eslint/no-var-requires': 0,
                '@typescript-eslint/no-explicit-any': 0,
                '@typescript-eslint/no-unsafe-member-access': 'warn',
            },
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
        // https://stackoverflow.com/questions/44407742/make-unreachable-code-detected-compilation-warning-instead-of-error-in-typescr
        // ts 的 allowUnreachableCode 配置会删掉 return 之后的东西, 但是又不能设置 warn. 所以这里让 eslint 去提示
        'no-unreachable': 'warn',
    },
};

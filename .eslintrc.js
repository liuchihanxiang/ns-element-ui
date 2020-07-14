module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        indent: ['error', 2],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'operator-linebreak': ['error', 'none'],
        'space-before-function-paren': 0
        // "array-bracket-newline": ["error", { "multiline": true, "minItems": 2 }]
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
}

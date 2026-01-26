export default [
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // глобалы Node
        process: 'readonly',
        // глобалы Jest
        test: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      // свои правила можно добавлять сюда
    },
  },
]

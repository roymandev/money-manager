module.exports = {
  root: true,
  extends: [
    'universe/native',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'no-underscore-dangle': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],

    // Prevent conflict with prettier
    'import/order': 'off',

    // Ensures props and state inside functions are always up-to-date
    'react-hooks/exhaustive-deps': 'warn',

    // allow .js files to contain JSX, *you can also add typescript extensions too*
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] },
    ],

    //  to allow for usage of styles variable  before it was defined
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],

    // ignore errors for prop validation
    'react/prop-types': [0],

    // allow default imports. e.g. in index.js files.
    'no-restricted-exports': [0, { restrictedNamedExports: ['default'] }],

    // ignore errors for import directives, *you can also add typescript extensions too*
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'import/prefer-default-export': 'off',
  },
};

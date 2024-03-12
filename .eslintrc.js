module.exports = {
  extends: './node_modules/@socprime/master-configuration/.eslintrc',
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'jsonc/key-name-casing': 0,
      },
    },
  ],
};

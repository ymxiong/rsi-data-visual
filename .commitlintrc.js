module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'subject-case': [0],
  },
};

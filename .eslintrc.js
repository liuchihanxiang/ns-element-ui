module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-console": "off",
    "no-debugger": "off",
    "operator-linebreak": [0, "none"],
    "space-before-function-paren": 0,
    "vue/attribute-hyphenation": "error",
    "vue/html-closing-bracket-spacing": "error",
    "vue/no-multi-spaces": "error",
    "vue/no-spaces-around-equal-signs-in-attribute": "error",
    "vue/prop-name-casing": "error",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["plugin:vue/essential", "@vue/standard"]
};

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["prettier", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn", //把该条提示信息转换成警告信息
  },
};

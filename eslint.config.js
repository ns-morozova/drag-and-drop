module.exports = [
  {
    ignores: ["**/webpack.*.js, dist/*, coverage/*"],
    files: ["src/**/*.js"],
    rules: {
      semi: "error",
    },
  },
  {
    ignores: ["**/webpack.*.js, dist/*, coverage/*"],
    files: ["src/**/*.js"],
    rules: {
      "no-unused-vars": "error",
    },
  },
];

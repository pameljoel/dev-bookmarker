module.exports = {
  extends: "airbnb",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx", ".json"] }],
    'import/extensions': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};

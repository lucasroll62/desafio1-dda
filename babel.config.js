/* eslint-disable func-names */
/* eslint-disable react/destructuring-assignment */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['inline-dotenv'],
  };
};

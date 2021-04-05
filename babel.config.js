/*
 * @Author: xuziyong
 * @Date: 2021-01-05 02:32:59
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-05 02:56:43
 * @Description: TODO
 * @FilePath: \gallery-image\babel.config.js
 */
module.exports = function (api) {
  api.cache(true);
  const presets = ["@babel/preset-env"];
  const plugins = ["@babel/plugin-transform-runtime"];

  return {
    presets,
    plugins,
  };
};

/*
 * @Author: xuziyong
 * @Date: 2021-04-05 01:40:48
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-05 22:41:52
 * @Description: TODO
 */
// https://assets.cesium.com/1/layer.json

import { Context } from "koa";
import { PROXY_TARGET } from "./config";
import { isActUrl } from "./mock/dataActUrl";
const koaHttpProxy = require("koa-better-http-proxy");

export const proxyApp = koaHttpProxy(PROXY_TARGET.URL, {
  filter: function (ctx: Context) {
    const oriUrl = ctx.originalUrl;
    return isActUrl(oriUrl);
  },
});

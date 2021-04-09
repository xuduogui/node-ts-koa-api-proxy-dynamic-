/*
 * @Author: xuziyong
 * @Date: 2021-04-05 01:40:48
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-10 03:32:14
 * @Description: TODO
 */
// https://assets.cesium.com/1/layer.json

import { Context } from "koa";
import { PROXY_STATIC_TYPE, PROXY_TARGET } from "./config/const";
import { getRealUrl, isActUrl, isSameOrigin, isStatic } from "./config/dataActUrl";
const koaHttpProxy = require("koa-better-http-proxy");

export const proxyApp = koaHttpProxy(PROXY_TARGET.URL, {
  // 路径重写
  proxyReqPathResolver: function (ctx: Context) {
    const url = ctx.url;
    const originalUrl = ctx.originalUrl;

    const isAct = isActUrl(url);
    const isSta = isStatic(url);
    const isSamOri = isSameOrigin(originalUrl);
    const realUrl = getRealUrl(url);

    // TODO 当静态资源接口bug

    // 直接访问时，必须要解析路径后代理
    if (isSta) {
      return url;
    }

    // 活跃标记，访问真实地址
    if (isAct) {
      return realUrl;
    }

    // 如果是从有效的代理页面发起的访问，直接代理
    if (isSamOri) {
      return url;
    }

    return PROXY_STATIC_TYPE.TYPES;
  },
});

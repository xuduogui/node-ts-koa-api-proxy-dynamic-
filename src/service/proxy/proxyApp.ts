/*
 * @Author: xuziyong
 * @Date: 2021-04-05 01:40:48
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-11 13:00:40
 * @Description: TODO
 */
// https://assets.cesium.com/1/layer.json

import { Context } from "koa";
import { PROXY_TARGET } from "./config/const";
import { getAct, isSameOrigin } from "./config/dataActUrl";
const koaHttpProxy = require("koa-better-http-proxy");

export const proxyApp = koaHttpProxy(PROXY_TARGET.url, {
  https: PROXY_TARGET.isHttps,
  // 路径重写
  proxyReqPathResolver: function (ctx: Context) {
    const url = ctx.url;
    const referUrl = ctx.header.referer;
    const host = ctx.host;

    const actElement = getAct(url);
    const isSamOri = typeof referUrl === "string" && isSameOrigin(referUrl.split(host)[1]);

    // 活跃标记，访问真实地址
    if (actElement !== null) {
      return actElement.getRealUrl(url);
    }

    // 如果是从有效的代理页面发起的访问，直接代理
    if (isSamOri) {
      return url;
    }

    return PROXY_TARGET.no_page;
  },
});

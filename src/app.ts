/*
 * @Author: xuziyong
 * @Date: 2021-04-05 02:48:38
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-05 22:29:10
 * @Description: TODO
 */
import Koa from "koa";
import { Context } from "koa";
import { proxyApp } from "./service/proxy/proxyApp";
const app = new Koa();

// assets.cesium.com;
app.use(proxyApp);

// app.use(async (ctx: Context) => {
//   ctx.body = "hello world222";
// });

app.listen(2021);

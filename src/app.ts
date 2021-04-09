/*
 * @Author: xuziyong
 * @Date: 2021-04-05 02:48:38
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-09 00:32:27
 * @Description: TODO
 */
import Koa from "koa";
import { proxyApp } from "./service/proxy/proxyApp";
const app = new Koa();

app.use(proxyApp);

app.listen(2021);

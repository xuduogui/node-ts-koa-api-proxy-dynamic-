/*
 * @Author: xuziyong
 * @Date: 2021-04-05 22:34:19
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-10 02:52:14
 * @Description: TODO
 */

import { ProxyAboutOrigin, ProxyAboutOriginItem } from "../class/ProxyAbout";
import { PROXY_STATIC_TYPE } from "./const";

/**
 * 活跃的接口
 */
export const dataActUrls = [new ProxyAboutOriginItem("/act/url", PROXY_STATIC_TYPE.TYPES)];

export const dataAct = () => new ProxyAboutOrigin(...dataActUrls);

export const dataActProxyConfig = dataAct();

/**
 * 判断当前接口是否是有效地址
 * @param path 目标地址
 * @returns boolean
 */
export const isActUrl = (path: string): boolean => {
  return dataActProxyConfig.hasActUrl(path);
};

export const isStatic = (path: string): boolean => {
  return dataActProxyConfig.isStatic(path);
};

export const isSameOrigin = (oriPath: string): boolean => {
  return isActUrl(oriPath);
};

export const getRealUrl = (path: string): string | null => {
  return dataActProxyConfig.getRealUrl(path);
};

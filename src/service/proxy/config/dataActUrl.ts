/*
 * @Author: xuziyong
 * @Date: 2021-04-05 22:34:19
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-11 12:19:06
 * @Description: TODO
 */

import { ProxyAboutOrigin, ProxyAboutOriginItem } from "../class/ProxyAbout";

interface DataActUrlsStore {
  details: Array<ProxyAboutOriginItem>;
}

/**
 * 活跃的接口
 */
export const dataActUrlsStore: DataActUrlsStore = {
  details: [new ProxyAboutOriginItem("/act/url")],
};

/**
 * 获取活跃地址
 * @returns
 */
export const dataAct = () => new ProxyAboutOrigin(...dataActUrlsStore.details);

/**
 * 判断当前接口是否是有效地址
 * @param path 目标地址
 * @returns boolean
 */
export const isActUrl = (path: string): boolean => {
  return dataAct().hasActUrl(path);
};

export const isSameOrigin = (oriPath: string): boolean => {
  return isActUrl(oriPath);
};

export const getAct = (path: string): ProxyAboutOriginItem | null => {
  return dataAct().getAct(path);
};

/*
 * @Author: xuziyong
 * @Date: 2021-04-05 22:34:19
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-05 22:49:56
 * @Description: TODO
 */
/**
 * 活跃的接口
 */
export const dataActUrls: Array<string> = ["/test/api"];

setTimeout(() => {
  dataActUrls.push("/hhh/hhh/api");
}, 1000 * 10);

/**
 * 判断当前接口是否是有效地址
 * @param url 接口地址
 * @returns boolean
 */
export const isActUrl = (url: string): boolean => {
  const target = dataActUrls.filter((e) => url.startsWith(e));
  if (Array.isArray(target) && target[0]) {
    return true;
  }
  return false;
};

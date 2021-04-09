/*
 * @Author: xuziyong
 * @Date: 2021-04-09 00:36:35
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-10 02:58:19
 * @Description: TODO
 */

import { PROXY_STATIC_TYPE } from "../config/const";

export abstract class ProxyAbout {
  actUrl!: string;
  abstract getUrl(): string;
  abstract isAct(path: string): boolean;
  abstract isStatic(path: string): boolean;
  abstract isDirect(path: string): boolean;
  abstract getRealUrl(path: string): string;
}

/**
 * 目标配置项
 */
export class ProxyAboutOriginItem extends ProxyAbout {
  // 可以访问的代理地址
  actUrl!: string;
  // 代理后页面内可以直接访问的路径，防止项目中出现相对路径
  pageDirectAccess!: Array<string>;
  // 静态资源类型
  staticType!: Array<string>;
  // 代理服务截至日期
  deadline!: string;

  /**
   * 配置项
   * @param actUrl
   * @param pageDirectAccess
   * @param deadline
   */
  constructor(
    actUrl: string,
    pageDirectAccess: Array<string> = [""],
    deadline: string = "9999-12-01 23:59:59",
    staticType: Array<string> = PROXY_STATIC_TYPE.TYPES
  ) {
    super();
    this.actUrl = actUrl;
    this.pageDirectAccess = pageDirectAccess;
    this.deadline = deadline;
    this.staticType = staticType;
  }

  getUrl(): string {
    return this.actUrl;
  }

  getRealUrl(path: string): string {
    // TODO
    return path.split(this.actUrl)[1];
  }

  isDirect(path: string): boolean {
    const directs = this.pageDirectAccess;
    if (!Array.isArray(directs)) {
      return false;
    }
    for (let index = 0; index < directs.length; index++) {
      const element = directs[index];
      if (path.startsWith(element)) {
        return true;
      }
    }
    return false;
  }

  isStatic(path: string): boolean {
    const types = this.staticType;
    if (!Array.isArray(types)) {
      return false;
    }
    for (let index = 0; index < types.length; index++) {
      const element = types[index];
      if (path.endsWith(element)) {
        return true;
      }
    }
    return false;
  }

  isAct(path: string): boolean {
    return !this.isDead() && path.startsWith(this.getUrl());
  }

  isDead(): boolean | Error {
    // 默认没有失效时间
    if (typeof this.deadline === undefined) {
      return false;
    }

    if (typeof this.deadline === "string") {
      const deadlineTime = new Date();
      const timeArray = this.deadline.split(" ");
      const time = [...timeArray[0].split("-"), ...timeArray[1].split(":")];
      time[0] && deadlineTime.setFullYear(+time[0]);
      time[1] && deadlineTime.setMonth(+time[1] - 1);
      time[2] && deadlineTime.setDate(+time[2]);
      time[3] && deadlineTime.setHours(+time[3]);
      time[4] && deadlineTime.setMinutes(+time[4]);
      time[5] && deadlineTime.setSeconds(+time[5]);
      return deadlineTime.getTime() < new Date().getTime();
    }

    return new Error("deadline 数据类型错误");
  }
}

/**
 * 配置项组合
 */
export class ProxyAboutOrigin<T extends ProxyAbout> {
  [index: number]: T;
  length!: number;

  constructor(...args: T[]) {
    args.forEach((element, index) => {
      this[index] = element;
    });
    this.length = args.length;
  }

  /**
   * 判断目标路径是否有效
   * @param path
   * @returns
   */
  hasActUrl(path: string): boolean {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];
      if (element.isAct(path)) {
        return true;
      }
    }
    return false;
  }

  isStatic(path: string) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];
      if (element.isStatic(path)) {
        return true;
      }
    }
    return false;
  }

  isDirect(path: string) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];
      if (element.isDirect(path)) {
        return true;
      }
    }
    return false;
  }

  getRealUrl(path: string): string | null {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];
      if (element.isAct(path)) {
        return element.getRealUrl(path);
      }
    }
    return null;
  }
}

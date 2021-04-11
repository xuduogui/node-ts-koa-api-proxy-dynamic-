/*
 * @Author: xuziyong
 * @Date: 2021-04-09 00:36:35
 * @LastEditors: xuziyong
 * @LastEditTime: 2021-04-11 00:51:18
 * @Description: TODO
 */

/**
 * 目标配置项
 */
export class ProxyAboutOriginItem {
  // 可以访问的代理地址
  actUrl!: string;
  // 代理服务截至日期
  deadline!: string;

  /**
   * 配置项
   * @param actUrl
   * @param pageDirectAccess
   * @param deadline
   */
  constructor(actUrl: string, deadline: string = "9999-12-01 23:59:59") {
    this.actUrl = actUrl;
    this.deadline = deadline;
  }

  getUrl(): string {
    return this.actUrl;
  }

  getAct(): ProxyAboutOriginItem {
    return this;
  }

  getRealUrl(path: string): string {
    return path.split(this.actUrl)[1];
  }

  isAct(path: string): boolean {
    return !this.isDead() && path.startsWith(this.getUrl());
  }

  isDead(): boolean {
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

    return false;
  }
}

/**
 * 配置项组合
 */
export class ProxyAboutOrigin<T extends ProxyAboutOriginItem> {
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

  getAct(path: string): ProxyAboutOriginItem | null {
    for (let i = 0; i < this.length; i++) {
      const element = this[i];
      if (element.isAct(path)) {
        return element;
      }
    }
    return null;
  }
}

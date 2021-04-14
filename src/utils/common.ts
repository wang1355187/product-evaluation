/**
 * 共用函数
 */

import { defaultSettings } from "@/config";

export const repeat = (str = "0", times) => new Array(times + 1).join(str);
// 时间前面 +0
export const pad = (num, maxLength = 2) =>
  repeat("0", maxLength - num.toString().length) + num;

// 全局的公共变量
export const globalData: any = {};

// 时间格式装换函数

export const formatTime = (time) => {
  `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(
    time.getSeconds()
  )}.${pad(time.getMilliseconds(), 3)}`;
};

export const getQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};

export const currentChannel = defaultSettings[getQueryString("channel") || ""]
  ? (getQueryString("channel") as string)
  : "default";

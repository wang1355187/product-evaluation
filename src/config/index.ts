/**
 * 这里为了方便测试使用 Easy Mock 模拟接口数据
 *
 * https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad/getlist
 */

export const ONLINEHOST =
  "https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad";

/**
 * mock 接口
 * */

export const MOCKHOST =
  "https://www.easy-mock.com/mock/5d38269ffb233553ab0d10ad";

/**
 * 是否mock
 */

export const ISMOCK = true;

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = ONLINEHOST;

/**
 * 这是一个全局的分享信息 不用每一个都去写
 */
export const SHAREINFO = {
  title: "分享标题",
  path: "路径",
  imageUrl: "图片",
};

export const defaultSettings = {
  default: {
    appId: "wxa204e94f14d9fb38",
    corpid: "ww0503560e67e7f9e6",
    agentid: "1000002",
    appAgentid: "1000020",
  },
  share: {
    appId: "wxa204e94f14d9fb38",
    corpid: "wwe2fdc7d5b783e0c5",
    corpid_secret: "0KOt1K5KTGMRazbxpJEGbnywDSNP2ph-W9k_UFJ47j4",
    agentid: "1000004",
    agentid_secret: "xwGFJ4KdbBj_Yy234eAXc5ln2WxYJLtc4-yr1_Lt2mk",
  },
};

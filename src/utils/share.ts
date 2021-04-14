import { defaultSettings } from "@/config/index";
import Cookies from "js-cookie";
import { currentChannel } from "./common";

/**
 * 企业微信分享
 */
export function wxCompanyConfig(config, appConfig, readyData) {
  /** 需要使用的JS接口列表 */
  const jsApiList = ["onMenuShareAppMessage", "onMenuShareWechat"];
  wx.config({
    beta: true,
    debug: false,
    appId: defaultSettings[currentChannel].corpid,
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    // nonceStr: config.noncestr, // 必填，生成签名的随机串
    nonceStr: config.nonce, // 必填，生成签名的随机串
    signature: config.signature, // 必填，签名
    jsApiList, // 必填，需要使用的JS接口列表
  });
  wxCompanyShareReady(readyData, appConfig);
  wx.error((res) => {
    console.log("初始化失败", res.errMsg);
    // alert('」」」」」'+res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
  });
}

/** 企业微信 */
const wxCompanyShareReady = (
  data: object,
  config: {
    timestamp: string;
    nonce: string;
    signature: string;
  }
) => {
  wx.ready(() => {
    // 需在用户可能点击分享按钮前就先调用
    // 企业微信应用初始化签名
    const jsApiList = ["sendChatMessage", "getContext"];

    wx.agentConfig({
      corpid: defaultSettings[currentChannel].corpid,
      agentid: defaultSettings[currentChannel].agentid,
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonce, // 必填，生成签名的随机串
      signature: config.signature, // 必填，签名
      jsApiList, // 必填，需要使用的JS接口列表
      success(res) {
        // 回调
        wx.invoke("getContext", {}, function (ContextRes) {
          if (ContextRes.err_msg == "getContext:ok") {
            const entry = ContextRes.entry; //返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools
            Cookies.set("contextType", entry);
          }
        });
        console.log("agentConfig初始化成功");
      },
      fail(res) {
        if (res.errMsg.indexOf("function not exist") > -1) {
          alert("企业微信应用版本过低请升级");
        }
      },
    });
    wx.onMenuShareAppMessage({
      ...data,
      success: () => {
        console.log("分享初始化成功");
        // 设置成功
      },
    });
    wx.onMenuShareWechat({
      ...data,
      success: () => {
        console.log("分享初始化成功");
        // 设置成功
      },
    });
  });
};

/**
 * config注入的是企业的身份与权限，而agentConfig注入的是应用的身份与权限。
 *  企业微信应用分享
 */
export function wxCompanyAppReady(readyData) {
  /** 需要使用的JS接口列表 */
  wx.ready(() => {
    wx.invoke(
      "sendChatMessage",
      {
        msgtype: "news", // 消息类型，必填
        news: { ...readyData },
      },
      (res) => {
        if (res.err_msg === "sendChatMessage:ok") {
          console.log("发送成功");
          // 发送成功
        }
      }
    );
  });
  wx.error((res) => {
    console.log("应用初始化失败", res.errMsg);
    // alert('」」」」」'+res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
  });
}

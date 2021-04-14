import {
  getShareSignatureCompany,
  getWorkSignature,
  getWorkAPPSignature,
} from "@/services/weChat";
import { currentChannel } from "@/utils/common";
import { wxCompanyConfig } from "@/utils/share";
import { defaultSettings } from "../config/index";

const WeChatModel = {
  namespace: "weChatModel",
  state: {},
  effects: {
    /** 获取企业微信的签名 */
    *getWxCompanyConfig({ payload }, { call, all }) {
      const { agentid, corpid_secret, agentid_secret,corpid } = defaultSettings[
        currentChannel
      ];
      const url = window.location.href.split("#")[0];
      // 企业微信参数
      const postData = {
        corpid,
        agentid,
        uri: encodeURIComponent(url),
      };
      // 企业微信应用参数
      // const appPostData = {
      //   appid: defaultSettings.agentid,
      //   isApp: true,
      //   url,
      // };
      const [response, appResponse] = yield all([
        call(getWorkSignature, { ...postData, secret: corpid_secret }),
        call(getWorkAPPSignature, { ...postData, secret: agentid_secret }),
      ]);
      const appRes = appResponse.data;
      const qwRes = response.data;
      // if (appRes && appRes.code === 0) {
      //   wxCompanyConfig(qwRes.data, appRes.data, payload);
      //   return;
      // }
      if (appRes && qwRes) {
        wxCompanyConfig(qwRes, appRes, payload);
        return;
      }
      console.log("签名接口请求失败");
    },
  },
};

export default WeChatModel;

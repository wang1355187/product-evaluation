import Taro from "@tarojs/taro";
import qs from "qs";
import { IOptions } from "./types";
import Tips from "../utils/tips";

export const IS_DEV = process.env.NODE_ENV === "development";

// 开发时本地可自己开启NeteaseCloudMusicApi服务(https://binaryify.github.io/NeteaseCloudMusicApi/#/)
// export const BASE_URL = IS_DEV ? 'https://moment.planplus.cn/product-analysis' : 'https://www.jungaweb.club'
export const BASE_URL = "https://pingce.planplus.cn";
// 微信相关模块接口域名
export const WE_CATH_BASE_URL = "https://wx.planplus.cn";

export const HTTP_ERROR = {
  "400": "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  "401": "用户没有权限（令牌、用户名、密码错误）。",
  "403": "用户得到授权，但是访问是被禁止的。",
  "404": "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  "406": "请求的格式不可得。",
  "410": "请求的资源被永久删除，且不会再得到的。",
  "422": "当创建一个对象时，发生一个验证错误。",
  "500": "服务器发生错误，请检查服务器。",
  "502": "网关错误。",
  "503": "服务不可用，服务器暂时过载或维护。",
  "504": "网关超时。",
};

/**
 * 检查http状态值
 * @param response
 * @returns {*}
 */
function checkHttpStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.data;
  }

  const message =
    HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`;
  const error: any = new Error(message);
  error.response = response;
  throw error;
}

/**
 * 检查返回值是否正常
 * @param data
 * @returns {*}
 */
function checkSuccess(data: any, resolve) {
  if (data instanceof ArrayBuffer && typeof data === "string") {
    return data;
  }

  if (typeof data.code === "number" && data.code === 0) {
    return resolve({ data, isSuccess: true });
  } else {
    Tips.toast(data.msg);
  }
}

/**
 * 请求错误处理
 * @param error
 * @param reject
 */
function throwError(error, reject) {
  if (error.errMsg) {
    console.log(error)
    reject("服务器正在维护中!");
    throw new Error("服务器正在维护中!");
  }
  throw error;
}

export interface IRepResult {
  isSuccess?: boolean;
  data: any;
}

export default {
  request(options: IOptions): Promise<IRepResult> {
    const {
      method,
      headers = {},
      url,
      isLoading,
      weChatDomain,
      contentType,
      ...rest
    } = options;
    return new Promise((resolve, reject) => {
      if (isLoading) {
        Tips.loding("加载中");
      }
      // Taro.request({
      //   method: method || "GET",
      //   url: `${weChatDomain ? WE_CATH_BASE_URL : BASE_URL}${url}`,
      //   header: {
      //     "content-type": contentType || "application/x-www-form-urlencoded",
      //     ...headers,
      //   },
      //   ...rest,
      // })
      Taro.request({
        method: method || "GET",
        url: IS_DEV?`${url}`:`${weChatDomain ? WE_CATH_BASE_URL : BASE_URL}${url}`,
        header: {
          "content-type": "application/json",
          ...headers,
        },
        ...rest,
      })
        .then(checkHttpStatus)
        .then((res) => {
          if (!weChatDomain) {
            checkSuccess(res, resolve);
          } else {
            return resolve({ data: res, isSuccess: true });
          }
        })
        .catch((error) => {
          throwError(error, reject);
        })
        .finally(() => {
          Tips.loaded();
        });
    });
  },
  get(options: IOptions) {
    return this.request({
      ...options,
    });
  },
  post(options: IOptions) {
    return this.request({
      method: "POST",
      ...options,
      data: options.data,
    });
  },
  put(options: IOptions) {
    return this.request({
      method: "PUT",
      ...options,
      data: qs.stringify(options.data),
    });
  },
  delete(options: IOptions) {
    return this.request({
      method: "DELETE",
      ...options,
      data: qs.stringify(options.data),
    });
  },
};

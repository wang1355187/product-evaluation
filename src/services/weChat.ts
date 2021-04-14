import request from "./index";
/**
 *  微信分享签名
 *
 * @export
 * @param {object} postData
 * @returns {Promise<any>}
 */
export async function getShareSignature(postData: object): Promise<any> {
  return request.post({
    url: `/wechat/share_signature`,
    data: { ...postData },
    weChatDomain: true,
  });
}

/**
 * 企业微信分享签名(废弃)
 *
 * @export
 * @param {object} postData
 * @returns {Promise<any>}
 */
export async function getShareSignatureCompany(postData: object): Promise<any> {
  return request.post({
    url: "/wechat/share_signature_company",
    data: { ...postData },
    weChatDomain: true,
  });
}

/**
 * 企业微信分享签名
 *
 * @export
 * @param {object} postData
 * @returns {Promise<any>}
 */
export async function getWorkSignature(option: {
  agentid: number;
  uri: string;
  secret?: string;
  corpid?: string;
}): Promise<any> {
  let url = `/sig_corp?agentid=${option.agentid}&uri=${option.uri}`;
  if (option.secret) {
    url += `&secret=${option.secret}&corpid=${option.corpid}`;
  }
  return request.get({
    url,
    weChatDomain: true,
  });
}

/**
 * 企业微信分享签名
 *
 * @export
 * @param {object} postData
 * @returns {Promise<any>}
 */
export async function getWorkAPPSignature(option: {
  agentid: number;
  uri: string;
  secret?: string;
  corpid?: string;
}): Promise<any> {
  let url = `/sig_app?agentid=${option.agentid}&uri=${option.uri}`;
  if (option.secret) {
    url += `&secret=${option.secret}&corpid=${option.corpid}`;
  }
  return request.get({
    url,
    weChatDomain: true,
  });
}

import request from "../../services";

/**
 * 根据产品ID获取产品对比数据
 *
 * @export
 * @param {object} postData
 * @returns
 */
export function getCompareInfo(postData: object) {
  return request.post({
    url: '/compare',
    data: postData,
    isLoading: true,
  })
}

/**
 * 获取热门对比产品
 *
 * @export
 * @returns
 */
export function getHotCompare() {
  return request.get({
    url: '/hot_compare',
    isLoading: true,
  })
}

/**
 * 获取保费调整年龄列表
 *
 * @export
 * @param {string} id
 * @returns
 */
export function getPremiumAge(id) {
  return request.get({
    url: `/ages?id=${id}`,
    isLoading: true,
  })
}

/**
 * 获取保费测算结果
 *
 * @export
 * @param {object} params
 * @returns
 */
export function getPremium(params) {
  const {
    id,
    quota,  //保额
    gender, //性别
    age,  //年龄
    social  //社保
  } = params;
  return request.get({
    url: `/premium?id=${id}&quota=${quota}&gender=${gender}&age=${age}&social=${social}`,
    isLoading: true,
  })
}
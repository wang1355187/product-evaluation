import request from "../../services";

/**
 * 根据产品ID获取产品对比数据
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getCompareInfo(postData: object) {
  return request.post({
    url: '/api/compare',
    data: postData,
    isLoading: true,
  })
}

/**
 * 获取热门对比产品
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getHotCompare() {
  return request.get({
    url: '/api/hot_compare',
    isLoading: true,
  })
}
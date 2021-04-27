import request from "../../services";

/**
 * 根据产品ID获取产品对比数据
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getCompareInfo(postData: object) {
  console.log(postData)
  return request.post({
    url: '/api/compare',
    data: postData,
    isLoading: true,
  })
}
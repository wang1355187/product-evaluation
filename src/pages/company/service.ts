import request from "../../services";

/**
 * 根据公司ID获取相关产品
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getCompanyProduct(postData: object) {
  return request.post({
    url: '/list_product_by_corp',
    data: postData,
    isLoading: true,
  })
}

/**
 * 获取公司详情信息
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getCompanyDetail(id: string) {
  return request.get({
    url: `/company?id=${id}`,
    isLoading: true,
  })
}
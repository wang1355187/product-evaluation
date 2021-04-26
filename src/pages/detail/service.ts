import request from "../../services";

/**
 * 获取产品详情信息
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getProductDetail(id: string) {
  return request.get({
    url: `/api/product?id=${id}`,
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
    url: `/api/company?id=${id}`,
    isLoading: true,
  })
}
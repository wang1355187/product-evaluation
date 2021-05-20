import request from "../../services";

/**
 * 根据名字模糊查询产品
 *
 * @export
 * @param {string} name
 * @returns
 */
export function searchProductList(postData: object) {
  return request.post({
    url: '/search_product_by_name',
    data: postData,
    isLoading: true,
  })
}

/**
 * 获取产品列表
 *
 * @export
 * @param {string} name
 * @returns
 */
export function getProductList(postData: object) {
  return request.post({
    url: '/product_list',
    data: postData,
    isLoading: true,
  })
}

/**
 * 产品过滤
 *
 * @export
 * @param {string} postData
 * @returns
 */
export function filterProductList(postData: object) {
  return request.post({
    url: '/product/list/filter/simple',
    data: { ...postData },
    isLoading: true,
  });
}

/**
 * 按险种类型筛选
 *
 * @export
 * @param {string} postData
 * @returns
 */
export function filterByType(postData: object) {
  return request.post({
    url: '/list_product_by_type',
    data: { ...postData },
    isLoading: true,
  });
}

/**
 * 获取所有公司列表
 *
 * @export
 * @param {object} postData
 * @returns
 */
export function getCompanyList() {
  return request.get({
    url: "/company_list",
    isLoading: true,
  });
}

/**
 * 根据公司名字查找公司
 *
 * @export
 * @returns
 */
export function companyNameByList(name: string) {
  return request.post({
    url: "/company/list/name",
    data: { name },
    isLoading: true,
  });
}

/**
 * 根据类型获取特性标签
 *
 * @export
 * @param {string} insType
 * @returns
 */
export function featureTagType(insType: string) {
  return request.get({
    url: `/feature/tag/type/${insType}`,
    isLoading: true,
  });
}
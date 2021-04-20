import * as service from "./service";
import Tips from "@/utils/tips";

export default {
  namespace: "detail",
  state: {
    product_detail: {}, //产品详情
    company_detail: {}, //公司详情
  },
  effects: {

  },
  reducers: {
    setProductDetail (state, { payload }) {
      const { product_detail } = payload;
      return {...state, product_detail}
    },
    setCompanyDetail (state, { payload }) {
      const { company_detail } = payload;
      return {...state, company_detail}
    }
  }
}
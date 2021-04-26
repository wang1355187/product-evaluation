import * as service from "./service";
import Tips from "@/utils/tips";

export default {
  namespace: "detail",
  state: {
    product_detail: {}, //产品详情
    company_detail: {}, //公司详情
  },
  effects: {
    *getProductDetail({ payload }, { call, put }) {
      const {data: res} = yield call(service.getProductDetail, payload.id);
      if (res.code === 0) {
        const {data} = res
        yield put({
          type: "setProductDetail",
          payload: {
            product_detail: data
          },
        });
        return data
      }
      Tips.toast(res.msg)
    },
    *getCompanyDetail({ payload }, { call, put }) {
      const {data: res} = yield call(service.getCompanyDetail, payload.id);
      if (res.code === 0) {
        const {data} = res
        yield put({
          type: "setCompanyDetail",
          payload: {
            company_detail: data
          },
        });
        return data
      }
      Tips.toast(res.msg)
    },
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
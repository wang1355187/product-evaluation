import * as service from "./service";
import Tips from "@/utils/tips";

export default {
  namespace: "contrast",
  state: {
    compare_type: '', //对比险种类型
    compare_list: [], //对比列表
    hot_compare: {}, //热门对比
    product_type_list: [], //产品对比选择列表
    count: 0,
  },
  effects: {
    *getCompareInfo ({ payload }, { call, put }) {
      const { data: res } = yield call(service.getCompareInfo, payload);
      if(res.code == 0){
        yield put({
          type: 'setCompareList',
          payload: {
            compare_list: res.data
          }
        })
        yield put({
          type: 'setCompareType',
          payload: {
            compare_type: res.data[0].product.insType
          }
        })
      }
    },
    *getHotCompare ({payload}, {call, put}) {
      const { data: res } = yield call(service.getHotCompare, payload);
      if(res.code == 0){
        yield put({
          type: 'setHotCompare',
          payload: {
            hot_compare: res.data
          }
        })
      }
    },
    *filterByType ({payload}, {call, put}) {
      const { data: res } = yield call(service.filterByType, payload.type);
      if(res.code == 0){
        yield put({
          type: 'setProTypeList',
          payload: {
            product_type_list: res.data.items,
            count: res.data.count
          }
        })
      }
    },
  },
  reducers: {
    setCompareType (state,{ payload }) {
      const { compare_type } = payload;
      return {...state, compare_type}
    },
    setCompareList (state,{ payload }) {
      const { compare_list } = payload;
      return {...state, compare_list}
    },
    setHotCompare (state,{ payload }) {
      const { hot_compare } = payload;
      return {...state, hot_compare}
    },
    clearCompare (state, { payload }) {
      const compare_list = [];
      const compare_type = '';
      return{...state, compare_list, compare_type}
    },
    setProTypeList (state,{ payload }) {
      const { product_type_list, count } = payload;
      return {...state, product_type_list, count}
    }
  }
}
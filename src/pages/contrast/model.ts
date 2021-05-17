import * as service from "./service";
import Tips from "@/utils/tips";

export default {
  namespace: "contrast",
  state: {
    compare_type: '', //对比险种类型
    compare_list: [], //对比列表
    hot_compare: {}, //热门对比
    product_list: [], //产品对比选择列表
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
    *getPremium ({payload}, {call, put}) {
      const res = yield call(service.getPremium, payload);
      console.log(res);
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
    clearCompare (state) {
      const compare_list = [];
      const compare_type = '';
      return{...state, compare_list, compare_type}
    }
  }
}
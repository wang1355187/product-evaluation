import * as service from "./service";
import Tips from "@/utils/tips";

export default {
  namespace: "contrast",
  state: {
    compare_type: '3', //对比险种类型
    compare_list: [], //对比列表
    hot_compare: {} //热门对比
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
    }
  },
  reducers: {
    setCompareList (state,{ payload }) {
      const { compare_list } = payload;
      return {...state, compare_list}
    },
    setHotCompare (state,{ payload }) {
      const { hot_compare } = payload;
      return {...state, hot_compare}
    }
  }
}
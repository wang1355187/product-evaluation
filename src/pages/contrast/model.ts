import * as service from "./service";
import Tips from "@/utils/tips";

export default {
  namespace: "contrast",
  state: {
    compare_type: '',
    compare_list: []
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
    }
  },
  reducers: {
    setCompareList (state,{ payload }) {
      const { compare_list } = payload;
      return {...state, compare_list}
    }
  }
}
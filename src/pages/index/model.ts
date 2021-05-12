import * as service from "./service";
import Tips from "@/utils/tips";

export default {
  namespace: "list",
  state: {
    data: [],
    hasData: true,
    total: "",
    pageIndex: 1,
    pageSize: 10,
    filterParam: {},  //筛选表单参数
    productList: [],  //搜索返回的产品列表
    currentKeyword: '', //搜索关键字
    lek: {}  //分页参数
  },
  effects: {
    //搜索为关键词空时，重置
    *initList({ payload }, { call, put }) {
      const {data: res} = yield call(service.getProductList, {
        ...payload,
      });
      if (res.code === 0) {
        const {data} = res;
        const list = data.items;
        yield put({
          type: "setSearchParam",
          payload: {
            data: list,
            lek: data.lek,
            currentKeyword: '',
            productList: []
          },
        });
        return data
      }
      Tips.toast(res.msg)
    },
    //获取产品列表
    *getList({ payload }, { select, call, put }) {
      const proList = yield select((state)=> state.list.data) || [];
      const {data: res} = yield call(service.getProductList, {
        ...payload,
      });
      if (res.code === 0) {
        const {data} = res;
        const list = proList.concat(data.items);
        yield put({
          type: "setData",
          payload: {
            data: list
          },
        });
        yield put({
          type: "setPageLek",
          payload: {
            lek: data.lek
          }
        })
        return data
      }
      Tips.toast(res.msg)
    },
    //筛选产品
    *fetch({ payload }, { select, call, put }) {
      let { data, pageSize, pageIndex, filterParam } = yield select(
        (state) => state.list
      );
      const { isNext } = payload;
      const index = isNext ? pageIndex + 1 : pageIndex;
      const result = yield call(service.filterProductList, {
        ...filterParam,
        pageIndex: index,
        pageSize,
      });
      if (result.isSuccess) {
        yield put({
          type: "initSData",
          payload: {
            pageIndex: index,
            data: [...data, ...result.data.data],
            total: result.data.total,
            hasData: result.data.data.length >= 10,
          },
        });
      }
    },
    //搜索产品
    *searchList({ payload }, { select, call, put }) {
      const proList = yield select((state)=> state.list.productList) || [];
      const key = yield select((state)=> state.list.currentKeyword);
      const {data: res} = yield call(service.searchProductList, {
        ...payload,
      });
      if (res.code === 0) {
        const {data} = res;
        let list = data.items;
        if(key==payload.name){
          list = proList.concat(data.items);
        }
        yield put({
          type: "setSearchParam",
          payload: {
            currentKeyword: payload.name,
            lek: data.lek,
            productList: list,
            data: list
          }
        })
        return data
      }
      Tips.toast(res.msg)
    },
  },
  reducers: {
    initSData(state, { payload }) {
      const { data, total, hasData = true, pageIndex = 1 } = payload;
      return { ...state, data, total, hasData, pageIndex };
    },
    setFilterParam(state, { payload }) {
      return { ...state, filterParam: payload };
    },
    setData(state, { payload }) {
      const { data } = payload;
      return {...state, data}
    },
    setPageLek(state, { payload }) {
      const { lek } = payload;
      return {...state, lek}
    },
    setSearchParam(state, { payload }) {
      const { currentKeyword, lek, productList, data } = payload;
      return {...state, currentKeyword, lek, productList, data}
    }
  },
};
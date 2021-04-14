import { View, Text, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtIcon, } from 'taro-ui';
import React,{ useState, useEffect, useCallback } from 'react';
import SideBar from './components/SideBar/index'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import ProCard from './components/ProCard/index'

import './index.scss'

//保险类型
const PRO_TYPE = {
  1: "重疾险",
  2: "寿险",
  3: "医疗险",
  4: "意外险",
  5: "年金险",
  6: "防癌险",
};

const Index = (props) => {
  const dispatch = useDispatch();
  //搜索关键字
  const [key,setKey] = useState('')
  //侧边栏显示状态
  const [SideBarShow,setSideBarShow] = useState(false);

  const {data, hasData, pageIndex} = useSelector(state => state.list);
  //获取产品列表数据
  const getList = useCallback((isNext: boolean = false,) => {
    dispatch({
      type: "list/fetch",
      payload: {
        isNext: !!isNext,
      },
    });
  },[dispatch]);

  useEffect(() => {
    getList();
  }, [getList]);

  // 获取浏览器窗口的可视区域的高度
  const currentHeight =
  document.documentElement.clientHeight || document.body.clientHeight;
  const scrollStyle = {
  height: `calc(${currentHeight}px - 130px)`,
  };

  //显示侧边筛选栏
  function onActionClick () {
    setSideBarShow(true);
  }

  //键盘搜索
  function onkeydown(e){
    const postData = {
      name: key,
      pageIndex,
      pageSize: 10
    }
    dispatch({
      type: 'list/searchList',
      payload: {...postData}
    }).then(res => {
      console.log(res);
    })
  }
  //ScrollView滚动到底部触发
  const onScrollToLower = () => {
    if (!hasData) {
      return;
    }
    getList(true);
  };
  return (
    <View className="index-container">

      {/* 搜索栏 */}
      <View className="search-container">
        <AtSearchBar
          value={key}
          placeholder="搜索产品"
          showActionButton
          actionName="筛选"
          onChange={ (value)=>{setKey(value)} }
          onActionClick={onActionClick}
          onConfirm={onkeydown}
        >
        </AtSearchBar>

        {/* 列表渲染 */}
        <View className="list-box">
          <ScrollView
            scrollY={true}
            onScrollToLower={onScrollToLower}
            style={scrollStyle}
          >
            { data.map((item)=>{
                return (<ProCard
                  isNew={true}
                  productName={item.productName}
                  insType={PRO_TYPE[item.insType]}
                  key={item.id}
                >
                </ProCard>)
              })
            }

            {/* 底部提示 */}
            <View
              className='toLast'
              style={hasData ? { display: "none" } : { display: "block" }}
            >
              <Text>——到底了——</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      
      {/* 侧边筛选栏 */}
      { SideBarShow &&
        <SideBar onClose={setSideBarShow}></SideBar>
      }
    </View>
  )
}
export default Index;
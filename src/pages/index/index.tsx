import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtSearchBar } from 'taro-ui';
import { useDispatch, useSelector } from 'react-redux';
import React,{ useState, useEffect, useCallback } from 'react';

import SideBar from './components/SideBar/index';
import NavBar from "@/components/NavBar/index";
import ProCard from './components/ProCard/index';
import Skeleton from 'taro-skeleton';
import './index.scss';
import 'taro-skeleton/dist/index.css';

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
  const {data, lek, hasData, currentKeyword} = useSelector(state => state.list);
  //搜索关键字
  const [key,setKey] = useState('');
  //侧边栏显示状态
  const [SideBarShow, setSideBarShow] = useState(false);
  //scrollView滚动位置
  const [scrollTop, setScrollTop] = useState(0);

  // 获取浏览器窗口的可视区域的高度
  const currentHeight =
  document.documentElement.clientHeight || document.body.clientHeight;
  const scrollStyle = {
  height: `calc(${currentHeight}px)`,
  };

  // 获取产品列表数据
  const getList = useCallback((nextLek) => {
    dispatch({
      type: "list/getList",
      payload: {
        lek: nextLek
      },
    });
  },[dispatch]);

  // 通过搜索获取列表数据，到底时触发
  const getSearchList = useCallback((nextLek, keyword) => {
    dispatch({
      type: "list/searchList",
      payload: {
        lek: nextLek,
        name: keyword
      },
    });
  },[dispatch]);


  useEffect(() => {
    getList(lek);
  }, [getList]);



  //显示侧边筛选栏
  function onActionClick () {
    setSideBarShow(true);
  }

  //键盘搜索
  function onkeydown(e){
    //复位滚动条（ScrollView组件设置scrollTop为0会失效，使用随机数替代）
    setScrollTop(Math.random());
    //关键词为空，展示全部产品
    if(key===''){
      dispatch({
        type: 'list/initList',
        payload: {
          lek: {}
        }
      })
      return;
    }
    if(key===currentKeyword){
      return;
    }
    dispatch({
      type: 'list/searchList',
      payload: {
        name: key,
        lek: {}
      }
    })
  }
  //ScrollView滚动到底部触发
  const onScrollToLower = () => {
    if (!hasData) {
      return;
    }
    if(currentKeyword!=''){
      getSearchList(lek,currentKeyword);
    }
    else{
      getList(lek);
    }
  };
  return (
    <View className="index-container">
      <NavBar justLogo={true}></NavBar>
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
      </View>
      {/* 列表渲染 */}
      <View className="list-box">
        <ScrollView
          scrollY={true}
          scrollTop={scrollTop}
          onScrollToLower={onScrollToLower}
          style={scrollStyle}
        >
          {/* 骨架屏渲染 */}
          {
            [1,2,3,4,5].map((item) => {
              return (
                <Skeleton
                  key={item}
                  row={4} 
                  avatarShape='square' 
                  avatar
                  avatarSize={150} 
                  rowHeight={[35,28,28,28]} 
                  rowWidth={['40%','100%','100%','100%']}
                  loading={data.length == 0}
                >
                </Skeleton>
              )
            })
          }
          {/* 列表渲染 */}
          { data.map((item)=>{
              return (<ProCard
                product={item}
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
      {/* 侧边筛选栏 */}
      {/* { SideBarShow &&
        <SideBar onClose={setSideBarShow}></SideBar>
      } */}
    </View>
  )
}
export default Index;
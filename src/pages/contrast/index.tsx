import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {Text, View, ScrollView} from '@tarojs/components';
import Taro, { useRouter, getCurrentInstance } from '@tarojs/taro';
import { AtDrawer, AtSearchBar, AtDivider, AtButton, AtCurtain } from 'taro-ui';

import { PremiumMap, RulesMap, productSettingsMap, productReviewMap } from './config/index';
import SectionCard from '@/components/SectionCard/index';
import FlexTable from '@/components/FlexTable/index'
import AddConPro from './components/AddConPro/index';
import PremiumTable from './components/PremiumTable/index';
import NavBar from "@/components/NavBar/index";
import Footer from '@/components/Footer/index'
import './index.scss';


//保险类型
const PRO_TYPE = {
  1: "重疾险",
  2: "寿险",
  3: "医疗险",
  4: "意外险",
  5: "年金险",
  6: "防癌险",
};

const hot_compare_style = {
  1: {background: '#40A9FF'},
  2: {background: '#FFA940'},
  3: {background: '#36CFC9'},
  4: {background: '#B37FEB'},
  6: {background: '#F759AB'},
}

const Contrast = function (props) {
  const currentHeight =
  document.documentElement.clientHeight || document.body.clientHeight;
  const scrollStyle = {
  height: `calc(${currentHeight}px - 90px)`,
  };

  const dispatch = useDispatch();
  const params = useRouter().params;
  const { compare_list, compare_type, hot_compare, product_type_list, count } = useSelector( state => state.contrast);
  //侧边栏状态
  const [sideShow, setSideShow] = useState(false);
  //侧边栏滚动条位置
  const [scrollTop, setScrollTop] = useState(0);
  //搜索关键词
  const [searchKey, setSearchKey] = useState('');
  //NavBar标题
  const [navTitle, setNavTitle] = useState(compare_type==''?'产品对比':PRO_TYPE[compare_type]+'对比');
  const [proCount, setProCount] = useState(0);
  //对比产品列表id状态
  const [prodList, setProList] = useState([]);
  //侧边栏产品列表
  const [sideList, setSideList] = useState([]);
  //控制搜索产品时触底不触发加载
  const [searchFlag, setSearchFlag] = useState(false);

  useEffect(()=>{
    if(prodList.length===0){
      return;
    }
    dispatch({
      type: 'contrast/getCompareInfo',
      payload: {
        prod_list: prodList
      }
    })
    if (window.scrollTo) {
      window.scrollTo(0,0);
    }
  },[prodList])

  useEffect(() => {
    if(product_type_list.length > 0) {
      let List = product_type_list;
      //当产品数量超过100时，截取前100项，防止render时间过长，后面项的通过滚动加载
      if(product_type_list.length > 100) {
        List = product_type_list.slice(0, 100);
      }
      setSideList(List);
      setProCount(product_type_list.length);
    }
  }, [product_type_list])

  useEffect(() => {
    if(compare_type == ''){
      dispatch({
        type: 'contrast/filterByType',
        payload: {
          type: ''
        }
      })
    }
    if(compare_type != ''){
      //改变NavBar标题
      setNavTitle(PRO_TYPE[compare_type]+'对比');
      //获取险种类型列表
      dispatch({
        type: 'contrast/filterByType',
        payload: {
          type: compare_type
        }
      })
    }
    else{
      setNavTitle('产品对比');
    }
  },[compare_type])

  useEffect(() => {
    //初始化时获取热门对比列表
    dispatch({
      type: 'contrast/getHotCompare',
      payload: {}
    })

    //初始化时将路由参数ids转换为数组
    let initIdList = params.ids?.split('-') || [];
    if(initIdList[0]===''){
      initIdList = [];
    }
    setProList(initIdList);

    //跳转至其他页面时，清空对比列表
    return () => {
      let path = getCurrentInstance().router?.path;
      if(!path?.includes('contrast/index')) {
        dispatch({
          type: 'contrast/clearCompare'
        })
      }
    }
  }, [])

  //搜索产品
  const onkeydown = () => {
    setScrollTop(Math.random());
    if(searchKey == '') {
      let List = product_type_list;
      //当产品数量超过100时，截取前100项，防止render时间过长，后面项的通过滚动加载
      if(product_type_list.length > 100) {
        List = product_type_list.slice(0, 100);
      }
      setSideList(List);
      setProCount(product_type_list.length);
      return;
    }
    const List = product_type_list.filter((item) => {
      return item.productName.includes(searchKey);
    })
    setSideList(List);
    setProCount(List.length);
  }
  //打开侧边栏
  const openSiedBar = () => {
    setSideShow(true);
  }
  //侧边栏滚动触底
  const onScrollToLower = () => {
    if(sideList.length < proCount) {
      Taro.showLoading({
        title: '加载数据中',
        mask: true,
      });

      let index = sideList.length + 100 > proCount ? proCount : sideList.length + 100;
      const List = product_type_list.slice(0, index);
      setSideList(List);

      setTimeout(()=>{
        Taro.hideLoading();
      },500)
    }
  }

  //添加热门对比
  const addHotCompare = (arr) => {
    const ids = arr[0].id + '-' + arr[1].id;
    Taro.redirectTo({
      url: `/pages/contrast/index?ids=${ids}`
    })
  }
  //分享给客户(非原生小程序只能通过引导提示用户点击右上角进行分享)
  const shareContrast = () => {

  }
  //返回
  const back = () => {
    Taro.navigateBack();
  }
  //添加对比项
  const add = (id) => {
    let idsList = params.ids?.split('-');
    //ids无参数时，剔除split分解出的空字符串项
    if(params.ids===''){
      idsList = [];
    }
    idsList.push(id);
    Taro.redirectTo({
      url: `/pages/contrast/index?ids=${idsList?.join('-')}`
    })
  }
  //删除对比项
  const del = (id) => {
    const idsList = params.ids?.split('-');
    idsList.splice(idsList.indexOf(id), 1);
    if(idsList?.length == 0){
      dispatch({
        type: 'contrast/clearCompare'
      })
    }
    Taro.redirectTo({
      url: `/pages/contrast/index?ids=${idsList?.join('-')}`
    })
  }

  //格式化传入FlexTable的数据
  const formatContent = (_compare_list, key, index=-1) => {
    //对比列表为空，返回
    if(_compare_list.length == 0) return;
    //表行数
    let tableLength;
    if(index == -1){
      tableLength = _compare_list[0][key].length;
    }
    else{
      //tableLength = _compare_list[0][key][index].length
      tableLength = productSettingsMap[compare_type][index].TitleList.length;
    }
    //中间转换数组
    let tempList = [];
    //传入FlexTable的参数数组 格式为 [[第一行数据1，第一行数据2],[第二行数据1，第二行数据2]]
    let contentList = [];
    for(let i=0; i<tableLength; i++){
      contentList[i] = [];
    }

    for(let compare_item of _compare_list){
      if(index == -1){
        tempList.push(compare_item[key]);
      }
      else{
        tempList.push(compare_item[key][index]);
      }
    }
    for(let i=0; i<tableLength; i++ ){
      for(let j=0; j<tempList.length; j++) {
        contentList[i].push(tempList[j][i]);
      }
    }
    return contentList;
  }
  //谱蓝君点评数据格式化
  function formatContentComment () {
    let tableLength = 5;
    //中间转换数组
    let tempList = [];
    //传入FlexTable的参数数组 格式为 [[第一行数据1，第一行数据2],[第二行数据1，第二行数据2]]
    let contentList = [];
    for(let i=0; i<tableLength; i++){
      contentList[i] = [];
    }
    for(let compare_item of compare_list){
      tempList.push([
        compare_item.productReview.goodPointList,
        compare_item.productReview.deficiencyList,
        compare_item.productReview.precautions,
        compare_item.productReview.scopePerson,
        compare_item.productReview.integrateReviewList,
      ]);
    }
    for(let i=0; i<tableLength; i++ ){
      for(let j=0; j<tempList.length; j++) {
        contentList[i].push(tempList[j][i]);
      }
    }
    return contentList;
  }
  return (
    <View className="contrast-container">
      <NavBar title={navTitle}></NavBar>
      {/* 产品对比 */}
      <View className="contrast-header-box">
        <View className="flex-box">
          <AddConPro data={compare_list[0]} openSiedBar={openSiedBar} del={del}></AddConPro>
          <AddConPro data={compare_list[1]} openSiedBar={openSiedBar} del={del}></AddConPro>
          <AddConPro data={compare_list[2]} openSiedBar={openSiedBar} del={del}></AddConPro>
        </View>
      </View>

      {/* 产品对比内容 */}
      {compare_list.length > 0 && compare_type.length !=0 &&
        <View className="contrast-content-box">
          <SectionCard title="保费测算" padding={true}>
            <PremiumTable key={compare_list.length} compareList={compare_list} insType={compare_type} titleList={PremiumMap[compare_type]} contentList={formatContent(compare_list,'compareQuotaCalc')}></PremiumTable>
          </SectionCard>

          <SectionCard title="投保规则" padding={true}>
            <FlexTable titleList={RulesMap[compare_type]} contentList={formatContent(compare_list,'rules')}></FlexTable>
          </SectionCard>

          {
            productSettingsMap[compare_type].map((item, index) => {
              return (
                <SectionCard title={item.name} padding={true} key={item.name}>
                  <FlexTable titleList={item.TitleList} contentList={formatContent(compare_list,'productSettings',index)}></FlexTable>
                </SectionCard>
              )
            })
          }
          <SectionCard title="谱蓝君点评" padding={true}>
            <FlexTable
              titleList={productReviewMap}
              contentList={formatContentComment()}
              isVerticalCenter={true}
            >
            </FlexTable>
          </SectionCard>

          <Footer text="*以上内容仅供参考，产品详情信息以产品条款约定内容为准"></Footer>
        </View>
      }

      {/* 对比产品选择侧边栏 */}
      <View className="contrast-sidebar-box">
        <AtDrawer
          show={sideShow} 
          mask 
          right
          width="75%"
          onClose={()=>{setSideShow(false)}}
          className="contrast-sidebar"
        >
          <View className="close" onClick={()=>{setSideShow(false)}}>
            <View className="at-icon at-icon-chevron-right"></View>
          </View>
          <AtSearchBar
            value={searchKey}
            placeholder="搜索产品"
            onChange={ (value)=>{setSearchKey(value)} }
            onConfirm={onkeydown}
          >
          </AtSearchBar>
          <View className="contrast-sidebar-desc">
              <Text className="pro-type">{ PRO_TYPE[compare_type] || '不限类型'}</Text>
            <Text className="pro-count">共<Text style="color: blue;">{ proCount }</Text>产品</Text>
          </View>
          <View className="contrast-sidebar-content">
            <ScrollView scrollY={true} style={scrollStyle} onScrollToLower={onScrollToLower} scrollTop={scrollTop}>
              {
                sideList.map((item) => {
                  return (
                    <View className="pro-item" hoverClass="item-hover" onClick={() => { add(item.id) }} key={item.id}>{item.productName}</View>
                  )
                })
              }
            </ScrollView>
          </View>
        </AtDrawer>
      </View>

      {/* 热门对比 */}
      {
        compare_list.length == 0 &&
        <View className="hot-compare-box">
          <AtDivider content="热门对比" fontColor='#333' lineColor='rgba(206, 206, 206, 0.5)'></AtDivider>
          <View>
            {Object.keys(hot_compare).length>0 &&
              Object.keys(hot_compare).map((key) => {
                return (
                  <View className="compare-li" key={key}>
                    <View className="compare-li-tag" style={hot_compare_style[key]}>{PRO_TYPE[key]}</View>
                    { 
                      hot_compare[key].map((item) => { 
                        return (
                          <View className="compare-li-pro" key={item.id}>{item.productName}</View>
                        )
                      })
                    }
                    <View className="compare-btn" onClick={() => {addHotCompare(hot_compare[key])}}>一键对比</View>
                  </View>
                )
              })
            }
          </View>
        </View>
      }

      <View className="fixed-btn">
        <AtButton size="small" type="secondary" className="btn-share" onClick={back}>返回</AtButton>
        <AtButton size="small" type="primary" className="btn-contrast" onClick={shareContrast} openType="share">分享给客户</AtButton>
      </View>
    </View>
  )
}

export default Contrast

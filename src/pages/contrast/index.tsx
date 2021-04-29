import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {Text, View} from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { AtDrawer, AtSearchBar, AtDivider, AtButton } from 'taro-ui';

import { PremiumMap, RulesMap, productSettingsMap, productReviewMap } from './config/index';
import SectionCard from '@/components/SectionCard/index';
import FlexTable from '@/components/FlexTable/index'
import AddConPro from './components/AddConPro/index';
import Footer from '@/components/Footer/index'
import './index.scss';

const Contrast = function (props) {
  const dispatch = useDispatch();
  const { compare_list, compare_type, hot_compare } = useSelector( state => state.contrast);
  //侧边栏状态
  const [sideShow, setSideShow] = useState(false);
  //搜索关键词
  const [key, setKey] = useState('');
  //对比产品列表状态
  const [prodList, setProList] = useState(['120011311563797401','120032416092256101']);


  useEffect(()=>{
    if(prodList.length===0){
      dispatch({
        type: 'contrast/setCompareList',
        payload: {
          compare_list: []
        }
      })
      return;
    }
    dispatch({
      type: 'contrast/getCompareInfo',
      payload: {
        prod_list: prodList
      }
    })
  },[prodList])

  useEffect(() => {
    dispatch({
      type: 'contrast/getHotCompare',
      payload: {}
    })
  }, [])

  //搜索产品
  const onkeydown = () => {

  }
  //打开侧边栏
  const openSiedBar = () => {
    setSideShow(true);
  }
  //添加热门对比
  const addHotCompare = (arr) => {
    const temp = [];
    temp.push(arr[0].id, arr[1].id);
    setProList([arr[0].id, arr[1].id]);
  }
  //分享给客户
  const shareContrast = () => {

  }
  //返回
  const back = () => {

  }
  //删除对比项
  const del = (id) => {
    console.log(id);
    prodList.splice(prodList.indexOf(id), 1);
    setProList([...prodList]);
    // setProList(prodList);
  }

  //格式化传入FlexTable的数据
  const formatContent = (_compare_list, key, index=-1) => {
    //对比列表为空，返回
    if(_compare_list.length == 0) return;
    //表行数
    let tableLength;
    if(index == -1){
      tableLength = compare_list[0][key].length
    }
    else{
      tableLength = compare_list[0][key][index].length
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

      {/* 产品对比 */}
      <View className="contrast-header-box">
        <View className="flex-box">
          <AddConPro data={compare_list[0]} openSiedBar={openSiedBar} del={del}></AddConPro>
          <AddConPro data={compare_list[1]} openSiedBar={openSiedBar} del={del}></AddConPro>
          <AddConPro data={compare_list[2]} openSiedBar={openSiedBar} del={del}></AddConPro>
        </View>
      </View>

      {/* 产品对比内容 */}
      {compare_list.length > 0 &&
        <View className="contrast-content-box">
          <SectionCard title="保费测算" padding={true}>
            <FlexTable titleList={PremiumMap[compare_type]} contentList={formatContent(compare_list,'compareQuotaCalc')}></FlexTable>
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
          <AtSearchBar
            value={key}
            placeholder="搜索产品"
            onChange={ (value)=>{setKey(value)} }
            onConfirm={onkeydown}
          >
          </AtSearchBar>
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
        <AtButton size="small" type="primary" className="btn-contrast" onClick={shareContrast}>分享给客户</AtButton>
      </View>
    </View>
  )
}

export default Contrast

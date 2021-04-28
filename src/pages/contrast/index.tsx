import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {Text, View} from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { AtDrawer, AtSearchBar, AtDivider } from 'taro-ui';

import { PremiumMap, RulesMap, productSettingsMap } from './config/index';
import SectionCard from '@/components/SectionCard/index';
import FlexTable from '@/components/FlexTable/index'
import AddConPro from './components/AddConPro/index';
import './index.scss';

const Contrast = function (props) {
  const dispatch = useDispatch();
  const { compare_list, compare_type, hot_compare } = useSelector( state => state.contrast);
  //侧边栏状态
  const [sideShow, setSideShow] = useState(false);
  //搜索关键词
  const [key, setKey] = useState('');

  useEffect(()=>{
    dispatch({
      type: 'contrast/getCompareInfo',
      payload: {
        prod_list: ['120011311563797401','120032416092256101']
      }
    })
    dispatch({
      type: 'contrast/getHotCompare',
      payload: {}
    })
  },[])

  const onkeydown = () => {

  }
  const openSiedBar = () => {
    setSideShow(true);
  }
  return (
    <View className="contrast-container">

      {/* 产品对比 */}
      <View className="contrast-header-box">
        <View className="flex-box">
          <AddConPro data={{}} openSiedBar={openSiedBar}></AddConPro>
          <AddConPro data={{}} openSiedBar={openSiedBar}></AddConPro>
          <AddConPro data={{}} openSiedBar={openSiedBar}></AddConPro>
        </View>
      </View>

      {/* 产品对比内容 */}
      <View className="contrast-content-box">
        <SectionCard title="保费测算" padding={true}>

        </SectionCard>
        <SectionCard title="投保规则" padding={true}>

        </SectionCard>

        {compare_list.length > 0 &&
          productSettingsMap[compare_type].map((item, index) => {
            return (
              <SectionCard title={item.name} padding={true} key={item.name}>
                <FlexTable titleList={item.TitleList} contentList={compare_list[0].productSettings[index]}></FlexTable>
              </SectionCard>
            )
          })
        }
        <SectionCard title="谱蓝君点评">

        </SectionCard>
      </View>

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
                  <View className="compare-btn">一键对比</View>
                </View>
              )
            })
          }
        </View>
      </View>
    </View>
  )
}

export default Contrast

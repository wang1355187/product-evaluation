import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux'
import {Text, View} from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { AtDrawer, AtSearchBar } from 'taro-ui'

import AddConPro from './components/AddConPro/index'
import './index.scss'

const Contrast = function (props) {
  const dispatch = useDispatch();

  //侧边栏状态
  const [sideShow, setSideShow] = useState(true);
  //搜索关键词
  const [key, setKey] = useState('');

  useEffect(()=>{
    dispatch({
      type: 'contrast/getCompareInfo',
      payload: {
        prod_list: ['120011311563797401','120032416092256101']
      }
    })
  },[])

  const onkeydown = () => {

  }
  return (
    <View className="contrast-container">

      {/* 产品选择 */}
      <View className="contrast-header-box">
        <View className="flex-box">
          <AddConPro data={{}}></AddConPro>
          <AddConPro data={{}}></AddConPro>
          <AddConPro data={{}}></AddConPro>
        </View>
      </View>

      {/* 对比模块 */}
      <View className="contrast-content">
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
    </View>
  )
}

export default Contrast

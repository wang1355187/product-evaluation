import React from "react";
import { View } from '@tarojs/components';

import './index.scss'

//通用遮罩层
export default function (props){
  //阻止默认滚动行为
  function handleTochMove (e) {
    //e.preventDefault();
    e.stopPropagation();
  }
  return (
    <View className="cover-container" onTouchMove={ handleTochMove }>
      {props.children}
    </View>
  )
}
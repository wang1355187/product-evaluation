import React from "react";
import { View } from '@tarojs/components';
import './index.scss'


export default function (props){
  const { text, toList } = props;
  return (
    <View className="footer">
      <View>{text}</View>
      {
        toList &&
        <View className="toLast">—— 到底了 ——</View>
      }
  </View>
  )
}
import React from "react";
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import wLogo from '@/assets/images/common/w-logo.png';

import './index.scss'


export default function (){

  return (
    <View className='u-footer'>
      <Image className='u-footer-img' src={wLogo}></Image>
      <View className='u-footer-desc'>谱写财富蓝图</View>
      <View className='u-footer-copyright'>Made with ♥ by PlanPro Dev Team</View>
   </View>
  )
}
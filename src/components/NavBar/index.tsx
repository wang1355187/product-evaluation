import React from "react";
import { View, Image, Text } from '@tarojs/components';
import logo from '@/assets/images/common/logo.png';
import './index.scss'

export default function () {
  return (
    <View className="navbar-container">
      <View className="u-navbar">
        <View className='at-icon at-icon-chevron-left'></View>
        <View className='u-navbar-img'>
          <Image className='u-navbar-img-logo' src={logo}></Image>
        </View>
      </View>
    </View>
  )
}
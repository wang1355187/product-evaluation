import React from "react";
import { View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import logo from '@/assets/images/common/logo.png';
import './index.scss'

export default function () {
  function back () {
    Taro.navigateBack();
  }
  function toHome () {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
  return (
    <View className="navbar-container">
      <View className="u-navbar">
        <View className='at-icon at-icon-chevron-left' onClick={back}></View>
        <View className='u-navbar-img'>
          <Image className='u-navbar-img-logo' src={logo}></Image>
        </View>
        <View className='at-icon at-icon-home' onClick={toHome}></View>
      </View>
    </View>
  )
}
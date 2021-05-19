import React,{ useEffect,useState } from "react";
import { View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import logo from '@/assets/images/common/logo.png';
import './index.scss'

export default function (props) {
  const { justLogo, title } = props;
  const [navTitle, setNavTitle] = useState(title);
  useEffect(() => {
    if(navTitle==title) return;
    setNavTitle(title);
  }, [title])
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
      <View className="u-navbar" style={justLogo?{justifyContent:'center'}:''}>
        {!justLogo &&
          <View className='at-icon at-icon-chevron-left' onClick={back}></View>
        }
        <View className='u-navbar-img'>
          {navTitle ?
            <View className="u-navbar-title">{navTitle}</View>
            :
            <Image className='u-navbar-img-logo' src={logo}></Image>
          }
        </View>
        {!justLogo &&
          <View className='at-icon at-icon-home' onClick={toHome}></View>
        }
      </View>
    </View>
  )
}
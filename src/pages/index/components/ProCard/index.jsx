import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import React from 'react';
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { AtFloatLayout } from "taro-ui"

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

export default class ProCard extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //去往详情页面
  goToDetail = () => {
    const { router } =  getCurrentInstance();
    if(router.path.includes('detail/index')){
      return;
    }
    Taro.navigateTo({
      url: `/pages/detail/index?id=${this.props.product.id}`,
    });
  }

  render () {
    return (
      <View className="card-container" onClick={this.goToDetail}>
        <View className="pro-img-box">
          <View className="pro-img-tag">{this.props.product.companyName}</View>
          <Image src={this.props.product.icon}  className="pro-img"></Image>
        </View>
        <View className="content-box">
          <View className="row-1">
            <View className="pro-name">
              {this.props.product.insType===1 && 
              (this.props.product.is_redefined
                ?<Text className="new">新定义</Text>
                :<Text className="old">旧定义</Text>)
              }
              <Text className="title">{this.props.product.productName}</Text>
            </View>
            <View className="pro-type">
              <Text>{PRO_TYPE[this.props.product.insType]}</Text>
            </View>
          </View>
          <View className="row-2">
            <View className="pro-desc">
              {
                this.props.product.keyword.split(',').map((item) => {
                  if(item.length==0) return;
                  return (
                    <Text className="pro-desc-item" key={item}>{item}</Text>
                  )
                })
              }
            </View>
          </View>
          <View className="row-3">
            <View className="pro-condition">
              <View className="pro-condition-item">
                <View className="pro-condition-item-content">0-50周岁</View>
                <View className="pro-condition-item-title">投保年龄</View>
              </View>
              <View className="pro-condition-item">
                <View className="pro-condition-item-content">0-6类</View>
                <View className="pro-condition-item-title">职业要求</View>
              </View>
              <View className="pro-condition-item">
                <View className="pro-condition-item-content">1次/不分组</View>
                <View className="pro-condition-item-title">重疾赔付</View>
                {/* 投保须知底部弹出框打开按钮 */}
                {this.props.isModal &&
                  (<View className="iconfont icon-xiangyou" onClick={this.props.showModal}></View>)
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
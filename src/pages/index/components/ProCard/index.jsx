import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import React from 'react';
import { AtIcon } from 'taro-ui';

import { common } from "@/assets/images";
import './index.scss';

export default class ProCard extends Component {

  componentWillMount () { }

  componentDidMount () { 
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //去往详情页面
  goToDetail (id) {

  }
  render () {
    return (
      <View className="card-container">
        <View className="pro-img-box">
          <View className="pro-img-tag">平安健康</View>
          <Image src={common.product}  className="pro-img"></Image>
        </View>
        <View className="content-box">
          <View className="row-1">
            <View className="pro-name">
              {this.props.isNew
                ?<Text className="new">新定义</Text>
                :<Text className="old">旧定义</Text>
              }
              <Text className="title">{this.props.productName}</Text>
            </View>
            <View className="pro-type">
              <Text>{this.props.insType}</Text>
            </View>
          </View>
          <View className="row-2">
            <View className="pro-desc">
              <Text className="pro-desc-item">夫妻独立保额</Text>
              <Text className="pro-desc-item">最高赔4倍</Text>
              <Text className="pro-desc-item">保额被保人豁免</Text>
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
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
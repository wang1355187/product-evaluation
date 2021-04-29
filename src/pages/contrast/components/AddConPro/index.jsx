import React from "react";
import { View, Text } from "@tarojs/components";
import Taro from '@tarojs/taro';

// 引入静态资源
import "./index.scss";

const AddConPro = (props) => {
  const { data, canDelete, add, see, del, openSiedBar} = props;
  const toDetail = () => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${data.product.id}`
    })
  }
  return (
    <View className='addConpPro-container'>
      {data === undefined ?
        <View className="noData" onClick={openSiedBar}>
          <View onClick={add} className="icon-box">
            <View className="at-icon at-icon-add-circle"></View>
          </View>
          <Text className="text">添加产品</Text>
        </View>
        :
        <View className="hasData">
          <View className="product-name">{data.product.productName}</View>
          <View className="company-name">{data.insCompany.name}</View>
          <View className="detail-btn" onClick={toDetail}>查看详情</View>
          <View className='at-icon at-icon-close' onClick={() => {del(data.product.id)}}></View>
        </View>
      }
    </View>
  )
}
export default AddConPro;
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

//投保须知
const productPatch = {
  //重疾险
  '1': {
    key: 'productSiPatch',
    notice: {
      insuredAge: '投保年龄',
      insuredJobType: '职业要求',
      seriousPay: ''  //重疾赔付涉及reparationTimes和groups两个字段，需独立渲染
    }
  },
  //寿险
  '2': {
    key: 'productLifePatch',
    notice: {
      insuredAge: '投保年龄',
      insuredJobType: '职业要求',
      maxQuota: '最高保额'
    }
  },
  //医疗险
  '3': {
    key: 'productMedicalPatch',
    notice: {
      insuredAge: '投保年龄',
      baseHospitalizationQuota: '一般住院保额',
      hospitalDeductible: '一般免赔额'
    }
  },
  //意外险
  '4': {
    key: 'productAccidentPatch',
    notice: {
      insuredAge: '投保年龄',
      insuredJobType: '职业要求',
      reimbursementRange: '报销范围'
    }
  },
  //年金险
  '5': {},
  //防癌险
  '6': {
    key: 'productAcPatch',
    notice: {
      insuredAge: '投保年龄',
      cancerInsurance: '癌症保额',
      cancerInSituCoverage: '原位癌保额'
    }
  }
}
/* 

  productPatch[this.props.product.insType].notice.map()
*/
const ProCard = (props) => {

  const {
    id,
    companyName,
    icon,
    insType,
    productName,
    keyword,
    productDefinitionVersion
  } = props.product;
  const goToDetail = () => {
    const { router } =  getCurrentInstance();
    if(router.path.includes('detail/index')){
      return;
    }
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    });
  }
  return (
    <View className="card-container" onClick={goToDetail}>
      <View className="pro-img-box">
        <View className="pro-img-tag">{companyName}</View>
        <Image src={icon}  className="pro-img"></Image>
      </View>
      <View className="content-box">
        <View className="row-1">
          <View className="pro-name">
            {insType==1 && 
              (productDefinitionVersion == 'NEW'
              ?<Text className="new">新定义</Text>
              :<Text className="old">旧定义</Text>)
            }
            <Text className="title">{productName}</Text>
          </View>
          <View className="pro-type">
            <Text>{PRO_TYPE[insType]}</Text>
          </View>
        </View>
        <View className="row-2">
          <View className="pro-desc">
            {
              keyword.split(',').map((item) => {
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
          {
            Object.keys(productPatch[insType].notice).map((item, index) => {
              if(item == 'seriousPay'){
                return (
                  <View className="pro-condition-item" key={item}>
                    <View className="pro-condition-item-content">
                      {props.product.productSiPatch.reparationTimes || '无'}/
                      {props.product.productSiPatch.groups || '无'}
                    </View>
                    <View className="pro-condition-item-title">重疾赔付</View>
                    {props.isModal &&
                      <View className="iconfont icon-xiangyou" onClick={props.showModal}></View>
                    }
                  </View>
                )
              }
              return (
                <View className="pro-condition-item" key={item}>
                  <View className="pro-condition-item-content">{props.product[productPatch[insType].key][item] || '无'}</View>
                  <View className="pro-condition-item-title">{productPatch[insType].notice[item]}</View>
                  {props.isModal && index ==2 &&
                    <View className="iconfont icon-xiangyou" onClick={props.showModal}></View>
                  }
                </View>
              )
            })
          }
            {/* <View className="pro-condition-item">
              <View className="pro-condition-item-content">0-50周岁</View>
              <View className="pro-condition-item-title">投保年龄</View>
            </View>
            <View className="pro-condition-item">
              <View className="pro-condition-item-content">0-6类</View>
              <View className="pro-condition-item-title">职业要求</View>
            </View>
            <View className="pro-condition-item">
              <View className="pro-condition-item-content">1次/不分组</View>
              <View className="pro-condition-item-title">重疾赔付</View> */}
              {/* 投保须知底部弹出框打开按钮 */}
              {/* {props.isModal &&
                (<View className="iconfont icon-xiangyou" onClick={props.showModal}></View>)
              }
            </View> */}
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProCard;
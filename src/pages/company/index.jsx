import React, { useState, useEffect, useCallback } from "react";
import {Text, View} from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro'

import {getCompanyProduct, getCompanyDetail} from './service'
import SectionCard from '@/components/SectionCard/index'
import ProCard from '@/components/ProCard'
import './index.scss'

const Company = (props) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    full_name: '',
    hot_line: '',
    website: '',
    solvency_ratio: {},
    core_ratio: {},
    level: {},
    status: ''
  });
  const [companyProduct, setCompanyProduct] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const { params } = useRouter();

  useEffect(() => {
    inintData();
  }, [inintData, params])

  const basicInfoMap = [
    {title: '所属集团：' , key: 'group'},
    {title: '注册时间：' , key: 'register_time'},
    {title: '注册资本：' , key: 'capital'},
    {title: '资本性质：' , key: 'capital_type'},
    {title: '主要股东：' , key: 'share_holder'},
    {title: '总部：' , key: 'headquarter'},
    {title: '分支机构：' , key: 'branch'},
  ]

  //初始化公司详情数据
  const inintData = useCallback(() => {
    //获取公司详情数据
    getCompanyDetail(params.id).then((res) => {
      if(res.isSuccess){
        const data = res.data.data;
        setCompanyData(data);
      }
    })
    //获取公司相关产品
    getCompanyProduct({
      corp_id: params.id,
      lek: {}
    }).then((res)=>{
      if(res.data.code==0){
        const data = res.data.data;
        setCompanyProduct(data);
        console.log(data);
      }
    })
  },[])

  return (
    <View className="company-container">
      <View className="company-desc">
        <View className="company-desc-name">{companyData.name}</View>
        <View>{companyData.full_name}</View>
        <View>理赔电话：{companyData.hot_line}</View>
        <View className="company-desc-website">官网：<a href={companyData.website} target="_blank">{companyData.website}</a></View>
        <View className="company-desc-ratio">
          <View>综合偿付能力充足率：{companyData.solvency_ratio.ratio}（{companyData.solvency_ratio.time}）</View>
          <View>核心偿付能力充足率：{companyData.core_ratio.ratio}（{companyData.core_ratio.time}）</View>
          <View>风险综合评级：{companyData.level.level}（{companyData.level.time}）</View>
        </View>
      </View>

      <View className="company-basic-info">
        <View className="company-tab">
          <View className={"company-tab-info"+(tabIndex===0?" active":"")} onClick={() => {setTabIndex(0)}}>公司信息</View>
          <View className={"company-tab-pro "+(tabIndex===1?" active":"")} onClick={() => {setTabIndex(1)}}>相关产品</View>
        </View>

        {/* 公司信息 */}
        {tabIndex===0 &&
          <View className="info-content">
            <SectionCard title="基本信息">
              {
                basicInfoMap.map((item) => {
                  return (
                    <View className="flex-box" key={item.key}>
                      <Text className="info-content-title">{item.title}</Text>
                      <Text className="info-content-value">{companyData[item.key]}</Text>
                    </View>
                  )
                })
              }
            </SectionCard>
            <SectionCard title="经营状况">
              <View className="company-manage">
                <Text className="info-content-title">{companyData.status.split(':')[0]}：</Text>
                <Text className="info-content-value">{companyData.status.split(':')[1]}</Text>
              </View>
            </SectionCard>
          </View>
        }

        {/* 公司相关产品 */}
        {tabIndex===1 &&
          <View className="relate-product">
            <View className="relate-product-box">
              {
                companyProduct.items.map((item) => {
                  return (
                    <ProCard product={item} key={item.id}></ProCard>
                  )
                })
              }
            </View>
          </View>
        }
      </View>

      <View className="footer">
        {tabIndex===0 &&
         <View>*数据更新时间{companyData.update_time}，以上信息根据公开资料整理，仅供参考</View>
        }
        <View className="toLast">—— 到底了 ——</View>
      </View>
    </View>
  )
}

export default Company
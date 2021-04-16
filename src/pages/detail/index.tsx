import React from "react";
import Taro, { getCurrentInstance } from '@tarojs/taro'
import ProCard from '../index/components/ProCard'
import {Text, View} from '@tarojs/components';
import request from '@/services/index';
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'
import SectionCard from "@/components/SectionCard";
import Count from "./components/Count"
import './index.scss';

export interface IState {
  detailData: any,
  current: number,
  isModalShow: boolean
}

//保险类型
const PRO_TYPE = {
  1: "重疾险",
  2: "寿险",
  3: "医疗险",
  4: "意外险",
  5: "年金险",
  6: "防癌险",
};

export default class extends React.Component<IState, any> {
  
  state = {
    detailData: {} as any,
    current: 0,
    isModalShow: false
  }
  componentDidMount () {
    if (window.scrollTo) {
      window.scrollTo(0,0);
    }
    const params =  getCurrentInstance().router.params;
    this.getData(params.id);
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  //获取产品详情数据
  getData = async (id: string)=>{
    const {data, isSuccess} = await request.get({
      url: `/product/info/${id}`,
      isLoading: true
    })
    if(isSuccess){
      this.setState({
        detailData:data.data
      });
    }
  }

  //切换保障内容的Tab
  changeTab = (value) => {
    this.setState({
      current: value
    })
  }

  //控制投保须知底部弹出层
  showModal = () => {
    this.setState({
      isModalShow: true
    })   
  }
  closeModal = () => {
    this.setState({
      isModalShow: false
    })
  }

  render () {
    const tabList = [{ title: '保什么' }, { title: '不保什么' }, { title: '病种' },{ title: '投保规则' }]
    return (
      <View className="detail-container">
        {/* 产品信息卡片 */}
        <ProCard
          isNew={true}
          productName={this.state.detailData.productName}
          insType={PRO_TYPE[this.state.detailData.insType]}
          isModal={true}
          showModal={this.showModal}
        >
        </ProCard>

        {/* 投保须知底部弹出层 */}
        <AtFloatLayout
          title="投保须知"
          isOpened={this.state.isModalShow}
          onClose={this.closeModal}
          className="modal"
        >
            <View>投保须知</View>
        </AtFloatLayout>

        {/* 保障内容模块 */}
        <SectionCard title="保障内容">
          <AtTabs tabList={tabList} current={this.state.current} onClick={this.changeTab}>
            {/* 保什么 */}
            <AtTabsPane current={this.state.current} index={0}>1</AtTabsPane>
            {/* 不保什么 */}
            <AtTabsPane current={this.state.current} index={1}>2</AtTabsPane>
            {/* 病种 */}
            <AtTabsPane current={this.state.current} index={2}>3</AtTabsPane>
            {/* 投保规则 */}
            <AtTabsPane current={this.state.current} index={3}>4</AtTabsPane>
          </AtTabs>
        </SectionCard>

        {/* 保费测算模块 */}
        <SectionCard title="保费测算">
          <Count detailData={this.state.detailData}></Count>        
        </SectionCard>

        {/* 谱蓝君点评模块 */}
        <SectionCard title="谱蓝君点评">

        </SectionCard>        

        {/* 保险条款模块 */}
        <SectionCard title="保险条款">

        </SectionCard> 

        {/* 保险公司模块 */}
        <SectionCard title="保险公司">

        </SectionCard> 

        {/* 同类产品模块 */}
        <SectionCard title="同类产品">

        </SectionCard> 
      </View>
    )
  }
}
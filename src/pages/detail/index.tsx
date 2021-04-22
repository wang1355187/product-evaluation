import React from "react";
import Taro, { getCurrentInstance, connectSocket } from '@tarojs/taro'
import ProCard from '../index/components/ProCard'
import {Text, View} from '@tarojs/components';
import { connect } from "react-redux";
import { AtTabs, AtTabsPane, AtFloatLayout, AtButton } from 'taro-ui'
import SectionCard from "@/components/SectionCard";
import Comment from "./components/comment/index"
import Premium from "./components/Premium/index"
import TabPanel from './components/TabPanel/index'
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


class Detail extends React.Component {
  
  state = {
    detailData: {} as any,
    current: 0,
    isModalShow: false,
    isLoading: true
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
    Taro.request({
      method: 'GET',
      url: `/api/product?id=${id}`,
      header: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      const data = res.data;
      if(data.code===0){
        this.setState({
          detailData: data.data
        });
        this.setState({
          isLoading: false
        })
        this.props.setProductDetail({
          product_detail: this.state.detailData
        })
      }
    })
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
    const tabList = {
      1:[{ title: '保什么', type: 'covers'}, { title: '不保什么', type: 'excludes'}, { title: '病种', type:'diseases'},{ title: '投保规则', type:'diseases'}],
      2:[{ title: '保什么', type: 'covers' }, { title: '不保什么', type: 'excludes' }, { title: '投保规则', type:'diseases' }],
      3:[{ title: '保什么' }, { title: '不保什么' }, { title: '投保规则' }],
      4:[{ title: '保什么' }, { title: '不保什么' }, { title: '投保规则' }],
      5:[{ title: '保什么' }, { title: '不保什么' }],
      6:[{ title: '保什么' }, { title: '不保什么' }, { title: '病种' },{ title: '投保规则' }]
    }
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
          {!this.state.isLoading &&
          <View className="modal-content">
            <View>
              <View className="tag-age">{this.state.detailData.productSiPatch.insuredAge}</View>
              <View>投保年龄</View>
            </View>
            <View>
              <View className="tag-require">{this.state.detailData.productSiPatch.insuredJobType}</View>
              <View>职业要求</View>
            </View>
            <View>
              <View className="tag-pay">{this.state.detailData.productSiPatch.reparationTimes}/{this.state.detailData.productSiPatch.groups}</View>
              <View>重疾赔付</View>
            </View>
          </View>}
        </AtFloatLayout>

        {/* 保障内容模块 */}
        <SectionCard title="保障内容">
          {!this.state.isLoading &&
            <AtTabs tabList={tabList[this.state.detailData.insType]} current={this.state.current} onClick={this.changeTab}>
              {
                tabList[this.state.detailData.insType].map((item,index) => {
                  return  (
                    <AtTabsPane current={this.state.current} index={index} key={item.title}>
                      <TabPanel data={this.state.detailData[item.type]} type={item.type} details={this.state.detailData.details}></TabPanel>
                    </AtTabsPane>
                  )
                })
              }
            </AtTabs>             
          }
        </SectionCard>

        {/* 保费测算模块 */}
        <SectionCard title="保费测算">
          {!this.state.isLoading &&
            <Premium detailData={this.state.detailData}></Premium>
          }  
        </SectionCard>

        {/* 谱蓝君点评模块 */}
        <SectionCard title="谱蓝君点评">
          {!this.state.isLoading &&
            <Comment detailData={this.state.detailData}></Comment>          
          }
        </SectionCard>        

        {/* 保险条款模块 */}
        <SectionCard title="保险条款">
          {!this.state.isLoading && this.state.detailData.policies.map((item) => {
            return (
              <View className="policies-box" key={item.key}>
                <Text className="policies-name">{item.key}</Text>
                <Text className="iconfont icon-youjiantou-copy"></Text>
              </View>  
            )
          })        
          }
        </SectionCard> 

        {/* 保险公司模块 */}
        <SectionCard title="保险公司" className="company-box">
          <View className="company-name">{this.state.detailData.companyName}</View>
          <View className="company-desc">
            <Text className="register-time">注册时间：</Text>
            <Text>总部：</Text>
          </View>
          <View className="company-phone">理赔电话：</View>
          <View className="more">
            <Text>查看更多</Text>
            <Text className="iconfont icon-xiangyou"></Text>
          </View>
        </SectionCard> 

        {/* 同类产品模块 */}
        <SectionCard title="同类产品">
          {!this.state.isLoading && this.state.detailData.similars.map((item) => {
            return (
              <View className="similar-pro" key={item.id}>
                <View className="pro-name">产品：{item.name}</View>
                <View  className="company-name">公司：{item.corp}</View>
                <View className="contrast-btn">一键对比</View>
              </View>
            )
          })
          }
        </SectionCard>

        <View className="fixed-btn">
          <AtButton size="small" type="secondary" className="btn-share">分享给客户</AtButton>
          <AtButton size="small" type="primary" className="btn-contrast">加入对比</AtButton>
        </View>
        <View className="footer">*以上内容仅供参考，产品详情信息以产品条款约定内容为准</View>
      </View>
    )
  }
}

const mapStateToProps = ({detail}) => ({
  detail
})
const mapDispatchToProps = {
  setProductDetail: (payload) => ({type: 'detail/setProductDetail',payload}),
  setCompanyDetail: (payload) => ({type: 'detail/setCompanyDetail',payload})
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail)
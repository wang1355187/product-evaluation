import React from "react";
import Taro, { getCurrentInstance, connectSocket } from '@tarojs/taro';
import ProCard from '../index/components/ProCard';
import {Text, View} from '@tarojs/components';
import { connect } from "react-redux";
import { AtTabs, AtTabsPane, AtFloatLayout, AtButton } from 'taro-ui';
import SectionCard from "@/components/SectionCard";
import Comment from "./components/comment/index";
import Premium from "./components/Premium/index";
import TabPanel from './components/TabPanel/index';
import './index.scss';

export interface IState {
  detailData: any,
  current: number,
  isModalShow: boolean,
  companyData: any,
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
//滚动节流定时器
let timer = null;

const mapStateToProps = ({detail}) => ({
  detail
})
const mapDispatchToProps = {
  setProductDetail: (payload) => ({type: 'detail/setProductDetail',payload}),
  setCompanyDetail: (payload) => ({type: 'detail/setCompanyDetail',payload}),
  getProductDetail: (payload) => ({type: 'detail/getProductDetail',payload}),
  getCompanyDetail: (payload) => ({type: 'detail/getCompanyDetail',payload}),
};

class Detail extends React.Component {
  

  state = {
    detailData: {} as any,
    current: 0,
    isModalShow: false,
    isLoading: true,
    companyData: {} as any,
    toTopBtn: false,
  }
  
  componentDidMount () {
    if (window.scrollTo) {
      window.scrollTo(0,0);
    }
    //页面初始化
    const params =  getCurrentInstance().router.params;
    this.props.getProductDetail({
      id:params.id
    }).then((res)=> {
      this.setState({
        isLoading: false,
        detailData: res
      })
      this.props.getCompanyDetail({id:res.companyId}).then((_res)=>{
        this.setState({
          isLoading: false,
          companyData: _res
        })
      })
    })
  }

  componentDidShow () {
    //监听页面滚动
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidHide () {
    //监听页面滚动
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidCatchError () {}

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

  //跳转公司详情页面
  toCompanyDetail = () => {
    Taro.navigateTo({
      url: `/pages/company/index?id=${this.state.detailData.companyId}`,
    })
  }
  
  //回到顶部
  toTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  //页面滚动
  handleScroll = () => {
    if(timer == null){
      timer = setTimeout(() => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > 100) {
          this.setState({
            toTopBtn: true
          })
        }
        else{
          this.setState({
            toTopBtn: false
          })
        }
        timer = null;
      }, 100)
    }
  }

  //滚动到对应模块
  scrollToTab = (str) => {
    console.log(str);
  }

  render () {
    const tabList = {
      1:[{ title: '保什么', type: 'covers'}, { title: '不保什么', type: 'excludes'}, { title: '病种', type:'diseases'},{ title: '投保规则',  type:'rules'}],
      2:[{ title: '保什么', type: 'covers' }, { title: '不保什么', type: 'excludes' }, { title: '投保规则',  type:'rules' }],
      3:[{ title: '保什么', type: 'covers'  }, { title: '不保什么', type: 'excludes' }, { title: '投保规则', type:'rules' }],
      4:[{ title: '保什么', type: 'covers'  }, { title: '不保什么', type: 'excludes' }, { title: '投保规则', type:'rules'  }],
      5:[{ title: '保什么', type: 'covers'  }, { title: '不保什么', type: 'excludes' }],
      6:[{ title: '保什么', type: 'covers'  }, { title: '不保什么', type: 'excludes' }, { title: '病种', type:'diseases' },{ title: '投保规则', type:'rules'  }]
    }
    return (
      <View className="detail-container">
        {/* 产品信息卡片 */}
        {!this.state.isLoading &&
          <ProCard
            product={this.state.detailData}
            isModal={true}
            showModal={this.showModal}
          >
          </ProCard>
        }

        {/* 投保须知底部弹出层 */}
        <AtFloatLayout
          title="投保须知"
          isOpened={this.state.isModalShow}
          onClose={this.closeModal}
          className="modal"
        >
          {!this.state.isLoading &&
          <View className="modal-content">
            {/* <View>
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
            </View> */}
          </View>}
        </AtFloatLayout>

        {/* 保障内容模块 */}
        <View ref="content">
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
        </View>

        {/* 保费测算模块 */}
        <View ref="premium">
          <SectionCard title="保费测算">
            {!this.state.isLoading &&
              <Premium detailData={this.state.detailData}></Premium>
            }  
          </SectionCard>
        </View>

        {/* 谱蓝君点评模块 */}
        <View ref="comment">
          <SectionCard title="谱蓝君点评">
            {!this.state.isLoading &&
              <Comment detailData={this.state.detailData}></Comment>          
            }
          </SectionCard>
        </View>      

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
            <Text>注册时间：{this.state.companyData.register_time}</Text>
            <Text>总部：{this.state.companyData.headquarter}</Text>
          </View>
          <View className="company-phone">理赔电话：{this.state.companyData.hot_line}</View>
          <View className="more" onClick={this.toCompanyDetail}>
            <Text>查看更多</Text>
            <Text className="iconfont icon-xiangyou"></Text>
          </View>
        </SectionCard>

        {/* 同类产品模块 */}
        <View ref="similar">
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
        </View>
        
        {this.state.toTopBtn &&
          <React.Fragment>
            <View className="toTop-btn" onClick={this.toTop}>回到顶部</View>
            <View className="fixed-tab">
              <View className="flex-box">
                <View className="tab" onClick={() => {this.refs.content.scrollIntoView()}}>保障内容</View>
                <View className="tab" onClick={() => {this.refs.premium.scrollIntoView()}}>保费测算</View>
                <View className="tab" onClick={() => {this.refs.comment.scrollIntoView()}}>谱蓝君点评</View>
                <View className="tab" onClick={() => {this.refs.similar.scrollIntoView()}}>同类产品</View>
              </View>
            </View>
          </React.Fragment>
        }

        <View className="fixed-btn">
          <AtButton size="small" type="secondary" className="btn-share">分享给客户</AtButton>
          <AtButton size="small" type="primary" className="btn-contrast">加入对比</AtButton>
        </View>
        <View className="footer">*以上内容仅供参考，产品详情信息以产品条款约定内容为准</View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
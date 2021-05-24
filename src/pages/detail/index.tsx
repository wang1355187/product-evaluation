import React from "react";
import Taro, { getCurrentInstance } from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import { connect } from "react-redux";
import { AtTabs, AtTabsPane, AtFloatLayout, AtButton, AtMessage } from 'taro-ui';

import ProCard from '@/components/ProCard/index';
import SectionCard from "@/components/SectionCard";
import Comment from "./components/comment/index";
import Premium from "./components/Premium/index";
import TabPanel from './components/TabPanel/index';
import NavBar from "@/components/NavBar/index";
import Skeleton from 'taro-skeleton'
import { ProductPatchMap } from './config/index'
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
//Section模块距离窗口顶部的距离
let sectionTop = [0,0,0,0];
//detail容器距离顶部的高度
let detailHeight = 0;
const mapStateToProps = ({detail}) => ({
  detail
})
const mapDispatchToProps = {
  setProductDetail: (payload) => ({type: 'detail/setProductDetail',payload}),
  setCompanyDetail: (payload) => ({type: 'detail/setCompanyDetail',payload}),
  getProductDetail: (payload) => ({type: 'detail/getProductDetail',payload}),
  getCompanyDetail: (payload) => ({type: 'detail/getCompanyDetail',payload}),
  getProductSimple: (payload) => ({type: 'detail/getProductSimple',payload}),
};

class Detail extends React.Component {
  

  state = {
    detailData: {} as any,  //产品详情数据
    similarData: [] as any,  //相似产品卡片用到的数据（与detailData分离开，为保证接口原子性）
    current: 0,   //AtTabsPane组件切换下标
    isModalShow: false, //投保须知显示
    isLoading: true, 
    companyData: {} as any, //公司详情数据
    toTopBtn: false,  //回到顶部按钮显示
    toSectionBar: false,  //section顶部tab显示
    activeIndex: 0,  //当前处于的section下标
  }
  
  componentDidMount () {
    if (window.scrollTo) {
      window.scrollTo(0,0);
    }
    //页面初始化
    const params =  getCurrentInstance().router?.params;

    this.props.getProductDetail({
      id: params.id
    }).then(async (res)=> {
      this.props.getCompanyDetail({id:res.companyId}).then((_res)=>{
        this.setState({
          isLoading: false,
          companyData: _res
        })
      })
      this.setState({
        isLoading: false,
        detailData: res
      })
      
      let similarData = [];
      let promises = res.similars.map((item) => {
        return this.props.getProductSimple({id: item.id});
      })
      for(let promise of promises){
        similarData.push(await promise);
      }
      this.setState({
        similarData
      })

    }).catch((err) => {console.log(err)})
  }

  componentDidShow () {
    //监听页面滚动事件
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidHide () {
    //卸载页面滚动事件
    window.removeEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount () {
    this.setState = () => {
      return;
    }
  }

  componentDidUpdate () {
    //获取模块加载后距离顶部的高度
    sectionTop[0] = this.refs.content.offsetTop;
    sectionTop[1] = this.refs.premium.offsetTop;
    sectionTop[2] = this.refs.comment.offsetTop;
    sectionTop[3] = this.refs.similar.offsetTop;
    //获取detail容器距离顶部的高度
    detailHeight = this.refs.detail_container.offsetTop;
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
        //超过100px时显示回到顶部按钮，和模块顶部Tab
        if(scrollTop > 100) {
          this.setState({
            toTopBtn: true,
            toSectionBar: true
          })
        }
        else{
          this.setState({
            toTopBtn: false,
            toSectionBar: false
          })
        }

        //判断当前滚动到哪个模块
        for(let i=sectionTop.length-1; i>=0; i--){
          if(scrollTop > sectionTop[i]-detailHeight){
            this.setState({
              activeIndex: i
            })
            break;
          }
        }
        timer = null;
      }, 100)
    }
  }

  //滚动至对应内容块
  scrollToSection = (index) => {
    window.scrollTo(0,sectionTop[index]-detailHeight);
    // ref.scrollIntoView();
    setTimeout(() => {
      this.setState({
        toSectionBar: false
      })
    },150)
  }
  //加入对比
  addCompare = (id) => {
    if(this.state.detailData.insType == '5') {
      Taro.atMessage({
        message: '年金险无对比',
        duration: 2000,
        type: 'warning'
      })
      return;
    }
    Taro.navigateTo({
      url: `/pages/contrast/index?ids=${id}`
    })
  }
  //一键对比
  quickCompare = (id) => {
    const ids = id + '-' + Taro.Current.router?.params.id;
    Taro.navigateTo({
      url: `/pages/contrast/index?ids=${ids}`
    })
  }
  //分享给客户(非原生小程序只能通过引导提示用户点击右上角进行分享)
  share = () => {

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
      <View className="detail-container" ref="detail_container">

        <NavBar title="产品详情"></NavBar>
        {/* 消息提示组件 */}
        <AtMessage />
        {/* 产品信息卡片 */}
        <Skeleton
          row={4} 
          avatarShape='square' 
          avatar
          avatarSize={150} 
          rowHeight={[35,28,28,28]} 
          rowWidth={['40%','100%','100%','100%']}
          loading={this.state.isLoading}
        >
        </Skeleton>
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
            { ProductPatchMap[this.state.detailData.insType].options.map((item) => {
              if(item.key == 'hasMid'){
                return (
                  <View className="tag-item" key={item.key}>
                    <View>
                      {this.state.detailData[ProductPatchMap[this.state.detailData.insType].key][item.key]==true?'有':'无'}
                    </View>
                    <View className="tag-item-label">{item.label}</View>
                  </View>
                )
              }
              return (
                <View className="tag-item" key={item.key}>
                  <View>{this.state.detailData[ProductPatchMap[this.state.detailData.insType].key][item.key] || '无'}</View>
                  <View className="tag-item-label">{item.label}</View>
                </View>
              )
            })
            }
          </View>}
        </AtFloatLayout>

        {/* 保障内容模块 */}
        <View ref="content">
          <SectionCard title="保障内容">
            <Skeleton
              row={6} 
              avatarShape='square' 
              rowHeight={[70,60,60,60,60,60]} 
              loading={this.state.isLoading}
            >
            </Skeleton>
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
            <Skeleton
              row={6} 
              avatarShape='square' 
              rowHeight={[70,60,60,60,60,60]} 
              loading={this.state.isLoading}
            >
            </Skeleton>
            {!this.state.isLoading &&
              <Premium detailData={this.state.detailData}></Premium>
            }  
          </SectionCard>
        </View>

        {/* 谱蓝君点评模块 */}
        <View ref="comment">
          <Skeleton
            row={6} 
            avatarShape='square' 
            rowHeight={[70,60,60,60,60,60]} 
            loading={this.state.isLoading}
          >
          </Skeleton>
          <SectionCard title="谱蓝君点评">
            {!this.state.isLoading &&
              <Comment detailData={this.state.detailData}></Comment>          
            }
          </SectionCard>
        </View>      

        {/* 保险条款模块 */}
        <SectionCard title="保险条款">
          <Skeleton
            row={6} 
            avatarShape='square' 
            rowHeight={[70,60,60,60,60,60]} 
            loading={this.state.isLoading}
          >
          </Skeleton>
          {!this.state.isLoading && this.state.detailData.policies.map((item) => {
            return (
              <a style={{display: 'block', color:'#333'}} key={item.key} href={item.value} target="_blank">
                <View className="policies-box" key={item.key}>
                  <Text className="policies-name">{item.key}</Text>
                  <Text className="iconfont icon-youjiantou-copy"></Text>
                </View>  
              </a>
            )
          })        
          }
          {!this.state.isLoading && this.state.detailData.policies.length==0 &&
                <View className="noData">
                  <View className="iconfont icon-zanwushuju"></View>
                  <Text>暂无数据</Text>
                </View>
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
            <View className="similar-pro-box">
              {this.state.similarData.length >0 && this.state.similarData.map((item) => {
                return (
                  <View className="similar-pro" key={item.id}>
                    <View className="pro-name">
                      {item.insType==1 && 
                        (item.productDefinitionVersion == 'NEW'
                        ?<Text className="new tag">新定义</Text>
                        :<Text className="old tag">旧定义</Text>)
                      }
                      <Text className="title">{item.productName}</Text>
                    </View>
                    <View className="pro-desc">
                      {item.keyword &&
                        item.keyword.split(',').map((item) => {
                          if(item.length==0) return;
                          return (
                            <Text className="pro-desc-item" key={item}>{item}</Text>
                          )
                        })
                      }
                    </View>
                    <View className="contrast-btn" onClick={()=>{this.quickCompare(item.id)}}>一键对比</View>
                  </View>
                )
              })
              }
              {!this.state.isLoading && this.state.similarData.length==0 &&
                <View className="noData">
                  <View className="iconfont icon-zanwushuju"></View>
                  <Text>暂无数据</Text>
                </View>
              }
            </View>
          </SectionCard>
        </View>
        
        {/* 回到顶部按钮 */}
        {this.state.toTopBtn &&
          <View className="toTop-btn" onClick={this.toTop}>回到顶部</View>
        }
        
        {/* 顶部定位栏 */}
        {this.state.toSectionBar &&
          <View className="fixed-tab">            
            <View className="flex-box">
              <View className="tab" style={this.state.activeIndex==0?{color:'#6190E8'}:{color:'#333'}} onClick={() => {this.scrollToSection(0)}}>保障内容</View>
              <View className="tab" style={this.state.activeIndex==1?{color:'#6190E8'}:{color:'#333'}} onClick={() => {this.scrollToSection(1)}}>保费测算</View>
              <View className="tab" style={this.state.activeIndex==2?{color:'#6190E8'}:{color:'#333'}} onClick={() => {this.scrollToSection(2)}}>谱蓝君点评</View>
              <View className="tab" style={this.state.activeIndex==3?{color:'#6190E8'}:{color:'#333'}} onClick={() => {this.scrollToSection(3)}}>同类产品</View>
            </View>
          </View>
        }

        <View className="fixed-btn">
          <AtButton size="small" type="secondary" className="btn-share" openType="share" onClick={this.share}>分享给客户</AtButton>
          <AtButton
            size="small"
            type="primary"
            className="btn-contrast"
            onClick={()=>{this.addCompare(this.state.detailData.id)}}
          >
            加入对比
          </AtButton>
        </View>
        <View className="footer">*以上内容仅供参考，产品详情信息以产品条款约定内容为准</View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
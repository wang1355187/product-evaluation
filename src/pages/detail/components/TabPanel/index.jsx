import React from "react";
import { Text, View } from "@tarojs/components";
import "./index.scss";

const Table = function (props) {
  return (
    <View className="table-container">
      {props.data &&
        props.data.map((item) => {
          return (
            <View className="table-tr" key={item.key}>
              <View className="table-title">{item.key}</View>
              <View className="table-content">{item.value}</View>
            </View>
          )
        })
      }
    </View>
  )
}
const Diseases = function (props) {
  return (
    <View className="diseases-container">
      {props.data &&
        props.data.map((item) => {
          return (
            <View className="table-tr" key={item.key}>
              <View className="table-title">{item.key}</View>
              <View className="table-content">
                {item.value.map((_item, index) => {
                  return (
                    <Text className="diseases-item" key={index}>{_item}</Text>
                  )
                })}
              </View>
            </View>
          )
        })
      }
    </View>
  )
}
const Excludes = function (props) {
  return (
    <View className="excludes-container">
      <View className="excludes-content">
        {
          props.data.map((item,index) => {
            return (
              <View className="exclude-item" key={index}>{item}</View>
            )
          })
        }
      </View>
    </View>
  )
}
const Details = function (props) {
  return (
    <View className="details-container">
      <View className="details-content">
        {
          props.data.map((detail) => {
            return (
              <View className="detail-box" key={detail.class}>
                <View className="detail-class">{detail.class}</View>
                <View className="item-box">
                  {
                    detail.items.map((item) => {
                      return (
                        <View className="flex-box" key={item.key}>
                          <View className="item-key">{item.key}</View>
                          <View className="item-value">{item.value}</View>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

class TabPanel extends React.Component {
  state = {
    component: [],
    toggleText: "说的详细点",
    className: 'tab-panel-content limit', //用于控制是否展开内容
    isAll: false, //当前是否展开全部
    hasAll: false, //是否有展开全部按钮,
  }

  first = true; //是否首次加载
  componentDidMount () {
    //根据type不同，渲染不同组件
    switch(this.props.type){
      case 'rules':
      case 'covers':
        this.setState({
          component: <Table data={this.props.data}></Table>
        })
        break;
      case 'excludes':
        this.setState({
          component: <Excludes data={this.props.data}></Excludes>
        })
        break;
      case 'diseases':
        this.setState({
          component: <Diseases data={this.props.data}></Diseases>
        })
        break;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.refs.panel_content.offsetHeight >= 350){
      if(this.first){
        this.setState({
          hasAll: true
        })
        this.first = false;
      }
    }
  }
  //切换详细或简单说明
  toggle = ()=> {
    if(this.state.toggleText==='说的详细点'){
      this.setState({
        component: <Details data={this.props.details}></Details>,
        toggleText: '说的简单点'
      })
    }
    else{
      this.setState({
        component: <Table data={this.props.data}></Table>,
        toggleText: '说的详细点'
      })
    }
  }
  //展示全部内容
  showAll = () => {
    this.setState({
      className: 'tab-panel-content',
      isAll: true
    })
  }
  showPart = () => {
    this.setState({
      className: 'tab-panel-content limit',
      isAll: false
    })
  }
  render () {
    return (
      <View className="tab-panel-container">
        <View className={this.state.className} ref="panel_content">
          {this.state.component}
        </View>
        <View className="tab-footer">
          <View  className="tab-footer-box">
            {this.props.type==='covers' &&
              <View onClick={this.toggle}>
                <Text>{this.state.toggleText}</Text>
                <Text className="iconfont icon-qiehuan-"></Text>
              </View>
            }
            {!this.state.isAll?
              (this.state.hasAll && <View onClick={this.showAll}>
                <Text>展开全部</Text>
                <Text className="iconfont icon-xiala"></Text>
              </View>)
              :
              <View onClick={this.showPart}>
                <Text>收起部分</Text>
                <Text className="iconfont icon-shangla"></Text>
              </View>
            }
          </View>
        </View>
      </View>
    )
  }
}

export default TabPanel;
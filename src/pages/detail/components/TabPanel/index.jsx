import React,{useState, useEffect} from "react";
import { Text, View, ScrollView } from "@tarojs/components";
import "./index.scss";
import { set } from "lodash";

//保什么（简单）、投保规则容器，都用该组件
const Table = function (props) {
  const { toggle, type } = props;
  const [list, setList] = useState(props.data);
  const [isAll, setIsAll] = useState(false);
  useEffect(() => {
    if(list.length> 5){
      setList(list.slice(0,5));
    }
  }, [])
  const showAll = () => {
    setList(props.data);
    setIsAll(true);
  }
  const showPart = () => {
    setList(list.slice(0,5));
    setIsAll(false);
  }
  return (
    <View className="table-container">
      {list.length>0 &&
        <React.Fragment>
          {
            list.map((item) => {
              return (
                <View className="table-tr" key={item.key}>
                  <View className="table-title">{item.key}</View>
                  <View className="table-content">{item.value}</View>
                </View>
              )
            })
          }
          <View className="tab-footer-box">
            {type == 'covers' &&
              <View onClick={toggle}>
                <Text>说的详细点</Text>
                <Text className="iconfont icon-qiehuan-"></Text>
              </View>           
            }
            {props.data.length>5 &&
              <React.Fragment>
                {!isAll?
                  <View onClick={showAll}>
                    <Text>展开全部</Text>
                    <Text className="iconfont icon-xiala"></Text>
                  </View>
                  :
                  <View onClick={showPart}>
                    <Text>收起部分</Text>
                    <Text className="iconfont icon-shangla"></Text>
                  </View>
                }    
              </React.Fragment>
            }        
          </View>
        </React.Fragment>
      }
      {list.length==0 &&
        <View className="noData">
          <View className="iconfont icon-zanwushuju"></View>
          <Text>暂无数据</Text>
        </View>
      }
    </View>
  )
}

const Diseases = function (props) {
  const { data } = props;
  const [diseasesList, setDiseasesList] = useState(data[0]?.value || []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
    setDiseasesList(data[index].value);
    setScrollTop(Math.random());
  }
  return (
    <View className="diseases-container">
      {data && data.length>0 &&
        <View className="content-box">
          <View className="diseases-type-box">
            {
              data.map((item, index) => {
                return (
                  <View
                    className={index==activeIndex?'diseases-type active':'diseases-type'}
                    key={item.key}
                    onClick={()=>{handleClick(index)}}
                  >
                    {item.key}
                  </View>
                )
              })
            }
          </View>
          <View className="diseases-items-box">
            <ScrollView
              scrollY={true}
              className="scroll"
              scrollTop={scrollTop}
            >
              {
                diseasesList.map((item, index) => {
                  return (
                    <View className="diseases-item" key={item}>{item}</View>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      }
      {data.length==0 &&
        <View className="noData">
          <View className="iconfont icon-zanwushuju"></View>
          <Text>暂无数据</Text>
        </View>
      }
    </View>
  )
}
const Excludes = function (props) {
  const [list, setList] = useState(props.data);
  const [isAll, setIsAll] = useState(false);
  useEffect(() => {
    if(list.length> 5){
      setList(list.slice(0,5));
    }
  }, [])
  const showAll = () => {
    setList(props.data);
    setIsAll(true);
  }
  const showPart = () => {
    setList(list.slice(0,5));
    setIsAll(false);
  }
  return (
    <View className="excludes-container">
      <View className="excludes-content">
        {
          list.map((item,index) => {
            return (
              <View className="exclude-item" key={index}>{item}</View>
            )
          })
        }
      </View>
      {props.data.length>5 &&
        <View className="tab-footer-box">
          {!isAll?
            <View onClick={showAll}>
              <Text>展开全部</Text>
              <Text className="iconfont icon-xiala"></Text>
            </View>
            :
            <View onClick={showPart}>
              <Text>收起部分</Text>
              <Text className="iconfont icon-shangla"></Text>
            </View>
          }            
        </View>
      }
    </View>
  )
}
const Details = function (props) {
  const { toggle } = props;
  const [list, setList] = useState(props.data);
  const [isAll, setIsAll] = useState(false);
  useEffect(() => {
    if(list.length> 2){
      setList(list.slice(0,2));
    }
  }, [])
  const showAll = () => {
    setList(props.data);
    setIsAll(true);
  }
  const showPart = () => {
    setList(list.slice(0,2));
    setIsAll(false);
  }
  return (
    <View className="details-container">
      <View className="details-content">
        {
          list.map((detail) => {
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
      <View className="tab-footer-box">
        <View onClick={toggle}>
          <Text>说的简单点</Text>
          <Text className="iconfont icon-qiehuan-"></Text>
        </View>
        {props.data.length> 2 &&
          <React.Fragment>
            {!isAll?
              <View onClick={showAll}>
                <Text>展开全部</Text>
                <Text className="iconfont icon-xiala"></Text>
              </View>
              :
              <View onClick={showPart}>
                <Text>收起部分</Text>
                <Text className="iconfont icon-shangla"></Text>
              </View>
            }          
          </React.Fragment>
        }  
      </View>
    </View>
  )
}

class TabPanel extends React.Component {
  state = {
    component: [],
    toggleText: "simple", //用于切换简单或详细保什么
    data: this.props.data
  }

  first = true; //是否首次加载
  componentDidMount () {
    //根据type不同，渲染不同组件
    switch(this.props.type){
      case 'rules':
        this.setState({
          component: <Table data={this.props.data} toggle={this.toggle} type="rules"></Table>
        })
        break;
      case 'covers':
        this.setState({
          component: <Table data={this.props.data} toggle={this.toggle} type="covers"></Table>
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

  }
  //切换详细或简单说明
  toggle = ()=> {
    if(this.state.toggleText==='simple'){
      this.setState({
        component: <Details data={this.props.details} toggle={this.toggle}></Details>,
        toggleText: 'detail'
      })
    }
    else{
      this.setState({
        component: <Table data={this.props.data} toggle={this.toggle} type='covers'></Table>,
        toggleText: 'simple'
      })
    }
  }
  render () {
    return (
      <View className="tab-panel-container">
        <View className={this.state.className} ref="panel_content">
          {this.state.component}
        </View>
      </View>
    )
  }
}

export default TabPanel;
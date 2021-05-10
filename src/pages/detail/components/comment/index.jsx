import React from "react";
import { Text, View, Image } from "@tarojs/components";

import "./index.scss";

const CommentPoint = function (props) {
  const { content, logoTitle, title} = props;
  return (
    <View className="point-container">
      {logoTitle
        ?<View className="logo-title" style={props.mystyle}>
          {props.children}
          <Text>{title}</Text>
        </View>
        :<View className="title">
          {props.children}
          <Text>{title}</Text>
        </View>
      }
      <View className="content">
        {content.map( (item,index) => {
          return (<View className="content-item" key={index}>{content.length > 1 ? (index+1)+'、' :''}{item}</View>)
        })}
      </View>
    </View>
  )
}

const Comment = function (props) {
  const {
    pros, //亮点
    cons, //不足
    warning,  //注意事项
    crowd,  //适用人群
    comments  //综合点评
  } = props.detailData;
  return (
    <View className="comment-container">
      <CommentPoint title="亮点" content={pros} logoTitle={true}>
        <Text className="iconfont icon-xiaolian"></Text>
      </CommentPoint>

      <CommentPoint title="不足" content={cons} logoTitle={true} mystyle={{backgroundColor: '#23bfa3'}}>
        <Text className="iconfont icon-bumanyi"></Text>
      </CommentPoint>

      <CommentPoint title="需要注意" content={warning} logoTitle={false}>
        <Text className="iconfont icon-huaban21"></Text>
      </CommentPoint>

      <CommentPoint title="适用人群" content={crowd} logoTitle={false}>
        <Text className="iconfont icon-renqun-copy"></Text>
      </CommentPoint>

      <CommentPoint title="综合点评" content={comments} logoTitle={false}>
        <Text className="iconfont icon-dianping"></Text>
      </CommentPoint>
    </View>
  )
}
export default Comment
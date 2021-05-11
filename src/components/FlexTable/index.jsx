import React from 'react';
import {Text, View} from '@tarojs/components';
import './index.scss';

const FlexTable = (props) => {
  //titleList为一维数组，存放每行的行名   
  //contentList为二维数组，存放每行的行值   [[第一行数据1，第一行数据2...],[第二行数据1，第二行数据2...]...]
  const { titleList, contentList, isVerticalCenter } = props;
  return (
    <View className="table-body">
      {
        titleList.map((item, index) => {
          return (
            <View className="table-tr" key={item}>
              <View className="table-tr-title">{titleList[index]}</View>
              {contentList[index] !==undefined &&
                contentList[index].map((contentItem, _index) => {
                  return (
                    <View className="table-tr-content" style={isVerticalCenter?{alignItems:'flex-start'}:''} key={_index}>
                      {
                        Array.isArray(contentItem)?
                        <View>
                          {contentItem.map((text,i)=>{
                            return <View key={i}>{(i+1)+"、"+text}</View>
                          })}
                        </View>
                        :
                        <Text>{contentItem}</Text>
                      }
                    </View>
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default FlexTable
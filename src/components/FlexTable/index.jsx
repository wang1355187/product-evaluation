import React from 'react';
import {Text, View} from '@tarojs/components';
import './index.scss';

const FlexTable = (props) => {
  const { titleList, contentList } = props
  return (
    <View className="table-body">
      {
        titleList.map((item, index) => {
          return (
            <View className="table-tr" key={item}>
              <View className="table-tr-title">{titleList[index]}</View>
              {
                Array.isArray(contentList[index])
                ?<View></View>
                :<View className="table-tr-content">{contentList[index]}</View>
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default FlexTable
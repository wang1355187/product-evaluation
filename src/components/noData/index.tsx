import { View, Text} from '@tarojs/components'
import React from 'react';

const noData = () => {
  return (
    <View className="noData">
      <View className="iconfont icon-zanwushuju"></View>
      <Text>暂无数据</Text>
    </View>
  )
}
export default noData
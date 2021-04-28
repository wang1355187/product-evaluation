import React from "react";
import { View, Text } from "@tarojs/components";

// 引入静态资源
import "./index.scss";

const AddConPro = (props) => {
  const { data, canDelete, add, see, del, openSiedBar} = props;
  return (
    <View className='addConpPro-container'>
      {data === undefined ||
        <View className="noData" onClick={openSiedBar}>
          <View onClick={add} className="icon-box">
            <View className="at-icon at-icon-add-circle"></View>
          </View>
          <Text className="text">添加产品</Text>
        </View>
      }
    </View>
  )
}
export default AddConPro;
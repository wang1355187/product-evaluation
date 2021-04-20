import React from "react";
import { View, Text } from '@tarojs/components';

import './index.scss'

export default function (props) {
  const {
    th,
    tbody
  } = props;
  return (
    <View className="table-container">
      <View className="table-th">
        {
          th.map((item,index) => {
            return (
              <View className="table-th-td" key={index}>{item}</View>
            )
          })
        }
      </View>
      <View className="table-tbody">
        {
          tbody[0].premium.map((tr,index) => {
            return (
              <View className="table-tr" key={index}>
                {
                  (Object.keys(tr)).map((key) => {
                    return (
                      <View className="table-tr-td" key={key}>{tr[key]}</View>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
    </View>
  )
}
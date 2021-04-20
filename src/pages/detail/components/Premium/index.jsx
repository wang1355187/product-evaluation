import React from "react";
import { Text, View } from "@tarojs/components";
import "./index.scss";
import Table from "@/components/Table/index"

const PremiumTable = function (props) {
  const {
    th,
    premium_table
  } = props;
  console.log(premium_table);
  return (
    <View className="table-container">
      {
        th.map((th_item) => {
          return (
            <View className="table-th" key={th_item}>
              {
                th_item.map((item,index) => {
                  return (
                    <View className="table-th-td" key={index}>{item}</View>
                  )
                })
              }
            </View>
          )
        })
      }
      <View className="table-tbody">
        {
          premium_table[0].premium.map((tr,index) => {
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

const Premium = function (props) {
  const { standard, premium_table } = props.detailData.premium;
  const { insType } = props.detailData;
  const PRO_TYPE = {
    1: "重疾险",
    2: "寿险",
    3: "医疗险",
    4: "意外险",
    5: "年金险",
    6: "防癌险",
  };
  const premiumMap = {
    1: [['年龄','首年保费（男）','首年保费（女）']],
    2: [['保障','100万保额，保至60岁','50万保额，保20年'],['年龄','首年保费（男）','首年保费（女）','首年保费（男）','首年保费（女）']],
    3: [['保障','有社保','无社保'],['年龄','首年保费（男）','首年保费（女）','首年保费（男）','首年保费（女）']],
    4: [['年龄','首年保费（10万保额）','首年保费（50万保额）','首年保费（100万保额）','首年保费（200万保额）']],
    5: [],
    6: [['年龄','首年保费（男）','首年保费（女）']]
  }
  return (
    <View className="premium-container">
      <View className="has-premium">
        { standard.map((item) => {
            return (
              <View className="premium-desc" key={item.key}>{item.key}：{item.value}</View>
            )
          })
        }
        <View className="premium-table">
          <PremiumTable th={premiumMap[insType]} premium_table={premium_table}></PremiumTable>
        </View>
      </View>
    </View>
  )
}

export default Premium
import React from "react";
import { Text, View } from "@tarojs/components";
import "./index.scss";
import Table from "@/components/Table/index"

const PremiumTable = function (props) {
  const {
    th,
    premium_table
  } = props;

  const conditions = [];  //表头条件
  const rows = [];  //条件模块
  const age = []; //年龄列

  //格式化premium_table
  function formatTable(data) {
    data.map((item) => {
      conditions.push(item.conditions);
      rows.push(item.premium);
    })
  }
  formatTable(premium_table);
  //获取年龄列
  rows[0].forEach((item)=>{
    age.push(item.age);
  })

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
        <View className="row-age">
          {
            age.map((item) => {
              return (
                <View key={item} className="td">{item}</View>
              )
            })
          }
        </View>
        {
          rows.map((item,index) => {
            return (
              <View className="condition-module" key={index}>
                {
                  item.map((_item,_index) => {
                    return (
                      <View className="condition-module-tr" key={_index}>
                        {_item.fee!=undefined
                        ?
                          <View className="condition-module-tr-td td">{_item.fee}</View>
                        :
                          <React.Fragment>
                            <View className="condition-module-tr-td td">{_item.male}</View>
                            <View className="condition-module-tr-td td">{_item.female}</View>
                          </React.Fragment>
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
    </View>
  ) 
}

const Premium = function (props) {
  const isPremium = Object.keys(props.detailData.premium).length >0 ? true : false;
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
      {isPremium
        ?
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
        :
          <View className="noData">
            <View className="iconfont icon-zanwushuju"></View>
            <Text>暂无数据</Text>
          </View>
      }
    </View>
  )
}

export default Premium
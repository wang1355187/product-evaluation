import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'

import { getPremium } from '../../service'
import Cover from '@/components/Cover/index'
import { PremiumConditionMap } from '../../config/index'
import './index.scss';

export const CheckTagGroup = function(props) {
  const dispatch = useDispatch();
  const {
    title,  //字段名
    itemList, //取值列表
    type,  //字段对应的类型     quota保额， gender性别， age年龄， social社保
    handleChange
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (item, index) => {
    setActiveIndex(index);
    //当选择年龄时，传入的不是对象，直接取值item
    const value = item.value || item;
    const _type = type || "age"
    handleChange(_type, value);
  }

  return (
    <View className="check-group">
      <View className='check-group-title'>
        <Text>{title}</Text>
      </View>
      <View className='check-group-content'>
        {
          itemList.map((item, index) => {
            return (
              <View
                className={index==activeIndex?'checked content-item':'content-item'}
                key={index}
                onClick={() => {handleClick(item, index) }}
              >
                {item.label || item}
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

const PremiumTable = (props) => {
  //titleList为一维数组，存放每行的行名   
  //contentList为二维数组，存放每行的行值   [[第一行数据1，第一行数据2...],[第二行数据1，第二行数据2...]...]
  //保费测算返回数据中首年保费所处的下标  重疾4 寿险4 医疗3 意外2 年金- 防癌4
  const firstCostIndex ={
    '1':4,
    '2':4,
    '3':3,
    '4':2,
    '6':4
  }
  const { titleList, contentList, compareList, insType } = props;

  //被保人
  const [personList, setPersonList] = useState(contentList[0]);
  //首年保费
  const [firstPremiumList, setFirstPremiumList] = useState(contentList[firstCostIndex[insType]]);
  //总保费（仅重疾险才有）
  const [totalPremiumList, setTotalPremiumList] = useState(insType==1 ? contentList[5] : []);
  //保障期间（寿险）
  const [maxProtectTimeList, setMaxProtectTimeList] = useState(insType==2 ? contentList[1] : []);
  //保额
  let initQuotaList;
  switch(insType){
    case '2':
      initQuotaList = contentList[3];
      break;
    case '4':
      initQuotaList = contentList[1];
      break;
    default:
      initQuotaList = [];
  }
  //保额（寿险、意外险）
  const [quotaList, setQuotaList] = useState(initQuotaList);
  //社保（医疗险）
  const [socialSecurityList, setSocialSecurityList] = useState(insType == 3 ? contentList[2]: []);


  //产品可选年龄列表状态
  const [ageList, setAgeList] = useState([]);
  //当前需要被更改测算条件的产品下标
  const [proIndex, setProIndex] = useState(0);
  //保费测算调整底部栏状态
  const [modalShow, setModalShow] = useState(false);

  //保费测算传值参数对象
  const [params, setParams] = useState({
    id: '',
    age: 30,
    gender: 0,  //性别 (男0 女1)
    quota: undefined, //保额 int
    social: undefined //社保  (有1 无0)
  })

  //保费测算产品的id列表
  const idsList = [];
  compareList.forEach((item) => {
    idsList.push(item.id);
  })

  //设置对应产品params初始值
  useEffect(() => {
    let gender = 0;
    let age = 30;
    let quota;
    if(contentList[0][proIndex].includes('，')){
      age = /(?<age>\d+)/.exec(contentList[0][proIndex]).groups.age;
      gender = contentList[0][proIndex].split('，')[0];
    }
    else{
      age = /(?<age>\d+)/.exec(contentList[0][proIndex]).groups.age;
    }
    switch(insType) {
      case '1':
      case '6':
        setParams({
          id: idsList[proIndex],
          age,
          gender: gender=='男' ? 0 : 1,  //性别 (男0 女1)
          quota: undefined, //保额 int
          social: undefined //社保  (有1 无0)
        })
        break;
      case '2':
        quota = /(?<quota>\d+)/.exec(contentList[3][proIndex]).groups.quota;
        setParams({
          id: idsList[proIndex],
          age,
          gender: gender=='男' ? 0 : 1,  //性别 (男0 女1)
          quota, //保额 int
          social: undefined //社保  (有1 无0)
        })
        break;
      case '3':
        let isSocial = contentList[2][proIndex].includes('有');
        setParams({
          id: idsList[proIndex],
          age,
          gender: gender=='男' ? 0 : 1,  //性别 (男0 女1)
          quota: undefined, //保额 int
          social: isSocial ? '1': '0' //社保  (有1 无0)
        })
        break;
      case '4':
        quota = /(?<quota>\d+)/.exec(contentList[1][proIndex]).groups.quota;;
        setParams({
          id: idsList[proIndex],
          age,
          gender: gender=='男' ? 0 : 1,  //性别 (男0 女1)
          quota, //保额 int
          social: undefined //社保  (有1 无0)
        })
        break;
    }
  }, [proIndex])


  const first = useRef(true); //防止首次加载发送获取保费测算请求
  //保费测试参数改变
  useEffect(() => {
    console.log(params);
    if(first.current){
      first.current = false;
      return;
    }
    const {
      id,
      quota,  //保额
      gender, //性别
      age,  //年龄
      social  //社保
    } = params;
    Taro.request({
      type: 'GET',
      url: `/api/premium?id=${id}&quota=${quota}&gender=${gender}&age=${age}&social=${social}`
    }).then((res) => {
      console.log(res);
      if(res.statusCode == 200) {
        let {
              insured,  //被保人
              premium,  //首年保费
              totalPremium, //总保费
              maxProtectTime, //保障期间
              quotaLimit,  //保额
              socialSecurity, //社保
            } =res.data;
        //设置首年保费
        let _premium = premium !== null ? premium + '元' : '无保费结果';
        firstPremiumList.splice(proIndex, 1, _premium);
        setFirstPremiumList([...firstPremiumList]);
        //设置被保人
        let person = insured.gender + '，' + insured.age + '岁';
        if(insured.gender == null){
          person = insured.age + '岁';
        }
        personList.splice(proIndex, 1, person);
        setPersonList([...personList]);
        //设置总保费（重疾险）
        if(insType == 1) {
          let _totalPremium = totalPremium !== null ? totalPremium + '元' : '无保费结果';
          totalPremiumList.splice(proIndex, 1, _totalPremium);
          setTotalPremiumList([...totalPremiumList]);
        }
        //设置保障期间，保额（寿险）
        if(insType == 2) {
          let _quotaLimit = quotaLimit + '万';
          let _maxProtectTime = maxProtectTime == 60 ? '保至'+ maxProtectTime+'岁' : '保'+maxProtectTime+'年';
          quotaList.splice(proIndex, 1, _quotaLimit);
          maxProtectTimeList.splice(proIndex, 1, _maxProtectTime);
          setQuotaList([...quotaList]);
          setMaxProtectTimeList([...maxProtectTimeList]);
        }
        //设置社保（医疗险）
        if(insType == 3) {
          let _socialSecurity = socialSecurity + '社保';
          socialSecurityList.splice(proIndex, 1, _socialSecurity);
          setSocialSecurityList([...socialSecurityList]);
        }
        //设置保额（意外险）
        if(insType == 4) {
          let _quotaLimit = quotaLimit + '万';
          quotaList.splice(proIndex, 1, _quotaLimit);
          setQuotaList([...quotaList]);
        }
      }
    })
  }, [params])

  //点击保费测算调整方案
  const openConditionPanel = useCallback((id, index) => {
    //设置当前被更改的产品的下标
    setProIndex(index);
    //获取产品可选年龄列表，并打开筛选栏
    Taro.request({
      type: 'GET',
      url: `/api/ages?id=${id}`
    }).then((res) => {
      if(res.statusCode==200) {
        setAgeList(res.data.ages);
        setModalShow(true);
      }
    }).catch((err) => {console.log(err)})
  }, [ageList])

  //改变测算条件params参数，  proIndex(第几个产品)  type(改变的条件类型)  value(改变的值)
  const conditionChange = (type, value) => {
    setParams({
      ...params,
      id: idsList[proIndex],
      [type]: value
    })
  }

  return (
    <View className="table-body">
      {
        titleList.map((item, index) => {
          return (
            <View className="table-tr" key={index}>
              <View className="table-tr-title">{titleList[index]}</View>
              {contentList[index] !==undefined &&
                contentList[index].map((contentItem, _index) => {

                  //被保人字段
                  if(index==0) {
                    return (
                      <View className="table-tr-content" key={_index}>
                        <Text>{personList[_index]}</Text>
                      </View>
                    )
                  }
                  //首年保费字段
                  if(index==firstCostIndex[insType]){
                    return (
                      <View className="table-tr-content change" key={_index}>
                        <View>
                          <Text>{firstPremiumList[_index]}</Text>
                          <Text className='at-icon at-icon-help'></Text>
                        </View>
                        <View className="change-btn" onClick={() => {openConditionPanel(idsList[_index],_index)} }>调整方案</View>
                      </View>
                    )
                  }
                  //总保费字段(重疾险)
                  if(insType==1 && index==5) {
                    return (
                      <View className="table-tr-content" key={_index}>
                        <Text>{totalPremiumList[_index]}</Text>
                      </View>
                    )
                  }
                  //保障期间（寿险）
                  if(insType==2 && index==1){
                    return (
                      <View className="table-tr-content" key={_index}>
                        <Text>{maxProtectTimeList[_index]}</Text>
                      </View>
                    )
                  }                  
                  //保额（寿险）
                  if(insType==2 && index==3){
                    return (
                      <View className="table-tr-content" key={_index}>
                        <Text>{quotaList[_index]}</Text>
                      </View>
                    )
                  }
                  //社保（医疗险）
                  if(insType==3 && index==2){
                    return (
                      <View className="table-tr-content" key={_index}>
                        <Text>{socialSecurityList[_index]}</Text>
                      </View>                      
                    )
                  }
                  //保额（意外险）
                  if(insType==4 && index==1){
                    return (
                      <View className="table-tr-content" key={_index}>
                        <Text>{quotaList[_index]}</Text>
                      </View>
                    )
                  }
                  return (
                    <View className="table-tr-content" key={_index}>
                      <Text>{contentItem}</Text>
                    </View>
                  )
                })
              }
            </View>
          )
        })
      }
      {/* 保费测算调整底部框 */}
      {modalShow &&
        <Cover>
          <View className="premium-modal">
            <View className="premium-modal-header">
              <View>
                <Text className="header-title">保费测算</Text>
                <Text className="premium-cost"><Text className="premium-cost-number">{firstPremiumList[proIndex]}</Text></Text>
              </View>
              <View className='at-icon at-icon-close' onClick={() => {setModalShow(false)}}></View>
            </View>
            <View className="premium-modal-content">
              {
                PremiumConditionMap[insType].map((item, index) => {
                  if(index==0) {
                    return (
                      <CheckTagGroup
                        title="年龄:"
                        itemList={ageList}
                        key={index}
                        handleChange={conditionChange}
                      >
                      </CheckTagGroup>
                    )
                  }
                  return (
                    <CheckTagGroup
                      title={item.title}
                      itemList={item.options}
                      type={item.type}
                      key={index}
                      handleChange={conditionChange}
                    >
                    </CheckTagGroup>
                  )
                })
              }
            </View>
          </View>
        </Cover>
      }
    </View>
  )
}

export default PremiumTable
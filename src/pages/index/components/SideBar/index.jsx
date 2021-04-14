import { Component,  useState, useCallback, useEffect } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import React from 'react';
import { useDispatch } from "react-redux";
import { AtIcon, AtTabBar, AtButton, AtFloatLayout, AtCheckbox } from 'taro-ui';
import Cover from '@/components/Cover/index'
import CheckTag,{ CheckTagItem } from '../CheckTag/index'
import { filterList, conditionMap, Filter } from "../../config/index";
import { removeEmptyKey } from "@/utils/index";
import {
  getCompanyList,
  companyNameByList,
  filterProductList,
  featureTagType,
} from "../../service";

import { common } from "@/assets/images";
import './index.scss';


const SideBar = function(props) {
  const { onClose } = props;
  const dispatch = useDispatch();
  //产品总数
  const [totalProducts, setTotalProducts] = useState(0);
  //公司列表
  const [companyList, setCompanyList] = useState([]);
  //选中公司列表
  const [checkedList, setCheckedList] = useState([]);
  //险种类目状态
  const [typeKey,setTypeKey] = useState(0);
  //投保年龄状态
  const [age,setAge] = useState(0);
  //公司列表弹窗状态
  const [showFloat, setShowFloat] = useState(false);

  let handler;  //防抖定时器
  //默认表单
  const initialForm = {
    type: "", //险种类目
    companyId: [],  //保险公司id
    ageId: "",  //投保年龄
    insProductTagIds: [], //保障期间
    tagName: [],  //产品特色
  };
  //表单状态
  const [form, setForm] = useState({
    ...initialForm
  });

  //获取筛选参数
  const getFilterParam = useCallback(() => {
    let data = {
      ...form,
      pageIndex: 1,
      pageSize: 10,
    };
    removeEmptyKey(data);
    /** 将数组转成字符串*/
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key] = data[key].join(",");
      }
    });
    return data;
  }, [form]);

  //获取产品列表
  const getList = useCallback(async () => {

    const data = getFilterParam();

    const { data: res } = await filterProductList(data);
    if (res.code === 0) {
      console.log(res);
      setTotalProducts(res.total);
    }
  }, [getFilterParam]);

  //防抖
  useEffect(() => {
    if (handler) clearTimeout(handler);
    handler = setTimeout(() => {
      getList();
    }, 800);
    return () => {
      clearTimeout(handler);
    };
  }, [form, getList]);


  //去往详情页面
  function goToDetail (id) {

  }
  //打开公司筛选栏
  const showPopup = useCallback(async () => {
    if (!companyList || companyList.length === 0) {
      const { data: res } = await getCompanyList();
      if (res.code === 0) {
        const copMap = res.data.map((c) => {
          return {
            value: c.id,
            label: c.name,
          };
        });
        setCompanyList(copMap);
      }
    }
    setShowFloat(true);
    return;
  }, [companyList]);
  //关闭公司列表弹窗
  const handleClose = useCallback(() => {
    setShowFloat(false);
  }, []);

  //关闭侧边栏
  function closeSideBar(){
    onClose();
  }
  //改变通用筛选条件
  function handleFilterChange(type, value) {
    switch(type){
      case 'type':
        setTypeKey(value);
        if(value==0){
          value='';
        }
        setForm({
          ...form,
          type:value
        });
        break;
      case 'ageId':
        setAge(value);
        if(value==0){
          value='';
        }
        setForm({
          ...form,
          ageId:value
        });
        break;
    }
  }

  //改变险种个性化筛选
  function handleConditionChange() {

  }
  //勾选公司
  const handleSelectCompany = (val) => {
    setCheckedList(val);
  };
  //确定选中公司
  const handleConfirmCompany = useCallback(() => {
    setShowFloat(false);
    if (checkedList.length === 0) {
      setForm({
        ...form,
        companyId: checkedList,
      });
    }
    setForm({
      ...form,
      companyId: checkedList,
    });
  }, [checkedList, form]);

  return (
    <View className="sidebar-container">
      <Cover>
        <View className="content-box">
          <View className="close" onClick={closeSideBar}>
            <View className="at-icon at-icon-chevron-right"></View>
          </View>
          <View className="filter-form">
            <ScrollView
              className="scrollview"
              scrollY="true"
            >
              {/* 通用筛选 */}
              {
                filterList.map((item)=>{
                  return (<CheckTag
                    key={item.type}
                    value={item.value}
                    title={item.name}
                    itemMap={item.options}
                    onChange={(val) => handleFilterChange(item.type, val)}
                  >
                    {item.type==="companyId"&& (
                      <View style='display: flex;'>
                        {!!checkedList.length && (
                          <CheckTagItem
                            checked
                            label={`已选中 ${checkedList.length} 家保险公司`}
                            onClick={showPopup}
                          />
                        )}
                        <CheckTagItem label='+' onClick={showPopup} />
                      </View>
                    )}
                  </CheckTag>)
                })
              }

              <View className="split-line-box">
                <Text className="split-line">险种个性化条件</Text>
              </View>

              {/* 险种个性化筛选 */}
              { 
                conditionMap[typeKey].map((item)=>{
                  return (<CheckTag
                    key={item.type}
                    value={item.type}
                    title={item.name}
                    itemMap={item.options}
                    multiple={true}
                  >
                  </CheckTag>)
                })
              }
            </ScrollView>
            <View className="fixed-btn">
              <AtButton className="reset-btn" size="small" type="secondary">重置</AtButton>
            <AtButton className="submit-btn" size="small" type="primary">查看{totalProducts}款产品</AtButton>
            </View>
          </View>
        </View>
        {/* 公司列表弹窗 */}
        <AtFloatLayout
          title='保险公司'
          isOpened={showFloat}
          onClose={handleClose}
        >
          {/* <View className='search_company'>
            <View className='search_company-fixed'>
              <AtSearchBar
                value={companyValue}
                placeholder='请输入关键字'
                onChange={(val) => setCompanyValue(val)}
                onActionClick={handleSearchChange}
              />
            </View>
          </View> */}
          <View className='scroll_company'>
            <AtCheckbox
              options={companyList}
              selectedList={checkedList}
              onChange={(val) => handleSelectCompany(val)}
            />
          </View>
          <View className='selete-company'>
            <View className='btn'>
              <View className='text' onClick={handleConfirmCompany}>
                已选{checkedList.length}项, 确定
              </View>
            </View>
          </View>
        </AtFloatLayout>
      </Cover>
    </View>
  )
}

export default SideBar
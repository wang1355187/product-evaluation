import React, { useState, useEffect } from "react"
import { View, Text } from '@tarojs/components'

import './index.scss'

interface IProps {
  title?: string,
  value?: any,
  itemMap: Item[];
  /** 是否多选 */
  multiple?: boolean
  /** 点击 item 就触发 */
  onClick?: (opt: Item, index: number) => void
  /** 针对值改变 */
  onChange?: (val: any) => void
  isChecked?: (i:number) => boolean
}

interface Item {
  label: string;
  value: any;
  checked?: boolean
}

export const CheckTagItem: React.SFC<{label: string; checked?: boolean; onClick?: () => void}> = function(props) {
  const {
    label,
    checked,
    onClick
  } = props
  return (
    <View
      className={'cont-item' + (checked ? ' check' : '')}
      onClick={onClick}
    >{label}</View>
  )
}


const CheckTagGroup: React.SFC<IProps> = function(props) {
  const {
    title,
    itemMap,
    value,
    children,
    onClick = () => {},
    onChange = () => {},
    multiple,
  } = props

  //（单选）选中下标状态
  const [index,setIndex] = useState(0);
  //（多选）选中下标列表状态
  const [indexArr,setIndexArr] = useState([0]);

  //单选列表副作用
  useEffect(() => {
    
  },[index])
  //多选列表副作用
  useEffect(() => {
    
  },[indexArr])

  //点击列表项
  const handleClick = (h,i)=>{
    if(multiple){
      if(indexArr.indexOf(i)===-1){
        //复制数组,重新赋值
        indexArr.push(i);
        //选中其他标签时，剔除不限标签的选中状态
        if(indexArr.length>1 && indexArr.indexOf(0)!==-1){
          indexArr.splice(indexArr.indexOf(0),1)
        }
        //选中不限时清空其他选择项
        if(i===0){
          indexArr.splice(0,indexArr.length);
          indexArr.push(0);
        }
        let newIndexArr = indexArr.concat();
        setIndexArr(newIndexArr);
      }
      else{
        indexArr.splice(indexArr.indexOf(i),1);
        //判断当前是否没有选中项
        if(indexArr.length===0){
          indexArr.push(0);
        }
        let newIndexArr = indexArr.concat();
        setIndexArr(newIndexArr);
      }
      onChange(h.value);
    }
    else{
      if(index===i) return;
      onChange(h.value)
      setIndex(i);
    }
  }
  //选中状态判断
  const isChecked = (i)=>{
    if(multiple) {
      if(indexArr.indexOf(i)!==-1){
        return true;
      }
    }
    else{
      if(index===i){
        return true;
      }
    }
  }
  return (
    <View className='search-mg-top'>
      <View className='search_title'>
        <Text>{title}</Text>
      </View>
      <View className='cont'>
        {
          itemMap.map((h, i) => (
            <CheckTagItem
              key={h.value}
              label={h.label}
              onClick={() => handleClick(h, i)}
              checked={isChecked(i)}
            />
          ))
        }
        {children}
      </View>
    </View>
  )
}

export default CheckTagGroup

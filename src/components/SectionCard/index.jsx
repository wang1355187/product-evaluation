import React from 'react';
import {Text, View} from '@tarojs/components';
import './index.scss';



const SectionCard = function (props) {
  const { className = '', children, title, noPadding} = props;
  const style= noPadding ? {padding: 'initial'} : {};
  return (
    <View className={`u-component-card ${className}`}>
      <View className='u-component-card-title'>
        <Text>{props.title}</Text>
      </View>
      <View className='u-component-card-content' style={style}>
        {props.children}
      </View>
    </View>
  )
}

export default SectionCard;
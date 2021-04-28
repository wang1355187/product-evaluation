import React from 'react';
import {Text, View} from '@tarojs/components';
import './index.scss';



const SectionCard = function (props) {
  const { className = '', children, title, padding} = props;
  const style= padding?{padding: '0px 0px 30px'}:{};
  return (
    <View className={`u-component-card ${className}`} style={style}>
      <View className='u-component-card-title'>
        <Text>{props.title}</Text>
      </View>
      <View className='u-component-card-content'>
        {props.children}
      </View>
    </View>
  )
}

export default SectionCard;
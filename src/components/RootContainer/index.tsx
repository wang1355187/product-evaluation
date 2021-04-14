import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import 'taro-ui/dist/style/index.scss'
import { View } from '@tarojs/components';
import NavBar from "@/components/NavBar/index";
import Cookies from 'js-cookie';

import '../../app.scss'

class RootContainer extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <View>
        <NavBar />
        <View className='layout-box'>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default RootContainer;

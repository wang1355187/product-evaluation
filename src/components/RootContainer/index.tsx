import React from 'react'
import 'taro-ui/dist/style/index.scss'
import { View } from '@tarojs/components';
import NavBar from "@/components/NavBar/index";

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

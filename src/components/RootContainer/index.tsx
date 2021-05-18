import React from 'react'
import 'taro-ui/dist/style/index.scss'
import { View } from '@tarojs/components';
import Cookies from 'js-cookie';
import { connect } from 'react-redux'
import '../../app.scss'

@connect()
class RootContainer extends React.Component {
  componentDidMount() {
    Cookies.set('contextType', '');
    const { dispatch } = this.props;
    const ua = window.navigator.userAgent;
    if (ua.match(/MicroMessenger/i) && ua.match(/wxwork/i)) {
      dispatch({
        type: 'weChatModel/getWxCompanyConfig',
        payload: {
          title: `谱蓝产品评测`, // 分享标题
          desc: '精挑细选好保险，客观权威详解读', // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://planpro-res.oss-cn-hangzhou.aliyuncs.com/moments/public/share-icon.png', // 分享图标
        },
      })
    }
  }
  render() {
    return (
      <View>
        <View className='layout-box'>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default RootContainer;

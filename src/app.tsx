import { Component } from 'react'
import './app.scss'
import RootContainer from "./components/RootContainer/index";
import dva from "./utils/dva";
import models from "./models/index"
import React from 'react';
import { Provider } from "react-redux";

const dvaApp = dva.createApp({
  initialState: {
  },
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        <RootContainer>{this.props.children}</RootContainer>
      </Provider>
    )
  }
}

export default App

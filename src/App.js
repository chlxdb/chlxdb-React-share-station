import React, { Component } from 'react'
import Main from './components/mainpage'
// const Count=lazy(()=>import('./components/count'))
export default class App extends Component {
  render() {
    return (
      <div>
        <Main></Main>
      </div>
    )
  }
}

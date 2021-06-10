import React, { Component } from 'react'
import Count from './components/count'
// const Count=lazy(()=>import('./components/count'))
export default class App extends Component {
  render() {
    return (
      <div>
        <Count></Count>
      </div>
    )
  }
}

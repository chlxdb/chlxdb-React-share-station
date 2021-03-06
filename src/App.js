import React, { Component } from 'react'
import Basic from './components/basic'
import Login1 from './components/login1'
import Login2 from './components/login2'
import Manage from './components/manage'

import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sign from './components/login2_2'
// const Count=lazy(()=>import('./components/count'))
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/basic" component={Basic} />
          <Route exact path="/login1" component={Login1} />
          <Route exact path="/login2" component={Login2} />
          <Route exact path="/login2_2" component={Sign} />
          <Route path="/manage" component={Manage} />


        </div>
      </Router>
    )
  }
}


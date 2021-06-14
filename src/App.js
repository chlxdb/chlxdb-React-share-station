import React, { Component } from 'react'
import Basic from './components/pages/basic'
import Login1 from './components/pages/login1'
import Login2 from './components/pages/login2'
import Manage from './components/pages/manage'
import Detail from './components/pages/basic/main/passage/detail'
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// const Count=lazy(()=>import('./components/count'))
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/basic" component={Basic} />
          <Route exact path="/login1" component={Login1} />
          <Route exact path="/login2" component={Login2} />
          <Route exact path="/manage" component={Manage} />
          <Route exact path="/basic/main/detail" component={Detail} />

        </div>
      </Router>
    )
  }
}


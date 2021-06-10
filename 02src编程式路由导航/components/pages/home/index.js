import React, { Component } from 'react'
import News from './news'
import Messages from './messages'
import { Link, Route, Switch } from 'react-router-dom'
export default class Home extends Component {
  render() {
    return (

      <div>

        <h2>Home组件内容</h2>
        <div>
          <li>
            <Link to="/home/news">news</Link></li>

          <li>
            <Link to="/home/messages">messages</Link></li>

          {/* 注册路由 */}
          <Switch>
            <Route path="/home/news" component={News} />
            <Route path="/home/messages" component={Messages} />
            {/* <Redirect path="/home/news" /> */}
          </Switch>



        </div>
      </div>

    )
  }
}

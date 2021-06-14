import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Link, Route, Redirect } from 'react-router-dom'
import Main from './main'
import './index.css'
// import Login1 from '../login1'

export default class Basic extends Component {

    render() {
        return (
            <div>
                <Menu className='ant-layout-header' style={{ backgroundColor: '#333' }} mode="horizontal" >

                    <Menu.Item key="2" ><Link to="/basic/main" style={{ color: '#fff' }}>首页 </Link></Menu.Item>
                    <Menu.Item key="1" > <Link to="/login1" style={{ color: '#fff' }}>管理员登录</Link></Menu.Item>
                    <Menu.Item key="3" ><Link to="/login2" style={{ color: '#fff' }}>用户登录/注册</Link></Menu.Item>
                    <Menu.Item key="4" style={{ color: '#fff' }}>资料分享网站</Menu.Item>

                </Menu>

                <div style={{ marginTop: 20 }}>
                    <Route path="/basic/main" component={Main} />
                    <Redirect to="/basic/main" />
                </div>


            </div >

        )
    }
}

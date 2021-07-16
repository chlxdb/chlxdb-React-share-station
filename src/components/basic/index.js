import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Menu, } from 'antd';
import { Link, Route, } from 'react-router-dom'
import Main from '../main'
import Detail from '../detail';
import './index.css'
// import Login1 from '../login1'

export default class Basic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem('token1'),
            flag: '',

        }
    }
    componentDidMount() {
        if (this.state.token === null) {
            // message("yituicu")
            this.setState({ flag: '离线状态' })

        }
        else {

            this.setState({ flag: '用户在线中...' })
        }

    }
    out = () => {
        sessionStorage.removeItem('token1', "")

        this.setState({ token: "" })
        this.props.history.push('/basic/main/')
    }
    render() {
        return (
            <div>
                <Menu className='ant-layout-header' style={{ backgroundColor: '#adc6ff' }} mode="horizontal" >
                    <Menu.Item key="2" ><Link to="/basic/main" style={{ color: 'block' }}>首页 </Link></Menu.Item>
                    <Menu.Item key="1" > <Link to="/login1" style={{ color: '' }}>管理员登录</Link></Menu.Item>
                    <Menu.Item key="3" ><Link to="/login2" style={{ color: '' }}>用户登录/注册</Link></Menu.Item>
                    <Menu.Item key="4" ><a href="xxx" onClick={this.out}>退出登录</a></Menu.Item>
                    <Menu.Item key="5" style={{ fontSize: 32, marginLeft: "10%" }}> 资料分享网站</Menu.Item>
                    <Menu.Item key="6" style={{ color: 'red' }}>{this.state.flag}</Menu.Item>



                </Menu>

                <div style={{ marginTop: 20 }}>
                    <Route path="/basic/main" component={Main} />
                    <Route path="/basic/detail/:id" component={Detail} />
                    {/* <Redirect to="/basic/main" /> */}
                </div>
            </div >

        )
    }
}

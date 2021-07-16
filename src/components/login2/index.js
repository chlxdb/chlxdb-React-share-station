import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Form, Input, Button, Tabs, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;


export default class Login2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
        }
    }
    LoginPass() {//验证并成功跳转
        console.log('验证中。。。', this.state.name, this.state.password)

        axios.post('http://121.4.187.232:8080/user/userLogin?password=' + this.state.password + '&username=' + this.state.name, {
            params: {

            }
        })
            .then(
                response => {
                    // console.log(response)
                    if (response.data.msg === "username is null") {
                        message.error('用户名或密码错误,请重新登录!')
                        console.log(response)
                    } else if (response.data.msg === null) {
                        message.error('用户名或密码错误,请重新登录!')
                        console.log(response)

                    }
                    else {
                        console.log(response.data)
                        sessionStorage.setItem("token1", response.data.token)
                        sessionStorage.setItem("userid", response.data.userID)
                        message.success('登录成功')
                        this.props.history.push('/basic/main')
                    }
                }
            )



    }


    onFinish = (values) => {
        console.log('Success:', values);
        this.setState({ password: values.password })
        this.setState({ name: values.username })
        this.LoginPass()

    };
    callback = (key) => {
        console.log(key);
    }
    render() {
        return (
            <div style={{ backgroundColor: "#adc6ff", height: "720px", }}>
                <Row justify="space-around" align="middle">
                    <Col span={10}>
                        <Tabs onChange={this.callback} type="card" style={{ width: '100%', marginTop: "150px ", backgroundColor: "white" }}>
                            <TabPane tab="用户登录" key=" 1">
                                <div style={{ margin: '25px' }}>
                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={this.onFinish}
                                    >
                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Username!',
                                                },

                                                {
                                                    pattern: /^[^\s]*$/,
                                                    message: '禁止输入空格',
                                                },
                                            ]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Password!',
                                                },

                                                {
                                                    pattern: /^[^\s]*$/,
                                                    message: '禁止输入空格',
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit"  >
                                                Log in
                                            </Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Link to='/login2_2'>
                                                <span type="primary">前往注册</span>

                                            </Link>
                                            &nbsp;&nbsp;&nbsp;

                                        </Form.Item>
                                        <Form.Item>
                                            <Link to='/basic'>
                                                <span style={{ fontSize: 18 }}>回到首页</span>
                                            </Link>
                                        </Form.Item>
                                    </Form>

                                </div>
                            </TabPane>


                        </Tabs>,
                    </Col>
                </Row>
            </div >
        )
    }
}

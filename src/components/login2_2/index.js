import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Form, Input, Button, Tabs, message } from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;



export default class Sign extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newname: '',
            newpassword: '',
        }
    }
    LoginPass() {//验证并成功跳转
        console.log('验证中。。。', this.state.newname, this.state.newpassword)


        axios({
            method: 'post',
            url: 'http://121.4.187.232:8080/user/register',
            params: {
                password: this.state.newpassword,
                username: this.state.newname,
            },
        }).then(
            response => {
                console.log(response)
                if (response.data === 'isOk') {
                    console.log(response)
                    message.success('注册成功')
                    this.props.history.push('/login2')
                } else {
                    message.error('注册失败！！！')
                }
            }
        )
    }
    onFinish = (values) => {
        console.log('Success:', values);
        this.setState({ newpassword: values.password })
        this.setState({ newname: values.username })
        console.log(this.state.newname)
        axios({
            method: 'post',
            url: 'http://121.4.187.232:8082/admin/queryUserInfoByName',
            params: {
                name: values.username
            },
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(
            response => {
                console.log(response)
                if (response.data.username === values.username) {
                    message.error('该用户已存在！')
                } else {
                    this.LoginPass()
                }

            }
        )


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
                            <TabPane tab="用户注册" key="1">
                                <div style={{ margin: '25px' }}>
                                    <Form
                                        name="register"
                                        onFinish={this.onFinish}
                                        scrollToFirstError
                                    >
                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Username!',
                                                },
                                                {
                                                    min: 4,
                                                    message: '用户名不能少于4个字符',
                                                }, {
                                                    max: 6,
                                                    message: '用户名不能大于6个字符',
                                                },
                                                {
                                                    pattern: /^[^\s]*$/,
                                                    message: '禁止输入空格',
                                                }
                                            ]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                {
                                                    min: 4,
                                                    message: '密码不能少于4个字符',
                                                }, {
                                                    max: 6,
                                                    message: '密码不能大于6个字符',
                                                },
                                                {
                                                    pattern: /^[^\s]*$/,
                                                    message: '禁止输入空格',
                                                }
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirm"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },

                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                    },
                                                }),
                                                {
                                                    pattern: /^[^\s]*$/,
                                                    message: '禁止输入空格',
                                                }
                                            ]}
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="Confirm Password"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                register now!
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Link to='/login2'>返回登录</Link>
                                        </Form.Item>
                                    </Form>

                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>


        )
    }
}

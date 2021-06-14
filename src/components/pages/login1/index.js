import React, { Component } from 'react'


import { Form, Input, Button, message, Card } from 'antd';
import { Row, Col } from 'antd';


//管理员登录处

const layout = {
    // labelCol: { span: 4 },
    // wrapperCol: { span: 4 },
};
const tailLayout = {
    // wrapperCol: { offset: 0, span: 10 },
};
const onFinishFailed = errorInfo => {//错误的提示
    console.log('Failed:', errorInfo);
};
export default class Login1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    LoginPass() {//验证并成功跳转
        console.log('验证中。。。', this.state.name, this.state.password)
        if (this.state.name !== '1234' || this.state.password !== '1234') {
            message.error('用户名或密码错误,请重新登录!')
            return
        }
        message.success('登录成功', 0.7, () => {
            this.props.history.push('/manage')
        })

    }
    onFinish = values => {//成功的提示
        console.log('Success:', values);
        this.setState({
            name: values.username,
            password: values.password
        })
        this.LoginPass()
    };
    render() {
        return (
            <div style={{ backgroundColor: "#adc6ff", height: "720px" }}>
                <Row justify="space-around" align="middle">
                    <Col span={10}>
                        <Card title="管理员登录处" style={{ marginTop: '150px', width: '100%' }}>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true, message: '请输入用户名!' }, {
                                        min: 4,
                                        message: '密码不能少于4个字符',
                                    }, {
                                        whitespace: true,
                                        message: '不能输入空格',
                                    }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }, {
                                        min: 4,
                                        message: '密码不能少于4个字符',
                                    }, {
                                        max: 6,
                                        message: '密码不能大于6个字符',
                                    }, {
                                        whitespace: true,
                                        message: '不能输入空格',
                                    }, {
                                        message: '只能输入数字',
                                        pattern: /^[0-9]+$/
                                    }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" onClick={this.fnLogin} htmlType="submit">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>

                        </Card>
                    </Col>

                </Row>


            </div >
        )

    }
}



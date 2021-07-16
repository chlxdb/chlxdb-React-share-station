import React, { Component } from 'react'
import { Table, Row, Col } from 'antd';
import axios from 'axios'
import { Form, Input, Button, } from 'antd';
import './user.css'
const columns = [

    {
        title: '用户',
        dataIndex: 'username',
    },
    {
        title: '密码',
        dataIndex: 'password',
    },
];

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem("token"),
            content: '',
            visible: false,
            user: [],
            name: '',
            resname: '',
            resword: '',
            userId: '',
        }

    }
    componentDidMount = () => {
        this.getalluser()
    }
    getalluser = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8082/admin/queryAllUser",
            params: {
                pageNo: 1,
                pageSize: 1000000
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {
                console.log(response.data)
                this.setState({ user: response.data[0] })



            })

    }


    onFinish = values => {
        // console.log('Success:', values);
        this.setState({ name: values.username })
        this.search()
    };

    search = () => {
        axios({
            method: 'post',
            url: "http://121.4.187.232:8082/admin/queryUserInfoByName",
            params: {
                name: this.state.name
            },
            headers: {
                token: this.state.token
            }
        }).then(
            response => {
                console.log(response.data)
                this.setState({ resname: response.data.username })
                this.setState({ resword: response.data.password })
                this.setState({ resuserId: response.data.userId })


            })


    }
    render() {


        return (
            <div>
                <Row>
                    <Col span={10}>
                        <Form
                            onFinish={this.onFinish}
                            initialValues={{ remember: true }}
                        >
                            <Col span={10}>
                                <Form.Item label="用户名"
                                    name="username"
                                    style={{}}>
                                    <Input placeholder="请输入用户名" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item >
                                    <Button type="primary" key="submit" htmlType="submit">查询</Button>
                                </Form.Item>
                            </Col>
                        </Form>
                    </Col>
                    <Col span={10} >
                        <p className="sss" >用户名：{this.state.resname}</p>
                        <p className="sss">密码：{this.state.resword}</p>
                        <p className="sss">用户ID：{this.state.resuserId}</p>
                    </Col>
                </Row>

                <Table pagination={{ pageSize: 7 }} scroll={{ y: 500 }} columns={columns} dataSource={this.state.user} rowKey={record => record.id} />
            </div>
        )
    }
}

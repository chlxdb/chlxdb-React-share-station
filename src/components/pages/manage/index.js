import React, { Component } from 'react'
import "./index.css"
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
export default class Manage extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="logo" />
                        <Menu mode="inline" defaultSelectedKeys={['4']} style={{ marginTop: 25 }} >
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                文章资源管理与发布
                            </Menu.Item>
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                公告与留言厅管理
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UploadOutlined />}>
                                实时数据监测
                            </Menu.Item>

                        </Menu>
                    </Sider>
                    <Layout>
                        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1"><h2>网站管理后台</h2></Menu.Item>
                        </Menu>
                        <Content style={{ margin: '24px 16px 0', width: "100%", overflow: 'initial' }}>
                            <div style={{ padding: 24, minHeight: 650 }}>
                                content
                            </div>
                        </Content>

                    </Layout>
                </Layout>,
            </div>
        )
    }
}

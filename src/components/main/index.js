import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import { Badge } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import Passage from '../passage';
import './index.css'
import Messagehall from './messageHall';
import Notice from './notice';


export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: '',
        }

    }



    render() {
        return (

            <div style={{ marginLeft: 100, marginRight: 100 }}>
                <Row justify="space-around" >
                    <Col style={{ backgroundColor: '#adc6ff', textAlign: 'center' }} span={18} >
                        <p style={{ color: 'block', fontSize: '25px' }}>文章区</p>
                        <Passage></Passage>
                    </Col>
                    <Col span={5} style={{ backgroundColor: '#adc6ff' }}>

                        <Card title="公告区：" bordered={false} style={{ backgroundColor: '#adc6ff', }} >
                            <Badge dot>
                                <NotificationOutlined />
                            </Badge> <p style={{ fontSize: 20, color: 'red', }} ><Notice></Notice></p>
                        </Card>

                        <Card title="留言区：" bordered={false} style={{ backgroundColor: '#adc6ff  ', }} >
                            <p style={{ height: 380, overflow: 'scroll', }}>< Messagehall></Messagehall></p>
                            <hr></hr>
                        </Card>

                    </Col>
                </Row>
            </ div >


        )
    }
}

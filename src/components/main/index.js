import React, { Component } from 'react'

import { Row, Col } from 'antd';
import Passage from '../passage';
import './index.css'
import Messagehall from './messageHall';
import Notice from './notice';

export default class Main extends Component {
    render() {
        return (

            <div style={{ marginLeft: 100, marginRight: 100 }}>


                <Row justify="space-around" >

                    <Col style={{ backgroundColor: '#707b84', textAlign: 'center' }} span={17} >
                        <h1 style={{ color: '#fff', }}>文章区</h1>

                        <Passage></Passage>

                    </Col>
                    {/* <Col style={style} span={4} ><h1>留言厅</h1></Col> */}
                    <Col span={5} style={{ backgroundColor: '#707b84' }}>
                        <h1 style={{ color: '#fff', textAlign: 'center' }}>公告区</h1>
                        <Notice></Notice>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <h1 style={{ color: '#fff', textAlign: 'center' }}>
                            留言区
                        </h1>
                        < Messagehall></Messagehall>
                    </Col>

                </Row>

            </ div >


        )
    }
}

import React, { Component } from 'react'

import { Row, Col } from 'antd';
import Passage from './passage';
import './index.css'


export default class Main extends Component {
    render() {
        return (

            <div style={{ textAlign: 'center', }}>


                <Row justify="space-around" >
                    <Col span={4} style={{ backgroundColor: '#707b84', color: '#fff' }}>
                        <h1 style={{ color: '#fff' }}>公告区</h1>
                        <div>hahahaha</div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <h1 style={{ color: '#fff' }}>留言厅</h1>
                    </Col>

                    <Col style={{ backgroundColor: '#707b84' }} span={18} >
                        <h1 style={{ color: '#fff' }}>文章区</h1>

                        <Passage ></Passage>

                    </Col>
                    {/* <Col style={style} span={4} ><h1>留言厅</h1></Col> */}
                </Row>

            </ div >


        )
    }
}

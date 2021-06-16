import React, { Component } from 'react'
import { Pagination } from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom'
import './index.css'

// const { Paragraph } = Typography;

import { Row, Col, Card } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
const { Meta } = Card;
export default class Passage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passages: [],
        }
    }
    componentDidMount() {
        console.log(this.state.page, this.state.pageSize)
        axios.get('http://121.4.187.232:8080/passage/queryAllPassage', {
            params: {
                pageNo: 1,
                pageSize: 6
            }
        })
            .then(
                response => {
                    console.log(response.data)
                    this.setState({ passages: response.data.passageItem })


                },
            )
    }

    onChange = (page, pageSize) => {
        console.log(page, pageSize)
        axios.get('http://121.4.187.232:8080/passage/queryAllPassage', {
            params: {
                pageNo: page,
                pageSize: pageSize
            }
        })
            .then(
                response => {
                    console.log(response.data)
                    this.setState({ passages: response.data.passageItem })
                    console.log(this.state.passages)

                },
            )

    }
    render() {
        return (
            <div>
                <Row style={{ marginLeft: 50 }}>
                    {
                        this.state.passages.map((element, id) => {
                            return (


                                <Col span={8} key={id} style={{ marginBottom: 30 }}>
                                    < Link to={`/basic/detail/${element.id}`}>
                                        {/* <Link to="/basic/detail"> */}
                                        <Card
                                            style={{ width: '70%' }}
                                            cover={
                                                <img
                                                    alt="example"
                                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                />
                                            }
                                            actions={[
                                                <EllipsisOutlined key="ellipsis" />,
                                            ]}
                                        >
                                            <Meta
                                                title={element.title}
                                                description={element.time}
                                            />
                                        </Card>
                                    </Link>
                                </Col>


                            )
                        })
                    }

                </Row>
                <Pagination
                    defaultPageSize={6}
                    onChange={this.onChange}
                    defaultCurrent={1}
                    total={7}
                />
                <br />

            </div >
        )
    }

}

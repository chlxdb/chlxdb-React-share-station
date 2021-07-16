import React, { Component } from 'react'
import { Pagination, Badge } from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom'
import './index.css'

// const { Paragraph } = Typography;

import { Row, Col, Card } from 'antd';

const { Meta } = Card;
export default class Passage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passages: [],
            img: [],
        }
    }
    componentDidMount() {
        // console.log(this.state.page, this.state.pageSize)
        axios.get('http://121.4.187.232:8082/passage/queryAllPassage', {
            params: {
                pageNo: 1,
                pageSize: 6
            }
        })
            .then(
                response => {

                    this.setState({ passages: response.data.passageItem })
                    console.log(this.state.passages)


                });

    }
    onChange = (page, pageSize) => {
        console.log(page, pageSize)
        axios.get('http://121.4.187.232:8082/passage/queryAllPassage', {
            params: {
                pageNo: page,
                pageSize: pageSize
            }
        })
            .then(
                response => {
                    this.setState({ passages: response.data.passageItem })
                }
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
                                    < Link to={`/basic/detail/${element[0].id}`}>
                                        <Card

                                            style={{ width: '70%', boxShadow: '8px 10px 5px #888888', }}
                                            cover={
                                                <img
                                                    alt="example"
                                                    src={`data:image/png;base64,${element[1]}`}
                                                />
                                            }
                                            actions={[
                                                <Badge count={element[2]} >
                                                    <a href="#xxx"  >评论详情</a>
                                                </Badge>
                                            ]}
                                        >
                                            <Meta
                                                title={element[0].title}
                                                description={element[0].time}
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
                    total={500}

                />
                <br />

            </div >
        )
    }

}

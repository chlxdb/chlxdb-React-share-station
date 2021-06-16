import React, { Component } from 'react'
import axios from 'axios'
export default class Notice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notice: '',
        }
    }
    componentDidMount() {
        axios.get('http://121.4.187.232:8080/notice/queryNotice').then(
            response => {
                console.log(response.data)
                this.setState({ notice: response.data })

            },
        )

    }
    render() {
        return (
            <div style={{ marginLeft: 50 }}>
                {this.state.notice}
            </div>
        )
    }
}

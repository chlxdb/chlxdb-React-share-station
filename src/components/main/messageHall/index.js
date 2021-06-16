import React, { Component } from 'react'
import axios from 'axios'
export default class Messagehall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            halllist: [],
        }
    }
    componentDidMount() {
        axios.get('http://121.4.187.232:8080/hallComment/queryAllHallComment').then(
            response => {
                console.log(response.data)
                this.setState({ halllist: response.data })
            },
        )

    }
    render() {
        return (
            <div >
                {
                    this.state.halllist.map((element, id) => {
                        return (
                            <ul key={id}>
                                <p >{element.content}
                                </p>
                                <span>{element.time}</span>
                            </ul>
                        )
                    })
                }
            </div>
        )
    }
}

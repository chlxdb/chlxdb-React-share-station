import React, { Component } from 'react'
import axios from 'axios'
export default class Messagehall extends Component {

    get = () => {

        axios.get('http://121.4.187.232:8080/hallComment/queryAllHallComment').then(
            response => {
                console.log(response.data)
                // this.props.saveusers(response.data)
            },

        )
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

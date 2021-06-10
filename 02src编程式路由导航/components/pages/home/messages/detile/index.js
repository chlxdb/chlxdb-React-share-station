import React, { Component } from 'react'


const data = [
    { id: '01', content: 'ni hao' },
    { id: '02', content: 'chl' },
    { id: '03', content: 'tian' },
]
export default class Detile extends Component {
    render() {
        const { id, title } = this.props.match.params


        const findResult = data.find((dataobj) => {
            return dataobj.id === id
        })
        return (

            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{findResult.content}</li>
            </ul>
        )
    }
}

import React, { Component } from 'react'

export default class News extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li>
                        <a className="list-group-item active" href="./home-news.html">News1</a>
                        <a className="list-group-item active" href="./home-news.html">News2</a>
                        <a className="list-group-item active" href="./home-news.html">News3</a>
                    </li>

                </ul>

            </div>
        )
    }
}

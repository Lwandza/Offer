import React, { Component } from 'react'
import './Header.css'

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <button disabled className='offerButton'>OFFER</button>
                <p className="offerText">ZEN</p>
            </div>
        )
    }
}

export default Header

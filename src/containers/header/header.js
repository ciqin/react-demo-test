import React, { Component } from 'react';

import './header.css'
import charts from '../../charts.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addResponseFlagHas: false,
            titleArr: null
        }
    }
    render() {
        return (
            <div>
                <div className='header'>
                    <div className='logo-left'>
                        <img src={charts} className="App-logo" alt="logo" />
                        <a href="">IBM Charts</a>
                    </div>
                    <div className="title-right">
                        <ul>
                            {
                                this.state.titleArr ? this.state.titleArr.map(function (val, index) {
                                    return <li key={index}><a href=""> {val}</a></li>
                                }) : ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        let addResponseFlagHas = this.state.addResponseFlagHas;

        if (!addResponseFlagHas) {
            this.setState({
                addResponseFlagHas: true,
                titleArr: this.props.titleArr.titleArr.reverse()
            });

        }
    }
}

export default Header;
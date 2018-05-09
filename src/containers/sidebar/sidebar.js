import React, { Component } from 'react';
import { Accordion, AccordionItem } from 'carbon-components-react';

import './sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarArr: null,
            i : null,
            index :null
        }
    }
    render() {
        var that = this;
        return (
            <div className="out-sidebar">
                <div className="sidebar">
                    <div className="title">
                        <span>所有图表</span>
                    </div>
                    <article className="App__demo">
                        {
                            this.state.sidebarArr ? this.state.sidebarArr.map(function (val, i) {
                                return (<Accordion key={i}>
                                    <AccordionItem title={val.mTitle}>
                                        <ul>
                                            {
                                                val.cTitle.map(function (val, index) {
                                                    return (<li key={index} className={index === that.state.index && i === that.state.i ? 'chart-item selectStyle' : 'chart-item'} onClick={that.showMinute.bind(that, index, i, val.name, val.data)}> {val.name} </li>)
                                                })
                                            }
                                        </ul>
                                    </AccordionItem>
                                </Accordion>)
                            }) : ''
                        }
                    </article>
                </div>
            </div>
        )
    }
    showMinute(index, i, val, data) {
        var that = this;
        fetch(`/data/${data}`)
            .then((response) => response.json())
            .then((responseJson) => {
                that.props.action.login({
                    name: val,
                    data: responseJson
                })
            })
        this.setState({
            i,
            index
        })       
    }

    componentDidUpdate() {
        let addResponseFlagHas = this.state.addResponseFlagHas;

        if (!addResponseFlagHas) {
            this.setState({
                addResponseFlagHas: true,
                sidebarArr: this.props.sidebarArr.sidebarArr
            });
        }

    }
}

export default Sidebar;
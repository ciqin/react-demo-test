import 'react-datasheet/lib/react-datasheet.css';
import './container.css'
import React, { Component } from 'react';
import ReactDataSheet from 'react-datasheet';

import TimeBar from '../single-chart/insight-vis-bar/time-bar';
import RingPie from '../single-chart/insight-vis-pie/ring-pie';
import Boxplot from '../single-chart/insight-vis-boxplot/boxplot';
import BrokenLine from '../single-chart/insight-vis-line/broken-line';
import AreaStacked from '../single-chart/insight-vis-line/area-stacked';
import LineErea from '../single-chart/insight-vis-line/line-lable';
import Scatter3D from '../single-chart/insight-vis-scatter/insight-vis-3d-scatter';
import Scatter2D from '../single-chart/insight-vis-scatter/insight-vis-2d-scatter';
import TimeScatter from '../single-chart/insight-vis-scatter/insight-vis-time-scatter';
import Sankey from '../single-chart/insight-vis-sankey/sankey-diagram';
import Spline from '../single-chart/insight-vis-bar/spline';

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addResponseFlagHas: false,
            grid : null,
            name : null,
            data : null
        }
    }
    render() {
        return (
            <div>
                <div className="hintContent">
                    {this.props.data.name == null ? ' please click' : this.state.grid ? <ReactDataSheet
                        data={this.state.grid}
                        valueRenderer={(cell) => cell.value}
                        onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                        onCellsChanged={changes => {
                            const grid = this.state.grid.map(row => [...row])
                            changes.forEach(({ cell, row, col, value }) => {
                                grid[row][col] = { ...grid[row][col], value }
                            })
                            this.setState({ 
                                grid 
                            })
                        }}
                    /> : null}
                </div>
                {this.props.data.name === "TimeBar" ? <TimeBar tableData = {this.state.grid} data={this.props.data.data} title="Proportion of patients taking each drug" /> : ""}
                {this.props.data.name === "Spline" ? <Spline tableData = {this.state.grid} data={this.props.data.data} title="Spline Chart" /> : ""}
                {this.props.data.name === "RingPie" ? <RingPie tableData = {this.state.grid} data={this.props.data.data} title="Pie Chart" /> : ""}
                {this.props.data.name === "Boxplot" ? <Boxplot tableData = {this.state.grid} data={this.props.data.data} title="Boxplot Chart" layout="horizontal" /> : ""}
                {this.props.data.name === "area-stacked" ? <AreaStacked tableData = {this.state.grid} data={this.props.data.data} title="AreaStacked Chart" /> : ""}
                {this.props.data.name === "broken-line" ? <BrokenLine tableData = {this.state.grid} data={this.props.data.data} title="BrokenLine Chart" /> : ""}
                {this.props.data.name === "line-lable" ? <LineErea tableData = {this.state.grid} data={this.props.data.data} title="LineErea Chart" type="Normal" /> : ""}
                {this.props.data.name === "3d-scatter" ? <Scatter3D tableData = {this.state.grid} data={this.props.data.data} title="scatter3D Chart" /> : ""}
                {this.props.data.name === "2d-scatter" ? <Scatter2D tableData = {this.state.grid} data={this.props.data.data} title="Scatter2D Chart" /> : ""}
                {this.props.data.name === "time-scatter" ? <TimeScatter tableData = {this.state.grid} data={this.props.data.data} title="time-scatter Chart" /> : ""}
                {this.props.data.name === "sankey-diagram" ? <Sankey tableData = {this.state.grid} data={this.props.data.data} title="Sankey Chart" /> : ""}
            </div>
        )
    }

    componentDidUpdate() {
        if (this.props.data.data) {
            let titleArr = [{ readOnly: true, value: '' }], gridArr = [], that = this;
            this.props.data.data.columns.forEach(function (val, index) {
                titleArr.push({ readOnly: true, value: val });
            })
            gridArr.push(titleArr) ;
            this.props.data.data.index.forEach(function (val, index) {
                let dataArr = [{ readOnly: true, value: val }];
                that.props.data.data.data[index].forEach(function (v, i) {
                    dataArr.push(
                        { value: v }
                    )
                })
                gridArr.push(dataArr)
            })

            let addResponseFlagHas = this.state.addResponseFlagHas;

            if (this.state.name !== this.props.data.name) {
                this.setState({
                    addResponseFlagHas: false,
                    grid: null,
                    name: this.props.data.name
                });
            }

            if (!addResponseFlagHas && this.state.name === this.props.data.name) {
                this.setState({
                    addResponseFlagHas: true,
                    grid: gridArr,
                    name: this.props.data.name
                });
            }
        }

    }
}

export default Container;
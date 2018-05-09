import React, { Component } from 'react';

import echarts from 'echarts';

import Tool from './base-tool';

import echartsGl from 'echarts-gl';

export class InsightVisElementEChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 800,
      height: 800,
      data: null
    }
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.template ? this.template : '' }}></div>
        <div id="chart"></div>
      </div>
    )
  }

  async componentDidMount() {
    //  Set the title of the chart
    this.props.title ? this.baseOption.title = { text: this.props.title } : this.baseOption;

    let chart = document.querySelector("#chart");
    //  Set the size of the chart
    Object.prototype.toString.call(this.setStyle) === '[object Object]' ?
      chart.style = `width:${this.setStyle.width}px;height:${this.setStyle.height}px` :
      chart.style = `width:${this.state.width}px ; height:${this.state.height}px`;

    this.__chart = echarts.init(document.querySelector("#chart"));

    this.__chart.setOption(this.baseOption);

    //  Setting the label event
    /@.*?={/g.test(this.template) ? this.__internalEvent(this.template) : '';

    this.__setColor = Tool.Color;

    this.__MedianArr = Tool.MedianArr;

    this.__DataBase = Tool.DataBase;

    if (!this.loadData) return console.error('Chart error! `loadData()` function NOT implemented for element:', this);

    this.__chart.setOption(this.loadData);

    if (!this.loadData) return console.error('Chart error! `loadData()` function NOT implemented for element:', this);

    this.__chart.setOption(this.loadData);
  }

  componentDidUpdate() {
    if (this.props.tableData) {

      let data = this.props.tableData ; 
      
      this.__chart.setOption(this.__updateOption(this.__DataBase(data)));
    }
  }

  __internalEvent(template) {
    let templateArr = template.split(/>/), that = this;

    templateArr.forEach(function (val, index) {
      if (/@.*?={/g.test(val)) {

        let name = val.match(/class="([\s\S]*)" | id="([\s\S]*)"/)[1].trim(),
          event = val.match(/@.*?={([\s\S]*)}/)[1].trim(),
          type = val.match(/@(\S*)={/)[1].trim();
        type = 'on' + type.toLocaleLowerCase();

        document.querySelector(`.${name}`)[type] = that[event].bind(that);
      }
    });

  }
  __updateData(data) {
    this.__chart.setOption(data)
  }
}
import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: []
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'time',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
}

//  base updata option function 
function updateOption(data) {
    //   set base color 
    let primaryColor = this.__setColor(data.data.length);
    let seriesData = [],xSeries = [];
    data.data.forEach(function (val, index) {
        let XTime = Date.UTC(data.data[index][0].substring(0,10).split("-")[0],data.data[index][0].substring(0,10).split("-")[1]-1,data.data[index][0].substring(0,10).split("-")[2]);
        let obj = {
            name: data.index[index]+'',
            value: [XTime,data.data[index][1]],
            symbol:'none',
            itemStyle:{
                normal:{
                    color:'#ccc'
                }
            },
            lineStyle:{
                normal:{
                    color:'#ccc'
                }
            }
        };
        xSeries.push(XTime)
        seriesData.push(obj);
    })
    let series = {
        type:"line",
        data:seriesData,
        lineStyle:{
            color:primaryColor[0],
            width:1
        }
    }
    return {
        series: series,
        xAxis: {
            data: xSeries
        }
    }
}

class BrokenLine extends InsightVisElementEChart  {

    get baseOption() {
        
        this.__updateOption = updateOption ;

        return OPTION_BASE
    }

    get setStyle () {
        return {
            width:600,
            height: 600
        }
    }

    get loadData() {
        let opt = updateOption.bind(this)(this.props.data);

        return {
            series: opt.series,
            xAxis: opt.xAxis
        }
    }
}

export default BrokenLine ;

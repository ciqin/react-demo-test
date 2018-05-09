import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    title: {
        text: ''
    },
    xAxis: {
        type: 'time'
    },
    grid: {
        x: 150
    },
    yAxis: {

    },
    legend: {
        enabled: false
    },
    tooltip: {},
    credits: false,
    series: []
};

//  base updata option function 
function updateOption(data) {
    //   set base color 
    let primaryColor = this.__setColor(data.data.length);

    //  format time  data 
    let seriesdata = [], aggregatedata = [], rawdata = [], rawData = [], prev;

    data.columns.forEach(function (val, index) {
        seriesdata.push([]);
        aggregatedata.push([]);
        rawdata.push([]);
    })

    data.data.forEach(function (v, i) {
        v.forEach(function (val, index) {
            if (val != null) {
                seriesdata[index].push([Date.UTC(val.substring(0, 10).split("-")[0], val.substring(0, 10).split("-")[1] - 1, val.substring(0, 10).split("-")[2]), data.columns[index]]);
            }
        })
    })

    let symbolSize = 2;
    seriesdata.forEach(function (v, i) {
        v.forEach(function (val, index) {
            if (val[0] !== prev) {
                rawdata[i].push(val);
                aggregatedata[i].push(symbolSize);
            } else {
                aggregatedata[i][aggregatedata[i].length - 1] = aggregatedata[i][aggregatedata[i].length - 1] + symbolSize;
            }
            prev = val[0];
        })
    })

    rawdata.forEach(function (v, i) {
        v.forEach(function (val, index) {
            rawData.push({ "value": val, symbolSize: aggregatedata[i][index], symbol: 'circle' });
        })
    })

    let series = {
        type: "scatter",
        data: rawData,
        itemStyle: {
            color: primaryColor[0]
        }
    }

    let yAxis = {
        type: "category",
        data: data.columns
    }

    let xAxis = {
        type: "time",
    }

    return {
        series: series,
        xAxis: xAxis,
        yAxis: yAxis
    }
}

class TimeScatter extends InsightVisElementEChart {

    get baseOption() {
        this.__updateOption = updateOption ;
        
        return OPTION_BASE;
    }
    
    get loadData() {
        let opt = updateOption.bind(this)(this.props.data);
        return {
            xAxis: opt.xAxis,
            yAxis: opt.yAxis,
            series: opt.series
        }
    }
}

export default TimeScatter;
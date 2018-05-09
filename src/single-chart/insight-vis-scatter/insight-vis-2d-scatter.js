import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    title: {
        text: ''
    },
    tooltip: {
        formatter: function (params) {
            return `name : ${params.seriesName} </br>
              x : ${params.value[0]} </br>
              y : ${params.value[1]}`
        }
    },
    legend: {
        right: 10,
        data: []
    },
    xAxis: {
    },
    yAxis: {
    },
    series: []
};

//  base updata option function 
function updateOption(data) {
    //   set base color 
    let primaryColor = this.__setColor(data.data.length);

    let groupsArray = Array.from(new Set(data.data.map(function (d) { if (d[2] !== null) { return d['2'] } }).filter(function (d) { return d !== undefined })));
    let series = []
    for (let i = 0; i < groupsArray.length; i++) {
        let dataArr = [];
        for (let j = 0; j < data.data.length; j++) {
            if (data.data[j][2] === groupsArray[i]) {
                dataArr.push([data.data[j][0], data.data[j][1], data.columns[i]])
            }
        }
        let obj = {
            name: groupsArray[i],
            type: "scatter",
            symbolSize: 10,
            data: dataArr,
            itemStyle: {
                normal: {
                    color: primaryColor[i]
                }
            }
        };
        series.push(obj);
    }

    return {
        series: series,
        xAxis: { type: 'value', scale: true, name: data.columns[0] },
        yAxis: { type: 'value', scale: true, name: data.columns[1] }
    }
}

class Scatter2D extends InsightVisElementEChart {

    get baseOption() {
        this.__updateOption = updateOption ;
        
        return OPTION_BASE;
    }

    get setStyle() {
        return {
            width: 700,
            height: 600
        }
    }

    get loadData() {
        let opt = updateOption.bind(this)(this.props.data);

        return {
            series: opt.series,
            xAxis: opt.xAxis,
            yAxis: opt.yAxis
        }
    }
}

export default Scatter2D;

import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    xAxis: {},
    yAxis: {
        type: 'category',
        data: ['1']
    },
    grid: {
        x: 200
    },
    series: [{
        type: 'k',
        barMaxWidth: '5',
        data: [
            {
                value: [20, 30, 20, 30],
                itemStyle: {
                    color: 'blue'
                }
            }
        ]
    }, {
        type: 'scatter',
        symbol: 'diamond',
        data: [25]
    }]
};

//  base updata option function 
function updateOption(data) {
    //   set base color 
    let primaryColor = this.__setColor(data.data.length),
        kSeriesData = [],
        sSeriesData = [];

    let yData = {
        type: 'category',
        position: '30%',
        data: data.index
    }
    data.data.forEach(function (val, index) {
        kSeriesData.push({
            value: [val[2], val[3], val[2], val[3]],
            itemStyle: {
                color: primaryColor[index],
                borderWidth: 0,
                borderColor: primaryColor[index],
                opacity: 0.5,
            }
        })
        sSeriesData.push({
            value: [val[0], data.index[index]],
            itemStyle: {
                color: primaryColor[index]
            }
        })
    })
    let series = [{
        type: 'k',
        data: kSeriesData
    }, {
        type: 'scatter',
        symbol: 'diamond',
        data: sSeriesData
    }]

    return {
        series: series,
        yData: yData
    }
}

class Spline extends InsightVisElementEChart {

    get baseOption() {
        this.__updateOption = updateOption ;
        return OPTION_BASE
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
            yAxis: opt.yData
        }
    }
}

export default Spline;
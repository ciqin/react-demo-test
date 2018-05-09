import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        data: []
    },
    series: []
}

function updateOption(data) {
    //   set base color 
    let primaryColor = this.__setColor(data.data.length);

    let seriesData = [];

    data.data.forEach(function (val, index) {
        let obj = {
            value: data.data[index][0],
            name: data.index[index],
            itemStyle: {
                normal: {
                    color: primaryColor[index],
                    borderColor: '#fff',
                    borderWidth: 2
                }
            },
            borderWidth: 2,
            borderColor: '#fff'
        };
        seriesData.push(obj);
    })

    let legend = {
        orient: 'vertical',
        x: "80%",
        data: data.index
    }
    let series = [{
        name: 'pie',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: seriesData
    }]

    return {
        series: series,
        legend: legend
    }
}

class RingPie extends InsightVisElementEChart {
    get baseOption() {
        
        this.__updateOption = updateOption ;
        
        return OPTION_BASE
    }

    get loadData() {
        let opt = updateOption.bind(this)(this.props.data);

        return {
            series: opt.series,
            legend: opt.legend
        }
    }
}

export default RingPie;
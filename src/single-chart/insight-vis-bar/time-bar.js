import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    title: {
        text: ''
    },
    grid: {
        y2: 100
    },
    legend: {
        data: [],
        align: 'left'
    },
    toolbox: {
        // y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            }
        }
    },
    tooltip: {},
    xAxis: {
    },
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    },
    yAxis: {
    },
    series: []
}

function updateOption(data) {
    if (data) {
        //   set base color 
        let primaryColor = this.__setColor(data.data.length);
        let series = [];
        let legend = {
            data: [],
            x: '80%'
        }
        data.index.forEach(function (v, i) {
            let obj = {
                name: v,
                type: 'bar',
                data: data.data[i],
                animationDelay: function (idx) {
                    return idx * 10;
                },
                itemStyle: {
                    normal: {
                        color: primaryColor[i]
                    }
                }
            };
            legend.data.push(v)
            series.push(obj);
        })
        let xData = {
            type: 'category',
            data: data.columns,
            silent: false,
            splitLine: {
                show: false
            }
        }

        for (let i = 0; i < data.columns.length; i++) {
            if (data.columns[i].length > 5) {
                xData.axisLabel = {
                    interval: 0,
                    rotate: -15
                }
                break;
            }
        }
        return {
            series: series,
            xAxis: xData,
            legend: legend
        }
    }
}

class TimeBar extends InsightVisElementEChart {

    get baseOption() {

        this.__updateOption = updateOption ;
        
        return OPTION_BASE
    }
    get setStyle () {
        return {
            width:800,
            height: 600
        }
    }
    get loadData() {
        let opt = updateOption.bind(this)(this.props.data);

        return {
            series: opt.series,
            xAxis: opt.xAxis,
            legend: opt.legend
          }
    }
   
}

export default TimeBar;
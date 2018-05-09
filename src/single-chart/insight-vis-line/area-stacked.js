import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';


const OPTION_BASE = {
    chart: {
        type: 'line'
    },
    xAxis: {},
    yAxis: {
        title: {
            text: null
        }
    },
    series: []
}

//  base updata option function  
function updateOption(data) {
    //   set base color 
    let primaryColor = this.__setColor(data.data.length);


    let symbol = ['circle', 'rect', 'triangle', 'diamond', 'pin', 'arrow', 'roundRect'];

    let seriesArray = [];
    data.data.forEach(function (val, index) {
        let array = [];
        val.forEach(function (v, i) {
            if (v == null) {
                array.push(null);
            } else {
                array.push(Number(v));
            }
        })
        seriesArray.push(array);
    })
    let xAxis = {
        title: null,
        type: 'category',
        data: data.columns,
    };
    let legend = {
        data: data.index,
        orient: 'vertical',
        right: '10%',
        top: '10%'
    }
    let series = [];
    data.index.forEach(function (val, index) {
        series.push({
            name: val,
            type: "line",
            itemStyle: {
                color: primaryColor[index]
            },
            symbol: symbol[index],
            lineStyle: {
                opacity: 0
            },
            data: seriesArray[index],
            areaStyle: {
                opacity: 1,
                color: primaryColor[index]
            }
        })
    })

    return {
        xAxis: xAxis,
        series: series,
        legend: legend
    }
}

class LineErea extends InsightVisElementEChart {
    
    get baseOption() {
        this.__updateOption = updateOption ;
        
        return OPTION_BASE
    }

    get setStyle() {
        return {
            width: 600,
            height: 600
        }
    }

    get loadData() {
        let opt = updateOption.bind(this)(this.props.data);

        return {
            xAxis: opt.xAxis,
            series: opt.series,
            legend: opt.legend
        }
    }

}

export default LineErea;

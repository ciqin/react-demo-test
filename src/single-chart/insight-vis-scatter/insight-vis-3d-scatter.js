import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    tooltip: {},
    visualMap: {
        show: false,
        min: 2,
        max: 6,
        inRange: {
            symbolSize: 3,
            colorAlpha: [0.2, 1]
        }
    },
    xAxis3D: {
        type: 'value'
    },
    yAxis3D: {
        type: 'value'
    },
    zAxis3D: {
        type: 'value'
    },
    grid3D: {
        axisLine: {
            lineStyle: { color: '#cccccc' }
        },
        axisPointer: {
            lineStyle: { color: '#cccccc' }
        }
    },
    series: []
}

//  base updata option function 
function updateOption(data) {
    //   set base color 
    let primaryColor = this.__setColor(data.data.length);

    let newArr = [];
    data.data.forEach(function (val, index) {
        let obj = {};
        obj.name = data.index[index];
        obj.value = [val[0], val[1], val[2]];
        obj.itemStyle = {
            color: primaryColor[0]
        }
        newArr.push(obj);
    })

    let series = [
        {
            name: 'scatter3D',
            type: 'scatter3D',
            data: newArr
        }
    ]
    return {
        series: series
    }
}
class Scatter3D extends InsightVisElementEChart {

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
            series: opt.series
        }
    }
}

export default Scatter3D;

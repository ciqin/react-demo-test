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
    series: [
    ]

}

//  base updata option function  
function updateOption(data, type) {

    //   set base color 
    let primaryColor = this.__setColor(data.data.length);
    let symbol = ['circle', 'rect', 'triangle', 'diamond', 'pin', 'arrow', 'roundRect'];

    let seriesData = [];
    if (type === 'Normal') {
        data.data.forEach(function (val, index) {
            seriesData.push({
                name: data.index[index],
                type: "line",
                data: val,
                itemStyle: {
                    color: primaryColor[index]
                },
                symbol: symbol[index],
            })
        })
    } else {
        let accumulatedData = [];

        data.data.forEach(function (val, index) {
            let normal_array = val;
            let accumulated_array = [];
            normal_array.reduce(function (a, b, i) {
                return accumulated_array[i] = a + b;
            }, 0);
            accumulatedData.push(accumulated_array);
        })

        data.data.forEach(function (val, index) {
            seriesData.push({
                name: data.index[index],
                type: "line",
                data: accumulatedData[index],
                itemStyle: {
                    color: primaryColor[index]
                },
                symbol: symbol[index],
            })
        })
    }

    let xAxis = {
        type: 'category',
        boundaryGap: false,
        data: data.columns
    }

    let legend = {
        bottom: '0%',
        data: data.index
    }

    return {
        xAxis: xAxis,
        legend: legend,
        series: seriesData
    }
}

class LineLable extends InsightVisElementEChart {
    get template() {
        return `<div> 
                    <input type="radio" class="radio2" @Click={ __clickNormal } checked > <span> Normal</span>  
                    <input type="radio" class="radio1" @Click={ __clickTotal }> <span>  Accumulated </span> 
                </div>`;
    }

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
        let opt = updateOption.bind(this)(this.props.data, this.props.type);

        return {
            xAxis: opt.xAxis,
            legend: opt.legend,
            series: opt.series
        }
    }
    __clickTotal() {
        //  set click style 
        document.querySelector(".radio1").checked = true;
        document.querySelector(".radio2").checked = false;
        //  updata chart
        let opt = updateOption.bind(this)(this.props.data, 'Accumulated');
        this.__updateData(opt);
    }
    __clickNormal() {
        //  set click style 
        document.querySelector(".radio1").checked = false;
        document.querySelector(".radio2").checked = true;
        //  updata chart
        let opt = updateOption.bind(this)(this.props.data, 'Normal');
        this.__updateData(opt);
    }
}

export default LineLable;
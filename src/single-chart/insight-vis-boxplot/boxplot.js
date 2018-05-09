import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    tooltip: {
        formatter: function (params) {
            return `name : ${params.name} </br>
                    upper : ${params.value[5]} </br>
                    Q3 : ${params.value[4]} </br> 
                    median : ${params.value[3]} </br> 
                    Q1 : ${params.value[2]} </br> 
                    lower : ${params.value[1]}`;
        }
    },
    xAxis: {
        nameGap: 30,
        splitLine: {
            show: false
        }
    },
    yAxis: {
        splitArea: {
            show: true
        }
    },
    series: []
};

//  base updata option function 
function updateOption(data) {
    let that = this;
    if (data) {
        let primaryColor = this.__setColor(data.data.length);

        let array = [];
        for (let i = 0; i < data.columns.length; i++) {
            array.push([]);
        }
        data.data.forEach(function (val, index) {
            for (let i = 0; i < data.columns.length; i++) {
                if (data.data[index][i]) array[i].push(data.data[index][i])
            }
        });

        let newArr = [];
        array.forEach(function (val, index) {
            let obj = {
                itemStyle: {
                    normal: {
                        color: primaryColor[index]
                    }
                },
                value: that.__MedianArr(array[index])
            };
            newArr.push(obj);
        })
        let series = [{
            name: 'boxplot',
            type: 'boxplot',
            data: newArr
        }];
        let xAxis, yAxis;
        if (this.props.layout && this.props.layout === "vertical") {
            xAxis = { splitArea: { show: true } }
            yAxis = { data: data.columns, type: 'category' }
        } else {
            xAxis = { data: data.columns, type: 'category' }
            yAxis = { splitArea: { show: true } }
        
        }

        return {
            series: series,
            AxisData: {
                x: xAxis,
                y: yAxis
            }
        }
    }

}

class Boxplot extends InsightVisElementEChart {

    get baseOption() {
        this.__updateOption = updateOption ;
        
        return OPTION_BASE;
    }
    
    get setStyle () {
        return {
            width:700,
            height:600
        }
    }
    get loadData() {
        let opt = updateOption.bind(this)(this.props.data );
        
        return {
            series: opt.series,
            xAxis: opt.AxisData.x,
            yAxis: opt.AxisData.y
        };
    }
}


export default Boxplot;

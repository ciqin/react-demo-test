import { InsightVisElementEChart } from '../../components/insight-vis-adapter/echarts';

const OPTION_BASE = {
    title: {
        text: 'Sankey Diagram'
    },
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: []
}

//  base updata option function 
function updateOption(data) {
   //   set base color 
   let primaryColor = this.__setColor(data.data.length);

    //   set base color  end
    let nodesArr = Array.from(new Set(data.data.map(function (val, index) { return data.data[index][0] })));
    let newNodes = Array.from(new Set(nodesArr.map(function (val, index) { return { "name": val, "itemStyle": { "normal": { "color": primaryColor[index] } } } })));
    let dataColumns = data.columns;
    let nodeLinks = Array.from(new Set(data.data.map(function (val, index) {
        let obj = {
            [dataColumns[0]]: data.data[index][0],
            [dataColumns[1]]: data.data[index][1],
            [dataColumns[2]]: data.data[index][2]
        };
        return obj;
    })))
    let series = [];
    let seriesData = {
        type: 'sankey',
        layout: 'none',
        data: newNodes,
        links: nodeLinks,
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: '#aaa'
            }
        }
    };
    series.push(seriesData);

    return {
        series: series
    }
}

class Sankey extends InsightVisElementEChart {

    get baseOption() {

        this.__updateOption = updateOption ;

        return OPTION_BASE;
    }

    get setStyle () {
        return {
            width : 700,
            height : 600
        }
    }

    get loadData() {
        
        let opt = updateOption.bind(this)(this.props.data);
        return {
            series: opt.series
        }
    }
}

export default Sankey ;

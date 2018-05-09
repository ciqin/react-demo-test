
// a set main color function 
function Color(length) {
    let primaryColor = ["#3b1a40", "#473793", "#3c6df0", "#00a68f", "#48d4bb"];
    let secondLevel = ["#112c1b", "#164d56", "#5a3ec8", "#9b82f3", "#efcef3"];
    let threeLevel = ["#252e6a", "#602797", "#9320a2", "#009bef", "#f7aac3"];
    if (0 < length && length <= 5) {
        primaryColor = primaryColor.reverse();
        return primaryColor;
    } else if (5 < length && length <= 10) {
        primaryColor = primaryColor.concat(secondLevel);
        return primaryColor;
    } else if (10 < length && length <= 15) {
        primaryColor = primaryColor.concat(secondLevel).concat(threeLevel);
        return primaryColor
    } else {
        primaryColor = primaryColor.concat(secondLevel).concat(threeLevel);

        let count = Math.floor(length / 15);

        let number = length % 15;
        let newPrimaryColor = primaryColor;
        for (let i = 0; i < count - 1; i++) {
            primaryColor = primaryColor.concat(newPrimaryColor)
        }
        for (let i = 0; i < number; i++) {
            primaryColor.push(primaryColor[i])
        }
        return primaryColor;
    }
}

/*
Processing the array back to a new array about the median of the data
*/
function MedianArr( arr ) {
    arr.sort(function (a, b) { return a - b });
    let newArrchild = [];
    newArrchild.push(Number(arr[0]));
    if (arr.length % 2 === 0) {
        if (arr.length % 4 === 0) {
            newArrchild.push((Number(arr[arr.length / 2 - arr.length / 4 - 1]) + Number(arr[arr.length / 2 - arr.length / 4])) / 2);
            newArrchild.push((Number(arr[arr.length / 2 - 1]) + Number(arr[arr.length / 2])) / 2);
            newArrchild.push((Number(arr[arr.length / 2 + arr.length / 4 - 1]) + Number(arr[arr.length / 2 + arr.length / 4])) / 2);
            newArrchild.push(Number(arr[arr.length - 1]));
        } else {
            newArrchild.push(Number(arr[Math.floor(arr.length / 2 - arr.length / 4)]));
            newArrchild.push((Number(arr[arr.length / 2 - 1]) + Number(arr[arr.length / 2])) / 2);
            newArrchild.push(Number(arr[Math.floor(arr.length / 2 + arr.length / 4)]));
            newArrchild.push(Number(arr[arr.length - 1]));
        }
    } else {
        if (arr.length % 4 === 0) {
            newArrchild.push((Number(arr[Math.floor(arr.length / 2) - Math.floor(arr.length / 4)]) + Number(arr[Math.floor(arr.length / 2) - Math.floor(arr.length / 4) - 1])) / 2);
            newArrchild.push(Number(arr[Math.floor(arr.length / 2)]));
            newArrchild.push((Number(arr[Math.floor(arr.length / 2) + Math.ceil(arr.length / 4) - 1]) + Number(arr[Math.floor(arr.length / 2) + Math.ceil(arr.length / 4)])) / 2);
            newArrchild.push(Number(arr[arr.length - 1]));
        } else {
            newArrchild.push(Number(arr[Math.floor(arr.length / 2) - Math.ceil(arr.length / 4)]));
            newArrchild.push(Number(arr[Math.floor(arr.length / 2)]));
            newArrchild.push(Number(arr[Math.floor(arr.length / 2) + Math.ceil(arr.length / 4)]));
            newArrchild.push(Number(arr[arr.length - 1]));
        }
    }
    return newArrchild;
}


function DataBase ( data ) {
    let Object = {
        columns : data[0].map(function ( val ,index ) { return val.value}).filter(function (val) {   return val !== "" }),
        index : data.map(function ( val ,index ) { return val[0].value}).filter(function (val) {   return val !== "" })
    };

    Object.data = data.map (function ( val , index ) {
        if(index !== 0){
            return val.map(function ( v , i ) { 
                if(i!== 0){ 
                    return v.value-0? v.value-0 : v.value ;
                }
            }).filter(function (val) { return val!==undefined})
        }
    }).filter(function (val) { return val!==undefined})
    
    return Object ;
}
export default {
    Color,
    MedianArr,
    DataBase
}
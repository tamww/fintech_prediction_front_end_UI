// import React from 'react';

import basedata from "../data/final_company_info.json"
import seed_to_a from "../data/seed_probs.json";
import a_to_b from "../data/series_a_probs.json";
import monthRateDefault from "../data/peridoRate.json";


var stateXXX = [];

function process_data_numeric_comparison(datas) {
    for (var i in datas){
      for(var j in datas[i]){
        if (typeof(datas[i][j]) === typeof(12)){
          if(datas[i][j] > 0 && datas[i][j] <1){
            datas[i][j] = (Math.trunc(datas[i][j] *10000))/100
          }
        }
      }
    }
    return datas

  }

/*function: process data to return percentage data*/ 
function process_data_comparison (datas) {
for (var i in datas){
  if(typeof(datas[i].success_rate) !== typeof(12)){
    datas[i].success_rate = (Math.trunc(parseFloat(datas[i].success_rate)*10000))/100;
  }
}
return datas
}

const finalans = []

export default function pdata () {
    // const [token, setToken] = useState();


    var seed = process_data_numeric_comparison(seed_to_a)
    var ab = process_data_numeric_comparison(a_to_b)
    var defaults = process_data_comparison(monthRateDefault)
    for (var i in basedata){
        var item = basedata[i]
        var tempdata;
        var flag = 1;
        if (item.funding_status === "seed"){
            tempdata = seed;
          }else if (item.funding_status === "series_a"){
            tempdata =  ab;
          }else{
            flag = 0;
            tempdata = defaults;
          }
          var ans = [];
          if (flag === 1){
                for (var i in tempdata){
                if (tempdata[i].name === item.name){
                    const entries = Object.entries(tempdata[i])
                    let id = 0;
                    ans = entries.map(function(itemX){
                    if(itemX[0] !== "name" && itemX[0] !== "key") {
                        var info = {
                        key: id,
                        period: itemX[0],
                        success_rate: itemX[1],
                        }
                        id++;
                        return info;
                    }
                    })
                    break;
                }
                }
                ans.shift()
                ans.shift()
                stateXXX = []
                stateXXX.push(ans.pop())
                stateXXX.push(ans.pop())
                stateXXX.push(ans.pop())
                stateXXX.push(ans.pop())
                stateXXX.push(ans.pop())
            }
            var sum = stateXXX[0].success_rate + stateXXX[1].success_rate + stateXXX[2].success_rate+stateXXX[3].success_rate +stateXXX[4].success_rate;
            sum = sum/5;
            var k2 = sum/100;

            var info = { 
                type: 'Feature', 
                geometry: {type: 'Point', 'coordinates': [ parseFloat(basedata[i].longitude),parseFloat(basedata[i].latitude) ] }, 
                properties: { weight: k2 }}
            // console.log(info)
            finalans.push(info)
      }


    return finalans
}
